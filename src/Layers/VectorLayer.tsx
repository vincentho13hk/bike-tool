import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { StyleLike } from "ol/style/Style";

interface IProps {
    source: VectorSource
    zIndex?: number
    style?: StyleLike
}

const VectorLayer: React.FC<IProps> = ({ source, style, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			source,
			style
		});

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map]);

	return null;
};

export default VectorLayer;