import L, {ControlOptions} from 'leaflet';
import {useStore} from "@/store";

export class LinkControl extends L.Control {
	// @ts-ignore
	options: ControlOptions

	private _map ?: L.Map;

	constructor(options: ControlOptions) {
		super(options);
	}

	onAdd(map: L.Map) {
		const linkButton = L.DomUtil.create('button', 'leaflet-control-link') as HTMLButtonElement;

		linkButton.type = 'button';
		linkButton.title = 'Link';
		linkButton.addEventListener('click', () => {
			const projection = useStore().state.currentProjection;
			console.log(projection.latLngToLocation(this._map!.getCenter(), 64));
		});

		return linkButton;
	}
}