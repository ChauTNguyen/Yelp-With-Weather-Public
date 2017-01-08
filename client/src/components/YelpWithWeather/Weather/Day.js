import React, { Component } from 'react';

import className from 'classnames';

import cloudy from '../../../img/md-weather-iconset/weather-few-clouds.png';
import cloudyNight from '../../../img/md-weather-iconset/weather-clouds-night.png';
import foggy from '../../../img/md-weather-iconset/weather-fog.png';
import night from '../../../img/md-weather-iconset/weather-clear-night.png';
import rainyDay from '../../../img/md-weather-iconset/weather-rain-day.png';
import rainyNight from '../../../img/md-weather-iconset/weather-rain-night.png';
import snow from '../../../img/md-weather-iconset/weather-snow.png';
import storm from '../../../img/md-weather-iconset/weather-storm.png';
import sun from '../../../img/md-weather-iconset/weather-clear.png';
import wind from '../../../img/md-weather-iconset/weather-wind.png';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: 'hidden' };
    this.show = this.show.bind(this);
    this.getDay = this.getDay.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);
  }

  componentWillMount() {
    setTimeout(() => this.show(), this.props.waitTime);
  }

  show() {
    this.setState({ hidden: '' });
  }

  getDay() {
    const d = new Date();
    return this.getDayOfWeek(d.getDay() + this.props.num);
  }

  getDayOfWeek(day) {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day % 7];
  }

  getIcon() {
    const condition = this.props.icon;
    // console.log(condition);
    const imgClass = className('weather-img');
    switch (condition) {
      case 'partly-cloudy-day':
        return <img src={cloudy} className={imgClass} alt="cloudy day" />;
      case 'partly-cloudy-night':
        return <img src={cloudyNight} className={imgClass} alt="cloudy night" />;
      case 'rain':
        return <img src={rainyNight} className={imgClass} alt="rain..." />;
      default:
        return <img src={sun} className={imgClass} alt="default sun" />;
    }
  }

  render() {
    const { minTemperature, maxTemperature } = this.props;
    const hidden = this.state.hidden;

    const weatherIconContainerClass = (!hidden) ? className('card', 'day', 'day-loaded', hidden, 'animated', 'fadeInDown') : className('card', 'weather-of-day', hidden, 'animated', 'fadeInDown');

    return (
      <div className="col s4 m2">
        <div className={weatherIconContainerClass}>
          <div className="card-image">
            {this.getIcon()}
            <span className="card-title day-of-week">{this.getDay()}</span>
          </div>
          <div className="card-content">
            <p>
              Max: {maxTemperature}<br />
              Min: {minTemperature}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Day;
