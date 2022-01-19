import { ActionContext } from "vuex";

import RootState from "../RootState";
import { fetchApi, HttpMethods } from "../utils";
import { getStoreAccessors } from "vuex-typescript";
import App from "@/models/App";
import Subscription from "@/models/Subscription";

type AppContext = ActionContext<AppState, RootState>;

export type AppState = {
	apps: App[];
};

const state: AppState = {
	apps: []
};

const pathPrefix = 'api/v1';

export const app = {
	namespaced: true,
	state,
	mutations: {
		setApps(state: AppState, apps: App[]) {
			state.apps = apps;
		},
		addApp(state: AppState, app: App) {
			state.apps.push(app);
		},
		updateApp(state: AppState, update: App) {
			const index = state.apps.findIndex(app => app.id == update.id);
			if (index === -1) return;

			Object.assign(state.apps, state.apps[index])
		},
		removeApp(state: AppState, appID: number) {
			const index = state.apps.findIndex(app => app.id === appID);
			if (index === -1) return;

			state.apps.splice(index, 1)
		},
		setAppSubscripton(state: AppState, update: Partial<Subscription>) {
			const index = state.apps.findIndex(app => app.id === update.app);
			if (index === -1) return;

			state.apps[index].subscription = update.id as number;
		}
	},
	getters: {
		getApps(state: AppState): App[] {
			return state.apps;
		}
	},
	actions: {
		async fetchApps(context: AppContext): Promise<App> {
			return fetchApi({
				url: `${pathPrefix}/apps/`,
				method: HttpMethods.GET,
			}, (res) => { context.commit('setApps', res) })
		},
		async createApp(context: AppContext, app: Partial<App>): Promise<App> {
			return fetchApi({
				url: `${pathPrefix}/apps/`,
				method: HttpMethods.POST,
				body: app
			}, (res) => { context.commit('addApp', res) })
		},
		async updateApp(context: AppContext, app: Partial<App>) {
			return fetchApi({
				url: `${pathPrefix}/apps/${app.id}/`,
				method: HttpMethods.PATCH,
				body: app
			}, () => { context.commit('updateApp', app) })
		},
		async deleteApp(context: AppContext, appID: number): Promise<App> {
			return fetchApi({
				url: `${pathPrefix}/apps/${appID}/`,
				method: HttpMethods.DELETE,
			}, () => { context.commit('removeApp', appID) })
		},
	}
}

const { dispatch, read, commit } = getStoreAccessors<AppState, RootState>('apps');
const { actions, getters, mutations } = app;

export const apps = read(getters.getApps);
export const fetchApps = dispatch(actions.fetchApps);
export const updateApp = dispatch(actions.updateApp);
export const createApp = dispatch(actions.createApp);
export const deleteApp = dispatch(actions.deleteApp);

export const setAppSubscripton = commit(mutations.setAppSubscripton);

export default app;