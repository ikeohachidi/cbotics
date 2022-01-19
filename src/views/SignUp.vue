<template>
	<section>
		<div class="form-wrapper">
			<h2 class="fw-bold mb-4">Create an account</h2>
			<form class="d-flex flex-column">
				<label for="email">Email</label>
				<b-input v-model="email" id="email" placeholder="joesmith@domain.tld"/>

				<label for="password" class="mt-4">Password</label>
				<b-input v-model="password" id="password" type="password"/>

				<b-button class="primary mt-4 px-5 mx-auto" @click="signUp">
					<span class="d-flex justify-content-center align-items-center">
						<loader color="#fff" dimension="15" class="me-2" v-if="loading"/> 
						<template v-else> Login </template>
					</span>
				</b-button>
			</form>

			<p class="text-center mt-3">Already have an account <router-link to="/login">Login</router-link></p>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { signUp } from "@/store/modules/auth";
import Credentials from "@/models/Credentials";

@Component
export default class Login extends Vue {
	private email = '';
	private password = '';
	private loading = false;

	private signUp() {
		this.loading = true;
		signUp(this.$store, {
			email: this.email,
			password: this.password
		})
		.then((res) => {
			this.$bvToast.toast('Your account has been created successfully', {
				variant: 'success',
				title: 'Account Created',
			});
			this.$router.push({ path: '/login' });
		})
		.catch((error) => {
			this.$bvToast.toast(error, {
				variant: 'danger',
				title: 'Error creating your account',
			});
		})
		.finally(() => this.loading = false)
	}
}
</script>

<style lang="scss" scoped>
section {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

label {
	margin-bottom: 5px;
}

.form-wrapper {
	width: 25%;
}
</style>