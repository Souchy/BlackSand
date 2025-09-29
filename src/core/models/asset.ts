
export class Asset {
	public id: string;
	public name: string;
	public path: string;
	public type: string; // picture, video, image, model... (pictures have additional metadata)
	public extension: string; // png, jpg, obj, gltf...
	public thumbnail: string; // blob
	public date_created: Date;
	public date_modified: Date;
	public size: number; // in bytes
}
