export class PlatformRegistry {
	app?: any;
	registrations: unknown[] = [];
	namedRegistrations: Map<string, unknown> = new Map();

	public withApp(app: unknown): PlatformRegistry {
		this.app = app ?? this.app;
		return this;
	}
	public withRegistrations(registrations: unknown[]): PlatformRegistry {
		for (const r of registrations) {
			if(isClass(r)) {
				this.namedRegistrations.set(r.name, r);
			} else {
				this.registrations.unshift(r);
			}
		}
		return this;
	}
}

export function isClass(v: any): v is Function {
	return typeof v === 'function' && v.prototype;
}
