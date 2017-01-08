import React, { Component } from 'react';

import $ from 'jquery';

function initScrollToYelpResults() {
  $('.sort-item').hover(function () {
    $('html, body').animate({ scrollTop: $('.yelp-table').offset().top }, 100);
  });
}

class YelpSort extends Component {
  componentDidMount() {
    initScrollToYelpResults();
  }

  render() {
    const { onSort } = this.props;

    return (
      <div className="yelp-sort fixed-action-btn click-to-toggle">
        <a className="sort-item btn-floating btn-large red">
          Sort
        </a>

        <ul>
          <li>
            <span className="btn-floating btn-floating-text">by Rating</span>
            <a onClick={() => onSort('RATING')} className="sort-item btn-floating btn-large green">
              <i className="material-icons">
                thumbs_up_down
              </i>
            </a>
          </li>
          <li>
            <span className="btn-floating btn-floating-text">by Review Count</span>
            <a onClick={() => onSort('REVIEW_COUNT')} className="sort-item btn-floating btn-large blue">
              <i className="material-icons">
                supervisor_account
              </i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default YelpSort;
