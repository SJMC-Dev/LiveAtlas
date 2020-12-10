import {
	DynmapComponentConfig,
	DynmapMap, DynmapMarker, DynmapMarkerSet,
	DynmapMessageConfig,
	DynmapPlayer,
	DynmapServerConfig,
	DynmapWorld, DynmapWorldState
} from "@/dynmap";
import {DynmapProjection} from "@/leaflet/projection/DynmapProjection";

export type State = {
	configuration: DynmapServerConfig;
	messages: DynmapMessageConfig;
	components: DynmapComponentConfig;

	worlds: Map<string, DynmapWorld>;
	maps: Map<string, DynmapMap>;
	players: Map<string, DynmapPlayer>;
	markerSets: Map<string, DynmapMarkerSet>;

	following?: DynmapPlayer;

	// currentServer?: string;
	currentWorldState: DynmapWorldState;
	currentWorld?: DynmapWorld;
	currentMap?: DynmapMap;
	currentProjection: DynmapProjection;

	updateRequestId: number;
	updateTimestamp: Date;
}

export const state: State = {
	configuration: {
		version: '',
		allowChat: false,
		chatRequiresLogin: false,
		chatInterval: 5000,
		defaultMap: '',
		defaultWorld: '',
		defaultZoom: 0,
		followMap: '',
		followZoom: 0,
		updateInterval: 3000,
		showLayerControl: true,
		title: '',
		loginEnabled: false,
		loginRequired: false,
		maxPlayers: 0,
		hash: 0,
	},

	messages: {
		chatNotAllowed: '',
		chatRequiresLogin: '',
		chatCooldown: '',
		mapTypes: '',
		players: '',
		playerJoin: '',
		playerQuit: '',
		anonymousJoin: '',
		anonymousQuit: '',
	},

	worlds: new Map(), //Defined (loaded) worlds with maps from configuration.json
	maps: new Map(), //Defined maps from configuration.json
	players: new Map(), //Online players from world.json
	markerSets: new Map(), //Markers from world_markers.json. Contents of each set isn't reactive for performance reasons.

	//Dynmap optional components
	components: {
		// "markers" component. Only used for default showLabels settings
		markers: {
			showLabels: false,
		},
		// Optional "playermarkers" component. Settings for online player markers.
		// If not present, player markers will be disabled
		playerMarkers: undefined,

		//Optional "coords" component. Adds control showing coordinates on map mouseover
		coordinatesControl: undefined,

		//Optional clock component. Used for both "digitalclock" and "timeofdayclock". Shows world time/weather.
		clockControl: undefined,

		//Optional "link" component. Adds button to get url for current position
		linkControl: false,

		logoControls: [],
	},

	following: undefined,

	currentWorld: undefined,
	currentWorldState: {
		raining: false,
		thundering: false,
		timeOfDay: 0,
	},
	currentMap: undefined,
	currentProjection: new DynmapProjection(), //Projection for converting location <-> latlg. Object itself isn't reactive for performance reasons

	updateRequestId: 0,
	updateTimestamp: new Date(),
};