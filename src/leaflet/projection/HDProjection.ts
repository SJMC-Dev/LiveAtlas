import {DynmapProjection} from "@/leaflet/projection/DynmapProjection";
import L from 'leaflet';
import {Coordinate} from "@/dynmap";

export interface HDProjectionOptions {
	mapToWorld: [number, number, number, number, number, number, number, number, number],
	worldToMap: [number, number, number, number, number, number, number, number, number],
	nativeZoomLevels: number
}

export interface HDProjection extends DynmapProjection {
	options: HDProjectionOptions
}

export class HDProjection extends DynmapProjection {
	constructor(options: HDProjectionOptions) {
		super(options);
		L.Util.setOptions(this, options);
	}

	locationToLatLng(location: Coordinate): L.LatLng {
		const wtp = this.options.worldToMap,
			lat = wtp[3] * location.x + wtp[4] * location.y + wtp[5] * location.z,
			lng = wtp[0] * location.x + wtp[1] * location.y + wtp[2] * location.z;

		return new L.LatLng(
			-((128 - lat) / (1 << this.options.nativeZoomLevels)),
			lng / (1 << this.options.nativeZoomLevels));
	}

	latLngToLocation(latLng: L.LatLng, y: number): Coordinate {
		const ptw = this.options.mapToWorld,
			lat = latLng.lng * (1 << this.options.nativeZoomLevels),
			lon = 128 + latLng.lat * (1 << this.options.nativeZoomLevels),
			x = ptw[0] * lat + ptw[1] * lon + ptw[2] * y,
			z = ptw[6] * lat + ptw[7] * lon + ptw[8] * y;

		return {x: x, y: y, z: z};
	}
}

export default HDProjection;