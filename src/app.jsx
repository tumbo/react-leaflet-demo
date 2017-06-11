import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import Map from './map';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }


  componentDidMount() {
  }

  render() {

    const layout = [{
      i: 'a',
      x: 0,
      y: 0,
      w: false ? 5 : 10,
      h: 100 - 0,
      minH: 0,
      isDraggable: false,
      isResizable: false
    }];

    return (
      <div className="container-fluid">
          <h3>Raw Leaflet in React</h3>
          <Map />
      </div>
    );
  }
}
