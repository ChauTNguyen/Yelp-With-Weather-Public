import React, { Component } from 'react';

import clearDay from '../../img/bg/clear-day.jpg';
import clearNight from '../../img/bg/clear-night.jpg';
import cloudy from '../../img/bg/cloudy.jpg';
import cloudyDay from '../../img/bg/partly-cloudy-day.jpg';
import cloudyNight from '../../img/bg/partly-cloudy-night.jpg';

class Background extends Component {
  getBackground(icon) {
    // console.log('icon:', icon);
    if (icon === 'empty') return;
    switch (icon) {
      case 'clear-day':
        return {
          backgroundImage: `url(${clearDay})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'clear-night':
        return {
          backgroundImage: `url(${clearNight})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'cloudy':
        return {
          backgroundImage: `url(${cloudy})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'partly-cloudy-day':
        return {
          backgroundImage: `url(${cloudyDay})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'partly-cloudy-night':
        return {
          backgroundImage: `url(${cloudyNight})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
    }
  }

  render() {
    const { icon } = this.props;
    const zeIcon = this.getBackground(icon);
    return (
      <div
        className="weather-background"
        style={zeIcon}
      />
    );
  }
}

export default Background;
