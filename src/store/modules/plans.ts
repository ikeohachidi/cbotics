import { ActionContext } from "vuex";

import RootState from "../RootState";
import { fetchApi, HttpMethods } from "../utils";
import { getStoreAccessors } from "vuex-typescript";
import App from "@/models/App";
import Plan from "@/models/Plan";

type PlanContext = ActionContext<PlanState, RootState>;

export type PlanState = {
	plans: Plan[];
};

const state: PlanState = {
	plans: []
};

const pathPrefix = 'api/v1';

export const app = {
	namespaced: true,
	state,
	mutations: {
		setPlans(state: PlanState, plans: Plan[]) {
			state.plans = plans;
		},
	},
	getters: {
		getPlans(state: PlanState): Plan[] {
			return state.plans;
		}
	},
	actions: {
		async fetchPlans(context: PlanContext): Promise<Plan[]> {
			return fetchApi({
				url: `${pathPrefix}/plans/`,
				method: HttpMethods.GET,
			}, (res) => { context.commit('setPlans', res) })
		},
	}
}

const { dispatch, read } = getStoreAccessors<PlanState, RootState>('plans');
const { actions, getters } = app;

export const plans = read(getters.getPlans);
export const fetchPlans = dispatch(actions.fetchPlans);

export default app;