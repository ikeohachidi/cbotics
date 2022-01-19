type CredentialsProperties = {
	name?: string; 
	username?: string;
	email: string;
	password: string;
}

export default class Credentials {
	name = '';
	username = '';
	email = '';
	password = '';

	constructor(init?: CredentialsProperties) {
		this.name = init?.name || '';
		this.username = init?.username || '';
		this.email = init?.email || '';
		this.password = init?.password || '';
	}

	createRequest() {
		return {
			email: this.email,
			password: this.password
		}
	}
}

export type PasswordChange = {
	new_password1: string;
	new_password2: string;
}