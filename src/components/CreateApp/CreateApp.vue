<template>
	<div>
		<label for="name">App Name</label>
		<b-input v-model="app.name" placeholder="My New App"/>

		<div class="plans-wrapper" v-if="app.id > 0">
			<div 
				v-for="(plan, planIndex) in plans" 
				:key="planIndex" 
				class="plan-card"
				:class="{ 'active': isActivePlan(plan, planIndex) }"
				@click="selectPlan(planIndex)"
			>
				<p class="plan-card__description">{{ plan.description }}</p>
				<p class="plan-card__price">${{ plan.price }}</p>
			</div>
		</div>

		<label for="name">Description</label>
		<b-textarea 
			v-model="app.description" 
			no-resize 
			rows="6" 
			placeholder=""
		/>

		<div class="input-stack">
			<div>
				<label for="name">Type</label>
				<b-form-select size="md" v-model="app.type" :options="appTypes"></b-form-select>
			</div>
			<div>
				<label for="name">Framework</label>
				<b-form-select v-model="app.framework" :options="frameworkTypes"></b-form-select>
			</div>
		</div>

		<label for="name">Domain name</label>
		<b-input v-model="app.domain_name" placeholder="hiringexample.com"/>

		<b-button class="primary mt-4" @click="doAction">
			<span class="d-flex justify-content-center align-items-center text-capitalize">
				<loader color="#fff" dimension="15" class="me-2" v-if="loading"/> 
				<template v-else>
					{{ action }} App
				</template>
			</span>
		</b-button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import App, { AppType, Framework } from '@/models/App';
import Plan from '@/models/Plan';
import { createApp, setAppSubscripton, updateApp } from '@/store/modules/apps';
import { fetchPlans, plans } from '@/store/modules/plans';
import { fetchAppSubscription, saveSubscriptions, updateSubscription, subscriptions, updateAppSubscription } from '@/store/modules/subscriptions';
import Subscription from '@/models/Subscription';

@Component
export default class CreateApp extends Vue {
	@Prop({ default: 'create' }) action!: 'create' | 'update';
	@Prop({ default: () => (new App()) }) activeApp!: App; 

	private app = new App();
	private loading = false;
	private selectedPlan = -1;

	get plans(): Plan[] {
		return plans(this.$store);
	}

	get subscriptions(): Subscription[] {
		return subscriptions(this.$store)
	}

	get appTypes(): string[] {
		return Object.values(AppType)
		.filter(type => typeof type === 'string')
	}

	get frameworkTypes(): string[] {
		return Object.values(Framework)
			.filter(framework => typeof framework === 'string');
	}

	get appSubscription(): Subscription {
		const index = this.subscriptions.findIndex(subscription => subscription.id === this.app.subscription);
		if (index === -1) new Subscription();
		return this.subscriptions[index]
	}

	get subscriptionPlan(): Plan {
		const index = this.subscriptions.findIndex(subscription => subscription.id === this.app.subscription);
		if (index === -1) return new Plan;

		const appSubscriptions = this.subscriptions[index];

		return this.plans.find(plan => plan.id === appSubscriptions.plan) || new Plan
	}

	private isActivePlan(plan: Plan, planIndex: number): boolean {
		if (this.selectedPlan === planIndex) return true;
		if (this.selectedPlan > -1) return false;

		if (this.subscriptionPlan.id === plan.id) return true;
		if (this.app.subscription === null && plan.id === 1) return true;
		return false;
	}

	private selectPlan(plan: number) {
		this.selectedPlan = plan;
	}

	private close() {
		this.$emit('close');
	}

	private doAction() {
		switch (this.action) {
			case 'create':
				this.createApp();
				break;
			case 'update':
				this.updateApp()
				break;
		}

		if (this.selectedPlan !== -1) {
			const subscription = new Subscription({
				id: this.appSubscription.id,
				plan: this.plans[this.selectedPlan].id,
				app: this.app.id,
				active: false,
			})

			if (this.app.subscription) {
				updateSubscription(this.$store, subscription)
					.then((res) => {
						updateAppSubscription(this.$store, res);
					})
			} else {
				saveSubscriptions(this.$store, subscription.createRequest)
					.then((res) => {
						fetchAppSubscription(this.$store, res.id);
						setAppSubscripton(this.$store, res);
					})
			}
		}
	}

	private updateApp(): void {
		this.loading = true;
		updateApp(this.$store, this.app.createRequest)
			.then(this.close)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error updating app',
					variant: 'danger'
				})
			})
			.finally(() => this.loading = false)
	}

	private createApp(): void {
		this.loading = true;
		createApp(this.$store, this.app.createRequest)
			.then(this.close)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error creating app',
					variant: 'danger'
				})
			})
			.finally(() => this.loading = false)
	}

	mounted() {
		this.app = this.activeApp;
		fetchPlans(this.$store)
	}
}
</script>

<style lang="scss" scoped>
label {
	width: 100%;
}

label:not(:first-of-type), .input-stack {
	margin-top: 20px;
}

.input-stack {
	display: flex;
	justify-content: space-between;

	> div {
		width: 49%;
	}
}

.plans-wrapper {
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
	margin-top: 30px;

	.plan-card {
		border-radius: 5px;
		border: 1px solid rgb(236, 236, 236);
		padding: 10px;
		cursor: pointer;

		&__description {
			font-size: 14px;
			color: rgb(78, 78, 78);
		}

		&__price {
			margin: 5px 0 0;
			font-weight: bold;
			font-size: 18px;
		}

		&.active {
			border: 2px solid var(--color-primary);
		}
	}
}
</style>