<template>
	<section class="home">
		<Navbar />
		<b-modal id="modal-create-app" hide-footer hide-header>
			<CreateApp 
				@close="$bvModal.hide('modal-create-app')" 
				:action="appAction"
				:activeApp="selectedApp"
			/>
		</b-modal>
		<b-container>
			<b-row class="mt-5">
				<b-col lg="3">
					<div class="app-card create" @click="modifyApp()">
						<b-icon-plus font-scale="2" />
						<p>Create an App</p>
					</div>
				</b-col>
				<b-col lg="3" v-for="(app, appIndex) in apps" :key="appIndex">
					<div class="app-card" @click="modifyApp(app, 'update')">
						<span class="app-card__trash" @click.stop="deleteApp(app)">
							<b-icon-trash />
						</span>
						<h5 class="fw-bold">{{ app.name }}</h5>
						<p class="mt-2">{{ app.description }}</p>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Navbar from '@/components/Navbar/Navbar.vue';
import CreateApp from '@/components/CreateApp/CreateApp.vue';

import { apps, deleteApp, fetchApps } from '@/store/modules/apps';
import App from '@/models/App';
import { fetchSubscriptions } from '@/store/modules/subscriptions';
import { fetchPlans } from '@/store/modules/plans';

@Component({
	components: {
		Navbar,
		CreateApp
	}
})
export default class Home extends Vue {
	private selectedApp = new App();
	private appAction: 'create' | 'update' = 'create';
	private loading = false;

	get apps() {
		return apps(this.$store);
	}

	private modifyApp(app: App = new App(), action: 'create' | 'update' = 'create') {
		this.appAction = action;
		this.selectedApp = app;
		this.showAppCreator();
	}

	private showAppCreator() {
		this.$bvModal.show('modal-create-app');
	}

	private deleteApp(app: App) {
		deleteApp(this.$store, app.id)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error deleting app',
					variant: 'danger'
				})
			})
	}

	mounted() {
		this.loading = true;
		fetchApps(this.$store)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error fetching apps',
					variant: 'danger'
				})
			})

		fetchSubscriptions(this.$store)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error fetching subscriptions',
					variant: 'danger'
				})
			})

		fetchPlans(this.$store)
			.catch((error) => {
				this.$bvToast.toast(error, {
					title: 'Error fetching plans',
					variant: 'danger'
				})
			})
	}
}
</script>

<style lang="scss" scoped>
.home {
	background-color: rgba(238, 238, 238, 0.034);
	height: 100vh;
}

.app-card.create {
	border: 4px dashed #f0f0f0b9;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.app-card {
	padding: 20px;
	border-radius: 7px;
	min-height: 150px;
	border: 1px solid #f0f0f0;
	background-color: #fff;
	transition: .2s;
	cursor: pointer;
	position: relative;

	&:not(.create):hover {
		box-shadow:
		0px 20.7px 3.9px -17px rgba(0, 0, 0, 0.059),
		0px 28px 31px -17px rgba(0, 0, 0, 0.07)
		;

	}
	&:hover &__trash {
		visibility: visible;
	}

	&__trash {
		position: absolute;
		top: 10px;
		right: 10px;
		border-radius: 10px;
		padding: 5px 10px;
		transition: .2s;
		visibility: hidden;
		color: rgb(139, 139, 139);

		&:hover {
			background-color: rgba(255, 0, 0, 0.055);
			color: rgb(182, 0, 0);
		}
	}
}
</style>