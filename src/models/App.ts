import Plan from "./Plan";
import Subscription from "./Subscription";

export enum AppType {
	WEB = 'Web',
	MOBILE = 'Mobile'
}

export enum Framework {
	DJANGO = 'Django',
	REACT_NATIVE = 'React Native'
}

type AppProperties = {
	id?: number;
	name?: string;
	description?: string;
	type?: AppType; 
	framework?: Framework;
	domain_name?: string;
	screenshot?: string;
	subscription?: number;
	user?: number;
	created_at?: string;
	updated_at?: string;
}

export default class App {
	id = 0;
	name = '';
	description = '';
	type = AppType.WEB; 
	framework = Framework.DJANGO;
	domain_name = '';
	screenshot = '';
	subscription = 0;
	user = 0;
	created_at = '';
	updated_at = '';

	constructor(init?: AppProperties) {
		if (init) {
			this.id = init.id || 0;
			this.name = init.name || '';
			this.description = init.description || '';
			this.type = init.type || AppType.WEB;
			this.framework = init.framework || Framework.DJANGO;
			this.domain_name = init.domain_name || '';
			this.screenshot = init.screenshot || '';
			this.subscription = init.subscription || 0;
			this.user = init.user || 0;
			this.created_at = init.created_at || '';
			this.updated_at = init.updated_at || '';
		}
	}

	get createRequest(): Partial<App> {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			type: this.type,
			framework: this.framework,
			domain_name: this.domain_name,
		}
	}
}