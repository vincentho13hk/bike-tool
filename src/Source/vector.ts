import Collection from 'ol/Collection';
import { Vector as VectorSource } from 'ol/source';
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';

interface IFeatures {
    features?: Feature<Geometry>[] | Collection<Feature<Geometry>> |undefined
}

function vector({ features }: IFeatures) {
	return new VectorSource({
		features
	});
}

export default vector;
