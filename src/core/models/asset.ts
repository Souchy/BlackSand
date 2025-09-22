
export class Asset {
	public id: string;
	public path: string;
	public extension: string; // png, jpg, obj, gltf...
	public type: string; // picture, video, image, model... (pictures have additional metadata)
	public thumbnail: string; // blob
	public date_created: Date;
	public date_modified: Date;
}
