import { Asset } from "./asset";

export class Model3d extends Asset {
	public metadata: {
		// Additional metadata specific to models
		author: string;
		license: string;
		version: string;
	};
}
