import Vue from 'vue'
import Vuex from 'vuex'

import authenticationModule from './modules/auth';
import appModule from './modules/apps';
import plansModule from './modules/plans';
import subscriptionsModule from './modules/subscriptions';
import RootState from './RootState';

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
	modules: {
		auth: authenticationModule,
		apps: appModule,
		plans: plansModule,
		subscriptions: subscriptionsModule,
	}
})
