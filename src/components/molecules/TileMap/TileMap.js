import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import tiles, { E, S, LF, F, DF, OC, SM, T, V } from '../../../constants/enums/Tiles';

import TileProvider, { tileTypes } from '../../containers/TileProvider/TileProvider';

const Map = styled.div`
  display: block;
  position: relative;
  height: 600px;
  width: 600px;
`;

const Odd = styled.div`
  display: block;
  position: relative;
  top: 4px;
  > div {
    float: left;
  }
  width: 600px;
  clear: left;
`;

const Even = styled.div`
  display: block;
  position: relative;
  width: 600px;
  top: 4px;
  > div {
    float: left;
  }
`;

const tileMap = [
  [E, S, S, S, S, E],
  [E, S, LF, F, DF, S, E],
  [S, SM, V, T, OC, S],
  [E, S, LF, F, DF, S, E],
  [E, S, S, S, S, E],
];

export default class TileMap extends Component {
  static displayName = 'molecules/TileMap';

  constructor(props) {
    super(props);

    this.state = { activeTile: null };
  }

  getEvenOdd = rowIndex => (rowIndex % 2 === 0 ? Odd : Even);

  getTileType = column => (typeof tiles[column] !== 'undefined' ? tiles[column] : tileTypes.Empty);

  getMapRowCol = (row, rowIndex, column, columnIndex) =>
    React.createElement(
      TileProvider,
      {
        key: `${_.uniqueId('column')}:${rowIndex}:${columnIndex}`,
        type: this.getTileType(column),
        handle: this.handle,
        activeTile: this.state.activeTile,
        halfTile: rowIndex % 2 === 1 && (columnIndex === 0 || columnIndex === row.length - 1),
        left: rowIndex % 2 === 0 && columnIndex === 0,
        right: rowIndex % 2 === 0 && columnIndex === row.length - 1,
      },
      ''
    );

  getMapRowCols = (row, rowIndex) =>
    _.map(row, (column, columnIndex) => this.getMapRowCol(row, rowIndex, column, columnIndex));

  getMapRow = (row, rowIndex) =>
    React.createElement(
      this.getEvenOdd(rowIndex),
      {
        key: `${_.uniqueId('row')}:${rowIndex}`,
      },
      this.getMapRowCols(row, rowIndex)
    );

  getMapRows = () => _.map(tileMap, this.getMapRow);

  getMap = () => React.createElement(Map, {}, this.getMapRows());

  handle = tile =>
    this.setState({
      activeTile: tile && tile !== this.state.activeTile ? tile : null,
    });

  render() {
    return this.getMap();
  }
}
