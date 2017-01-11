import React, { Component } from 'react';

import clearDay from '../../img/bg/clear-day.jpg';
import clearNight from '../../img/bg/clear-night.jpg';
import cloudy from '../../img/bg/cloudy.jpg';
import cloudyDay from '../../img/bg/partly-cloudy-day.jpg';
import cloudyNight from '../../img/bg/partly-cloudy-night.jpg';
import rainy from '../../img/bg/rain.jpg';

class Background extends Component {
  constructor(props) {
    super(props);
    this.getBackground = this.getBackground.bind(this);
  }

  getBackground(icon) {
    // console.log('icon:', icon);
    if (icon === 'empty') return {};

    let bgStyle = {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    let bgImg = {};

    switch (icon) {
      case 'clear-day':
        bgImg = { backgroundImage: `url(${clearDay})` };
        break;
      case 'clear-night':
        bgImg = { backgroundImage: `url(${clearNight})` };
        break;
      case 'cloudy':
        bgImg = { backgroundImage: `url(${cloudy})` };
        break;
      case 'partly-cloudy-day':
        bgImg = { backgroundImage: `url(${cloudyDay})` };
        break;
      case 'partly-cloudy-night':
        bgImg = { backgroundImage: `url(${cloudyNight})` };
        break;
      case 'rain':
        bgImg = { backgroundImage: `url(${rainy})` };
        break;
      default:
        console.log('no background img available; pls report');
    }

    return { ...bgStyle, ...bgImg };
  }

  render() {
    const { icon } = this.props;
    const bgStyle = this.getBackground(icon);
    return (
      <div
        className="weather-background"
        style={bgStyle}
      />
    );
  }
}

export default Background;
