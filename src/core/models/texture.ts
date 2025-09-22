import { Asset } from "./asset";

export class Texture extends Asset {
	public width: number;
	public height: number;
	// public channels: number; // e.g., 3 for RGB, 4 for RGBA
	// public bitDepth: number; // e.g., 8, 16
	// public isCompressed: boolean;
	// public compressionType: string; // e.g., "DXT1", "BC7"
}
