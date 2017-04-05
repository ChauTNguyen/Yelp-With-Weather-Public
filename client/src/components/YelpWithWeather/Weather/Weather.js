import React, { Component } from 'react';

import { Collapsible, CollapsibleItem, Row } from 'react-materialize';
import className from 'classnames';

import Currently from './Currently';
import Hourly from './Hourly';
import Day from './Day';
import withLoader from '../../Loader/withLoader';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state: '',
    };

    this.getTodayForecast = this.getTodayForecast.bind(this);
    this.getHourlyForecast = this.getHourlyForecast.bind(this);
    this.getWeeklyForecast = this.getWeeklyForecast.bind(this);
  }

  getTodayForecast() {
    const { humidity, icon, precipIntensity, temperature, windSpeed } = this.props.weather.current;

    return (
      <Currently
        humidity={humidity}
        icon={icon}
        precipIntensity={precipIntensity}
        temperature={temperature}
        windSpeed={windSpeed}
      />
    );
  }

  getHourlyForecast() {
    const hourlyContainerClass = className('hourly-container');
    const hourlyClass = className('hidden', 'hourly-container');

    if (this.props.weather !== null) {
      const hourlyData = this.props.weather.hourly;
      const hourlyElements = [];
      let waitTime = 1000;
      for (let i = 0; i < hourlyData.length; i += 1) {
        hourlyElements.push(
          <Hourly
            className={hourlyClass}
            key={i}
            num={i}
            icon={hourlyData[i].icon}
            temperature={hourlyData[i].temperature}
            waitTime={waitTime}
          />
        );

        waitTime += 250;
      }

      return (
        <div>
          <div className={hourlyContainerClass}>
            {hourlyElements}
          </div>
        </div>
      );
    }
  }

  getWeeklyForecast() {
    const daysContainerClass = className('days-container');
    const daysClass = className('hidden', 'day-container')

    if (this.props.weather !== null) {
      const daysData = this.props.weather.daily;
      const daysElements = [];
      let waitTime = 1000;

      for (let i = 0; i < daysData.length; i += 1) {
        daysElements.push(
          <Day
            className={daysClass}
            key={i}
            num={i}
            icon={daysData[i].icon}
            minTemperature={daysData[i].temperatureMin}
            maxTemperature={daysData[i].temperatureMax}
            waitTime={waitTime}
          />
        );

        waitTime += 250;
      }

      return (
        <div>
          <div className={daysContainerClass}>
            {daysElements}
          </div>
        </div>
      );
    }
  }

  render() {
    const { latitude, longitude, weather } = this.props;
    
    if (weather) {
      return (
        <div className="weather">
          <Collapsible popout>
            <CollapsibleItem expanded header="Today">
              {this.getTodayForecast()}
            </CollapsibleItem>
            <CollapsibleItem expanded header="Hourly Forecast">
              <Row>
                {this.getHourlyForecast()}
              </Row>
            </CollapsibleItem>
            <CollapsibleItem expanded header="Weekly Forecast">
              <Row>
                {this.getWeeklyForecast()}
              </Row>
            </CollapsibleItem>
          </Collapsible>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

export default withLoader(Weather);
