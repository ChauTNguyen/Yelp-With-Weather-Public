import { sortBy } from 'lodash';

const SORTS = { // the sorts are in descending order
  NONE: list => list,
  RATING: list => sortBy(list, ['rating', 'review_count']).reverse(), // if ratings are equal, sort by review_count
  REVIEW_COUNT: list => sortBy(list, 'review_count').reverse()
};

export default SORTS;
