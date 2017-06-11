import React from 'react';
import _ from 'lodash';
import './styles/app.css';
import L from 'leaflet';

import config from './config.js';
import portlandHoods from './public/portland-hoods.geo.json';

const accessToken = config.mapBoxToken;
console.log('portlandHoods', portlandHoods)

const geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Moda",
        "amenity": "Arena",
        "popupContent": "Concerts and shows"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-122.6668, 45.5316]
    }
};
export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  /*
    Note... we have different kinds of layers in leaflet
    Layers can be defined, but not used... use addTo to actually add it to the map

    L.tileLayer - our map tiles
    L.geoJSON - geo json shape file

  */

  componentDidMount() {
    const template = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
    // this.featureLayer = L.tileLayer(template, { id: 'mapbox.streets', accessToken })

    // this initializes,
    this.mymap = L.map('map').setView([45.5231, -122.6365], 12);

    // tileLayer defiines a layer, but then it's the addTo method which adds it?
    // yep... func returns an object
    // L.tileLayer(template, { id: 'mapbox.streets', accessToken }).addTo(mymap);
    this.baseMaps = {
      grey: L.tileLayer(template, { id: 'mapbox.light', accessToken }),
      // dark: L.tileLayer(template, { id: 'mapbox.dark', accessToken }),
      aerial: L.tileLayer(template, { id: 'mapbox.satellite', accessToken }),
      streets: L.tileLayer(template, { id: 'mapbox.streets', accessToken })
    };

    this.baseMaps.streets.addTo(this.mymap);
    // this.portlandLayer = L.geoJson(geojsonFeature).addTo(this.mymap)
    this.portlandLayer = L.geoJson(portlandHoods).addTo(this.mymap)

    // remove() gets rid of the map layer
    // addTo(mapObj) add the layer to mapObj

    // now try and add a geo json layer

    console.log('mymap', this.mymap)
    console.log('portland', this.portlandLayer)

    // add shape level stuff tooltip to portland layer
    this.portlandLayer.eachLayer((shape) => {
      var lbl = '';
      _.forOwn(shape.feature.properties, (k,v) => {
        lbl += `${k} - ${v}<br/>`
      })
      shape.bindTooltip(lbl, {sticky: true});
      // style http://leafletjs.com/reference-1.0.0.html#path-option
      shape.setStyle({
        weight: '1',
        className: 'pdx-hood',
        fillColor: 'blue',
        fillOpacity: .3
      })
    })

    // adding listeners on zoom and pan...
    this.mymap.on('moveend', () => { console.log('moveend fired!') })
    this.mymap.on('zoomend', () => { console.log('moveend fired!') })

    // exploring FeatureGroup... used to apply something across a set of features
    this.featureLayer = new L.FeatureGroup();
    // this.featureLayer.setGeoJSON({
    //     type: 'FeatureCollection',
    //     features
    //   }).addTo(this.map);
  }



  render() {
    return (
      <div id="map"></div>
    );
  }
}
