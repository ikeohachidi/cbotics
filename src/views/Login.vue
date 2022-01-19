<template>
	<section>
		<div class="form-wrapper">
			<h2 class="fw-bold mb-4 text-center">Log in to your account</h2>
			<form class="d-flex flex-column">
				<label for="email">Email</label>
				<b-input v-model="email" id="email" placeholder="joesmith@domain.tld"/>

				<label for="password" class="mt-4">Password</label>
				<b-input v-model="password" id="password" type="password"/>
				<p class="mt-4">
					Forgot your password ? <router-link to="/reset_password">Reset Password</router-link>
				</p>

				<b-button class="primary mt- px-5 mx-auto" @click="logIn">
					<span class="d-flex justify-content-center align-items-center">
						<loader color="#fff" dimension="15" class="me-2" v-if="loading"/> 
						<template v-else> Login </template>
					</span>
				</b-button>
			</form>

			<p class="text-center mt-3">Don't have an account yet? <router-link to="/signup">Sign up</router-link></p>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { logIn } from "@/store/modules/auth";
import Credentials from "@/models/Credentials";

@Component
export default class Login extends Vue {
	private email = '';
	private password = '';
	private loading = false;

	private logIn() {
		this.loading = true;
		logIn(this.$store, new Credentials({
			email: this.email,
			password: this.password
		}))
		.then((res) => {
			setTimeout(() => {
				this.$router.push({ path: '/' })
			}, 1000);
		})
		.catch((error) => {
			this.$bvToast.toast(error, {
				variant: 'danger',
				title: 'Error signing into your account',
			})
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