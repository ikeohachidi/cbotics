type PlanProperties = {
	id: number;
	name: string;
	description: string;
	price: string;
	created_at: string;
	updated_at: string;
}
export default class Plan {
	id = 0;
	name = '';
	description = '';
	price = '';
	created_at = '';
	updated_at = '';

	constructor(init?: PlanProperties) {
		if (init) {
			this.id = init.id || 0;
			this.name = init.name || '';
			this.description = init.description || '';
			this.price = init.price || '';
			this.created_at = init.created_at || '';
			this.updated_at = init.updated_at || '';
		}
	}
}