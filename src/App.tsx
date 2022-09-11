import React, { useContext, useState } from 'react';
import { fromLonLat, get } from "ol/proj";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Coordinate } from 'ol/coordinate';
import { osm, vector } from "./Source";
import FeatureStyles from "./Features/Styles";
import mapConfig from "./config.json";
import GeoJSON from "ol/format/GeoJSON";
import MapContext from './Map/MapContext';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

const geojsonObject = mapConfig.geojsonObject;

const markersLonLat = [[-79.3470, 43.6509], mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray: Coordinate[]) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

function App() {
  const [center, setCenter] = useState<Coordinate>(mapConfig.center);
  const [zoom, setZoom] = useState<number>(12.5);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));
  const {map} = useContext(MapContext);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: "EPSG:4326",
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          <VectorLayer source={vector({ features })} />  
        </Layers>
        </Map>
      </div>
      <div>
        zoom: {map.getView().getZoom()}
      </div>
      {/* <div>
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        Show markers
      </div> */}
    </div>
  );
}

export default App;
