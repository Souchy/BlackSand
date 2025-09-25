
export class Library {
	public id: string;
	public name: string;
	public path: string;
	public recursive: boolean;
	public ignore: string[]; //  patterns to ignore
	public date_created: Date;
	public date_modified: Date;
	public date_scanned: Date;
}
