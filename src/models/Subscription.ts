type SubscriptionProperties = {
	id?: number;
	user?: string;
	plan?: number;
	app?: number;
	active?: boolean;
	created_at?: string;
	updated_at?: string;
}

export default class Subscription {
	id = 0;
	user = '';
	plan = 0;
	app = 0;
	active = false;
	created_at = '';
	updated_at = '';

	constructor(init?: SubscriptionProperties) {
		if (init) {
			this.id = init.id || 0;
			this.user = init.user || '';
			this.plan = init.plan || 0;
			this.app = init.app || 0;
			this.active = init.active || true;
			this.created_at = init.created_at || '';
			this.updated_at = init.updated_at || '';
		}
	}

	get createRequest() {
		return {
			plan: this.plan,
			app: this.app,
			active: this.active
		}
	}
}