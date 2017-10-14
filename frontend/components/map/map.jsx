import React from 'react';
import ReactDOM from 'react-dom';
import MarkerManager from '../../util/marker_manager';

class ActivityMap extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchEvents();
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13
    };

    const map = this.refs.map;

    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map)

  }
  render() {
    return (
      <div style={{width: 500, height:500}}
        id='map'
        ref="map">
      </div>
    );
  }
}

export default ActivityMap;