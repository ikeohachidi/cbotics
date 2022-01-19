import { AppState } from "./modules/apps";
import { AuthState } from "./modules/auth";
import { PlanState } from "./modules/plans";
import { SubscriptionState } from "./modules/subscriptions";

export default interface RootState {
	auth: AuthState,
	apps: AppState,
	plans: PlanState,
	subscriptions: SubscriptionState
}