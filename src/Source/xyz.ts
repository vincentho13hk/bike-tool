import * as olSource from "ol/source";
import { AttributionLike } from "ol/source/Source";

interface IXyz {
    url?: string;
    attributions?: AttributionLike;
    maxZoom?: number
}

function xyz({ url, attributions, maxZoom }: IXyz) {
	return new olSource.XYZ({ url, attributions, maxZoom });
}

export default xyz;
