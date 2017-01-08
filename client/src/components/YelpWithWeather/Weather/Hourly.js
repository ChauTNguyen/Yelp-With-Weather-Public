import React, { Component } from 'react';

import { Row, Col } from 'react-materialize';
import className from 'classnames';

import clearNight from '../../../img/md-weather-iconset/weather-clear-night.png';
import cloudy from '../../../img/md-weather-iconset/weather-clouds.png';
import cloudyNight from '../../../img/md-weather-iconset/weather-clouds-night.png';
import foggy from '../../../img/md-weather-iconset/weather-fog.png';
import rainyDay from '../../../img/md-weather-iconset/weather-rain-day.png';
import rainyNight from '../../../img/md-weather-iconset/weather-rain-night.png';
import snow from '../../../img/md-weather-iconset/weather-snow.png';
import storm from '../../../img/md-weather-iconset/weather-storm.png';
import sun from '../../../img/md-weather-iconset/weather-clear.png';
import wind from '../../../img/md-weather-iconset/weather-wind.png';

class Hourly extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: 'hidden' };
    this.show = this.show.bind(this);
    this.getHour = this.getHour.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  componentWillMount() {
    setTimeout(() => this.show(), this.props.waitTime);
  }

  show() {
    this.setState({ hidden: '' });
  }

  getHour() {
    const d = new Date();
    const hour = d.getHours() + this.props.num + 1;
    const marker = (hour >= 12 && hour < 24) ? 'PM' : 'AM';

    if (hour === 12) return '12 PM';
    else if (hour === 24) return '12 AM';
    else if (hour < 12) return `${(hour % 12)}  ${marker}`;

    return `${((hour - 12) % 12)} ${marker}`;
  }

  getIcon() {
    const condition = this.props.icon;
    const imgClass = className('weather-img');

    switch (condition) {
      case 'clear-night':
        return <img src={clearNight} className={imgClass} alt="clear night" />;
      case 'cloudy':
        return <img src={cloudy} className={imgClass} alt="cloudy" />;
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
    const { temperature } = this.props;
    const hidden = this.state.hidden;

    const weatherIconContainerClass = (!hidden) ? className('card', 'hourly', 'hourly-loaded', hidden, 'animated', 'fadeInDown') : className('card', 'weather-of-day', hidden, 'animated', 'fadeInDown');

    return (
      <Col s={4} m={2}>
        <div className={weatherIconContainerClass}>
          <div className="card-image">
            {this.getIcon()}
            <span className="card-title hour-of-day">{this.getHour()}</span>
          </div>
          <div className="hourly-temperature-overlay valign-wrapper">
            <span className="valign hourly-temperature">
              {temperature}
            </span>
          </div>
        </div>
      </Col>
    );
  }
}

export default Hourly;
