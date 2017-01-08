import React from 'react';

import { Row, Col, Input, Button } from 'react-materialize';

const YelpSearch = ({ desc, loc, onDescChange, onLocChange, onSubmit }) =>
  <div className="search">
    <Row>
      <form onSubmit={onSubmit} className="col s12">
        <Input
          s={12} m={5}
          id="search-desc" className="validate"
          type="text" value={desc} label="Find"
          onChange={onDescChange}
        />
        <Input
          s={12} m={5}
          id="search-loc" className="validate"
          type="text" value={loc} label="Near"
          onChange={onLocChange}
        />
        <Col s={12} m={2}>
          <Button floating large className="red" icon="search" waves="light" />
        </Col>
      </form>
    </Row>
  </div>;

export default YelpSearch;
