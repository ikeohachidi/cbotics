import { ActionContext } from "vuex";

import Credentials, { PasswordChange } from "@/models/Credentials";
import RootState from "../RootState";
import { fetchApi, HttpMethods } from "../utils";
import { getStoreAccessors } from "vuex-typescript";
import SERVER from "@/http";

type AuthContext = ActionContext<AuthState, RootState>;

export type AuthState = {
	credentials: Credentials;
	token: string;
};

const state: AuthState = {
	credentials: new Credentials,
	token: ''
};

export const auth = {
	namespaced: true,
	state,
	getters: {
		isUserAuthenticated() {
			return localStorage.getItem('hm-token') ? true : false
		}
	},
	mutations: {
		setCredentials(state: AuthState, credentials: Credentials) {
			state.credentials = credentials;
		},
		resetCredentials(state: AuthState) {
			state.credentials = new Credentials();
		},
		setToken(state: AuthState, token: string) {
			state.token = token;
		}
	},
	actions: {
		async signUp(context: AuthContext, credentials: Partial<Credentials>): Promise<void> {
			return fetchApi({
				url: '/rest-auth/registration/',
				method: HttpMethods.POST,
				body: credentials 
			}, () => { 
				context.commit('setCredentials')
			})
		},
		async login(context: AuthContext, credentials: Credentials) {
			return fetchApi({
				url: 'rest-auth/login/',
				method: HttpMethods.POST,
				body: credentials
			}, (res) => { 
				context.commit('setCredentials', credentials);
				context.commit('setToken', (res as {key: string}).key);

				localStorage.setItem('hm-token', (res as {key: string}).key);
			})
		},
		async logOut(context: AuthContext): Promise<void> {
			return fetchApi({
				url: 'rest-auth/logout/',
				method: HttpMethods.POST,
			}, () => { 
				context.commit('resetCredentials');
				localStorage.removeItem('hm-token');
			})
		},
		async resetPassword(context: AuthContext, email: string): Promise<void> {
			return fetchApi({
				url: 'rest-auth/password/reset/',
				method: HttpMethods.POST,
				body: { email } 
			})
		},
		async changePassword(context: AuthContext, passwordChange: PasswordChange): Promise<void> {
			return fetchApi({
				url: 'rest-auth/password/change/',
				method: HttpMethods.POST,
				body: passwordChange
			})
		},
		async confirmPasswordReset(context: AuthContext, password: PasswordChange): Promise<void> {
			return fetchApi({
				url: 'rest-auth/password/reset/confirm/',
				method: HttpMethods.POST,
				body: password
			})
		},
	}
}

const { dispatch, read } = getStoreAccessors<AuthState, RootState>('auth');
const { actions, getters } = auth;

export const isUserAuthenticated = read(getters.isUserAuthenticated);

export const signUp = dispatch(actions.signUp);
export const resetPassword = dispatch(actions.resetPassword);
export const logIn = dispatch(actions.login);
export const logOut = dispatch(actions.logOut);

export default auth;