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

const waterMarkersLonLat = [[-79.3252, 43.6522], [-79.4411, 43.6363]];
const washroomMarkersLonLat = [[-79.3470, 43.6509], [-79.4024, 43.6379]];

function addMarkers(lonLatArray: Coordinate[], png: string) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: png,
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

  const waterFeatures = addMarkers(waterMarkersLonLat, "https://nusethmi.sirv.com/Images/Group%201.png");
  const washroomFeatures = addMarkers(washroomMarkersLonLat, "https://nusethmi.sirv.com/Images/Group%204.png")
  const {map} = useContext(MapContext);

  return (
    <div className="">
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
          <VectorLayer source={vector({ features: waterFeatures })} />  
          <VectorLayer source={vector({ features: washroomFeatures })} /> 
        </Layers>
        </Map>
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
