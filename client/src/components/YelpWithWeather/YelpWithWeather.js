import React, { Component } from 'react';

import YelpSearch from './Yelp/YelpSearch';
import YelpTable from './Yelp/YelpTable';
import Weather from './Weather/Weather';
import Background from './Background';

class YelpWithWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      sortKey: 'NONE',
      searchDesc: '',
      searchLoc: '',
      searchDescKey: '',
      searchLocKey: '',
      isYelpLoading: false,
      isWeatherLoading: false,
    };

    this.onSort = this.onSort.bind(this);
    this.onSearchDescChange = this.onSearchDescChange.bind(this);
    this.onSearchLocChange = this.onSearchLocChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopResults = this.fetchSearchTopResults.bind(this);
    this.setSearchTopResults = this.setSearchTopResults.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.setWeatherData = this.setWeatherData.bind(this);
    this.fetchLocationData = this.fetchLocationData.bind(this);
    this.setLocationData = this.setLocationData.bind(this);
    this.yelpResultsNotCached = this.searchQueriesNotCached.bind(this);
    this.resultsNotCached = this.resultsNotCached.bind(this);
  }

  onSort(sortKey) {
    this.setState({ sortKey });
  }

  onSearchDescChange(event) {
    this.setState({ searchDesc: event.target.value });
  }

  onSearchLocChange(event) {
    this.setState({ searchLoc: event.target.value });
  }

  onSearchSubmit(event) {
    // Make sure to trim to avoid bugs regarding the the search&cache interaction.
    const searchDesc = this.state.searchDesc.trim();
    const searchLoc = this.state.searchLoc.trim();
    const query = { searchDesc, searchLoc };

    if (searchLoc !== '') {
      if (searchDesc === '') {
        this.setState({
          searchDescKey: 'generalSearch',
          searchLocKey: searchLoc,
        });
      } else {
        this.setState({
          searchDescKey: searchDesc,
          searchLocKey: searchLoc,
        });
      }

      if (this.searchQueriesNotCached({ searchDesc, searchLoc })) {
        this.fetchSearchTopResults(query);
      }
    }

    event.preventDefault();
  }

  fetchSearchTopResults({ searchDesc, searchLoc }) {
    this.setState({ isYelpLoading: true });
    const queryString = `term=${searchDesc}&location=${searchLoc}`;

    fetch(`api/v1/dankFood?${queryString}`)
      .then(res => res.json())
      .then(res => this.setSearchTopResults(res))
      .catch(err => console.log(err));
  }

  setSearchTopResults(response) {
    if (response.statusCode === 400) {
      this.setState({ isYelpLoading: false });
    } else {
      const { businesses, region } = response;
      const { results, searchDescKey, searchLocKey } = this.state;
      const { latitude, longitude } = region.center;

      const prevState = {
        results,
        searchLoc: results && results[searchLocKey]
      };

      this.setState({
        results: {
          ...prevState.results,
          ...{
            [searchLocKey]: {
              ...prevState.searchLoc,
              [searchDescKey]: {
                location: { latitude, longitude }
              },
            },
          },
          ...{
            [latitude]: {
              [longitude]: {
                yelpResults: businesses,
              },
            },
          },
        },
      });

      const { location } = this.state.results[searchLocKey][searchDescKey];

      if (this.resultsNotCached(location)) {
        if (region) {
          this.setState({ isYelpLoading: false });
          this.fetchWeatherData();
        }
      } else {
        this.setState({ isYelpLoading: false });
        console.log('avoided loading weather api and location api');
      }
    }
  }

  fetchWeatherData() {
    this.setState({ isWeatherLoading: true });
    
    const { searchDescKey, searchLocKey } = this.state;
    const { latitude, longitude } = this.state.results[searchLocKey][searchDescKey].location;

    if (latitude && longitude) {
      fetch(`api/v1/darkSky?lat=${latitude}&lon=${longitude}`)
        .then(res => res.json())
        .then(json => this.setWeatherData(json))
        .catch(err => console.error(err));
    } else {
      console.error('latitude and longitude are null');
    }
  }

  setWeatherData(data) {
    const days = data.daily.data;
    const hours = data.hourly.data;
    const { searchDescKey, searchLocKey } = this.state;
    const { results } = this.state;

    const position = results && results[searchLocKey] && results[searchLocKey][searchDescKey].location;

    const prevState = {
      results,
      longitude: results && results[position.latitude] && results[position.latitude][position.longitude]
    };

    this.setState({
      results: {
        ...prevState.results,
        ...{
          [position.latitude]: {
            [position.longitude]: {
              ...prevState.longitude, // required because this occurs after fetchYelpResults
              weatherResults: {
                current: data.currently,
                hourlySummary: data.hourly.summary,
                hourly: [
                  hours[1], hours[2], hours[3], hours[4], hours[5], hours[6],
                ],
                daily: [
                  days[1], days[2], days[3], days[4], days[5], days[6],
                ],
              },
            },
          },
        },
      },
    });

    this.fetchLocationData();
  }

  fetchLocationData() {
    const { searchDescKey, searchLocKey } = this.state;
    const { latitude, longitude } = this.state.results[searchLocKey][searchDescKey].location;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`)
      .then(res => res.json())
      .then(data => this.setLocationData(data))
      .catch(err => console.error(err));
  }

  setLocationData(data) {
    const { results, searchDescKey, searchLocKey } = this.state;

    const position = results && results[searchLocKey] && results[searchLocKey][searchDescKey].location;

    const prevState = {
      results,
      longitude: results && results[position.latitude] && results[position.latitude][position.longitude]
    };

    for (let i = 0; i < data.results[0].address_components.length; i += 1) {
      const type = data.results[0].address_components[i].types[0];
      const loc = data.results[0].address_components[i].long_name;

      if (type === 'locality') {
        const _results = this.state.results; // results may have updated
        const locationRes = _results && _results[position.latitude] && _results[position.latitude][position.longitude].location;

        this.setState({
          results: {
            ...this.state.results,
            ...{
              [position.latitude]: {
                [position.longitude]: {
                  ...prevState.longitude,
                  location: {
                    ...locationRes,
                    ...{ city: loc },
                  },
                },
              },
            },
          },
        });
      }

      if (type === 'administrative_area_level_1') {
        const _results = this.state.results; // results may have updated
        const locationRes = _results && _results[position.latitude] && _results[position.latitude][position.longitude].location;

        this.setState({
          results: {
            ...this.state.results,
            ...{
              [position.latitude]: {
                [position.longitude]: {
                  ...prevState.longitude,
                  location: {
                    ...locationRes,
                    ...{ state: loc },
                  },
                },
              },
            },
          },
        });
      }
    }

    // Giving the browser some time to breathe before getting bombarded by more requests.
    setTimeout(() => this.setState({ isWeatherLoading: false }), 500);
  }

  searchQueriesNotCached({ searchDesc, searchLoc }) {
    const { results } = this.state;
    if (!searchDesc) searchDesc = 'generalSearch';

    return !(results && results[searchLoc] && results[searchLoc][searchDesc]);
  }

  resultsNotCached({ latitude, longitude }) {
    const { results } = this.state;

    return !(results && results[latitude] && results[latitude][longitude].weatherData);
  }

  render() {
    const { results, sortKey } = this.state;
    const { searchDesc, searchLoc, searchDescKey, searchLocKey } = this.state;
    const { latitude, longitude } = (results && results[searchLocKey] && results[searchLocKey][searchDescKey] && results[searchLocKey][searchDescKey].location) ? results[searchLocKey][searchDescKey].location : { latitude: null, longitude: null };

    const { city, state } = (results && results[latitude] && results[latitude][longitude] && results[latitude][longitude].location) ? results[latitude][longitude].location : { city: undefined, state: undefined };
    const { isYelpLoading, isWeatherLoading } = this.state;

    const list = results && results[latitude] && results[latitude][longitude].yelpResults;
    const weatherResults = results && results[latitude] && results[latitude][longitude].weatherResults;
    const location = (city && state) ? `${city}, ${state}` : '';

    const icon = (results && results[latitude] && results[latitude][longitude] && results[latitude][longitude] && results[latitude][longitude].weatherResults) ? results[latitude][longitude].weatherResults.current.icon : '';
    
    return (
      <div className="container">
        <Background icon={icon} />
        <h4 id="title">Locate businesses along with the weather</h4>
        <YelpSearch
          desc={searchDesc}
          loc={searchLoc}
          onDescChange={this.onSearchDescChange}
          onLocChange={this.onSearchLocChange}
          onSubmit={this.onSearchSubmit}
        />
        <h5 className="location">
          {location}
        </h5>
        <Weather
          weather={weatherResults}
          isLoading={isWeatherLoading}
        />
        <YelpTable
          list={list}
          sortKey={sortKey}
          isLoading={isYelpLoading}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

export default YelpWithWeather;
