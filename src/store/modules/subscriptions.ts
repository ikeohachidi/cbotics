import { ActionContext } from "vuex";

import RootState from "../RootState";
import { fetchApi, HttpMethods } from "../utils";
import { getStoreAccessors } from "vuex-typescript";
import Plan from "@/models/Plan";
import Subscription from "@/models/Subscription";
import App from "@/models/App";

type PlanContext = ActionContext<SubscriptionState, RootState>;

export type SubscriptionState = {
	subscriptions: Subscription[];
};

const state: SubscriptionState = {
	subscriptions: []
};

const pathPrefix = 'api/v1';

export const subscription = {
	namespaced: true,
	state,
	mutations: {
		setSubscriptions(state: SubscriptionState, subscriptions: Subscription[]) {
			state.subscriptions = subscriptions;
		},
		addSubscription(state: SubscriptionState, subscription: Subscription) {
			state.subscriptions.push(subscription);
		},
		updateSubscription(state: SubscriptionState, subscription: Subscription) {
			const index = state.subscriptions.findIndex(subscription => subscription.app === subscription.app);
			if (index === -1) return;

			state.subscriptions[index] = subscription;
		},
	},
	getters: {
		getSubscriptions(state: SubscriptionState): Subscription[] {
			return state.subscriptions;
		}
	},
	actions: {
		async fetchSubscriptions(context: PlanContext): Promise<Plan[]> {
			return fetchApi({
				url: `${pathPrefix}/subscriptions/`,
				method: HttpMethods.GET,
			}, (res) => { context.commit('setSubscriptions', res) })
		},
		async saveSubscription(context: PlanContext, subscription: Partial<Subscription>): Promise<Subscription> {
			return fetchApi({
				url: `${pathPrefix}/subscriptions/`,
				method: HttpMethods.POST,
				body: subscription
			})
		},
		async updateSubscription(context: PlanContext, subscription: Partial<Subscription>): Promise<Subscription> {
			return fetchApi({
				url: `${pathPrefix}/subscriptions/${subscription.id}`,
				method: HttpMethods.PATCH,
				body: subscription
			})
		},
		async fetchAppSubscription(context: PlanContext, subscriptionId: number): Promise<Subscription> {
			return fetchApi({
				url: `${pathPrefix}/subscriptions/${subscriptionId}`,
				method: HttpMethods.POST,
				body: subscription
			}, (res) => { context.commit('addSubscription', res) })
		},
	}
}

const { dispatch, read, commit } = getStoreAccessors<SubscriptionState, RootState>('subscriptions');
const { actions, getters, mutations } = subscription;

export const subscriptions = read(getters.getSubscriptions);

export const updateAppSubscription = commit(mutations.updateSubscription);
export const fetchSubscriptions = dispatch(actions.fetchSubscriptions);
export const saveSubscriptions = dispatch(actions.saveSubscription);
export const updateSubscription = dispatch(actions.updateSubscription);
export const fetchAppSubscription = dispatch(actions.fetchAppSubscription);

export default subscription;