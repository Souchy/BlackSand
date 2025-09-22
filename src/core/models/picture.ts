import { Asset } from "./asset";

export class Picture extends Asset {
	public width: number;
	public height: number;
	public metadata: {
		// Additional metadata specific to pictures
		author: string;
		geolocation: string; // e.g., GPS coordinates
		// copyright: string;
		// camera: string; // e.g., camera model
		// lens: string; // e.g., lens model
	};
}
