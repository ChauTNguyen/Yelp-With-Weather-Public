import React from 'react';

import withLoader from '../../Loader/withLoader';
import YelpBusinessItem from './YelpBusinessItem';
import YelpSort from './YelpSort';
import YelpSortTypes from './YelpSortTypes';

const YelpTable = ({ list, sortKey, onSort }) => {
  if (list && list.length > 0) {
    const sortedList = YelpSortTypes[sortKey](list);

    return (
      <div className="yelp-table row">
        <YelpSort onSort={onSort} />

        {sortedList.map((item, index) => (
          <YelpBusinessItem
            key={index} index={index}
            imageUrl={item.image_url} name={item.name}
            url={item.url} ratingImgUrl={item.rating_img_url_small} rating={item.rating} reviewCount={item.review_count}
            address={item.location.display_address}
            city={item.location.city}
          />
        ))}

      </div>
    );
  } else {
    return (
      <div />
    );
  }
};

export default withLoader(YelpTable);
