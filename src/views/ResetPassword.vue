<template>
	<section>
		<div class="form-wrapper">
			<h2 class="fw-bold mb-4 text-center">Reset Password</h2>
			<form class="d-flex flex-column">
				<label for="email">Email</label>
				<b-input v-model="email" id="email" placeholder="joesmith@domain.tld"/>

				<b-button class="primary mt-4 px-5 mx-auto" @click="resetPassword">
					<span class="d-flex justify-content-center align-items-center">
						<loader color="#fff" dimension="15" class="me-2" v-if="loading"/> 
						<template v-else> Reset Password </template>
					</span>
				</b-button>
			</form>

			<p class="text-center mt-3">Don't have an account yet? <router-link to="/signup">Sign up</router-link></p>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { resetPassword } from "@/store/modules/auth";

@Component
export default class Login extends Vue {
	private email = '';
	private loading = false;

	private resetPassword() {
		this.loading = true;

		resetPassword(this.$store, this.email)
			.then((res) => {
				this.$bvToast.toast('A password reset mail has been sent to the provided email', {
					variant: 'success',
					title: 'Password Reset',
				});
			})
			.catch((error) => {
				this.$bvToast.toast(error, {
					variant: 'danger',
					title: 'Error resetting password',
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