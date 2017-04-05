import React from 'react';

import { Row, Col } from 'react-materialize';

const Currently = ({ humidity, icon, precipIntensity, temperature, windSpeed }) =>
  <div className="currently">
    <Row>
      <Col s={12} m={6}>
        <h3 className="currently-header">
          Temperature
        </h3>
        <h4>
          {temperature}&#x2109;
        </h4>
      </Col>
      <Col s={12} m={6}>
        <h3 className="currently-header">
          Humidity
        </h3>
        <h4>
          {humidity}%
        </h4>
      </Col>
      <Col s={12} m={6}>
        <h3 className="currently-header">
          Wind Speed
        </h3>
        <h4>
          {windSpeed}KpH
        </h4>
      </Col>
      <Col s={12} m={6}>
        <h3 className="currently-header">
          Precipitation
        </h3>
        <h4>
          {precipIntensity}%
        </h4>
      </Col>
    </Row>
  </div>;

export default Currently;
