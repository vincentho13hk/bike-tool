import React, { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import MousePosition from 'ol/control/MousePosition';
import * as ol from "ol";
import "./Map.css";
import "ol/ol.css";
import { Coordinate, createStringXY } from "ol/coordinate";
import { defaults as defaultControls } from 'ol/control';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import Interaction from 'ol/interaction/Interaction';
import Select from 'ol/interaction/Select';

interface IProps {
    zoom: number
    center: Coordinate
    children?: JSX.Element | JSX.Element[]
}
const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position')!,
});
// const selectSingleClick = new Select({style: selectStyle});

const Map: React.FC<IProps> = ({ zoom, center, children }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<ol.Map>(new ol.Map());

    // on component mount
    useEffect(() => {
        let options = {
            controls: defaultControls().extend([mousePositionControl]),
            view: new ol.View({ zoom, center }),
            layers: [],
            overlays: []
        };

        let mapObject = new ol.Map(options);
        if (mapRef.current) {
            mapObject.setTarget(mapRef.current);
            setMap(mapObject);
        }
        return () => mapObject.setTarget(undefined);
    }, []);

    // zoom change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setZoom(zoom);
        console.log(zoom)
    }, [zoom]);


    useEffect(() => {
        map?.on("moveend", () => {
            // map.getView().setCenter(map?.getView().getCenter())
            // map.getView().setZoom(map?.getView().getZoom() || 9)
            console.log(map?.getView().getZoom());
            //console.log(transformExtent([800000, 800000, 864000, 847000], 'EPSG:4326', 'EPSG:3857'))
        })
    })

    useEffect(() => {
        map?.on("click", (e) => {
            // console.log(proj.transform(e.coordinate, '','EPSG:4326'))
        })
    })

    // center change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setCenter(center)
    }, [center])

    return (
        <MapContext.Provider value={{ map }}>
        <div id="mouse-position"></div>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;