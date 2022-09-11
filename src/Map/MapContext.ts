import { Map } from "ol";
import React from "react";

const defaultValue = {
    map: new Map()
}

interface IContext {
    map: Map
}

const MapContext = React.createContext<IContext>(defaultValue);

export default MapContext;