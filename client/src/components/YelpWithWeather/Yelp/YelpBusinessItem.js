import React from 'react';

import { Col } from 'react-materialize';

const YelpBusinessItem = ({
  index, imageUrl, name, url,
  ratingImgUrl, rating, reviewCount,
  address, city,
}) =>
  <Col s={12} className="wow fadeIn" key={index}>
    <div className="card horizontal">
      <div className="card-image">
        <img src={imageUrl} className="yelp-card-img" alt={name} />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <div className="top">
            <h6 className="header card-header">
              {index + 1}. <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
            </h6>
            <span className="business-address">
              <div className="hide-on-med-and-up">
                {address[0]}, {city}
              </div>
              <span className="hide-on-small-only right">
                {address[0]}<br />
                {address[1]}
              </span>
            </span>
          </div>
          <div className="ratings">
            <img src={ratingImgUrl} alt={rating} />
          </div>
          <div className="num-of-ratings">
            {reviewCount} reviews
          </div>
        </div>
      </div>
    </div>
  </Col>;

export default YelpBusinessItem;
