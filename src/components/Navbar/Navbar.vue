<template>
	<nav class="d-flex">
		<ul>
			<li class="logo">Dashboard</li>
			<template v-if="isUserAuthenticated">
				<li class="ml-auto" @click="logOut">Logout</li>
			</template>
			<template v-else>
				<li class="ml-auto" @click="navigate('login')">Login</li>
				<li @click="navigate('signup')">Signup</li>
			</template>
		</ul>
	</nav>	
</template>

<script lang="ts">
import { isUserAuthenticated, logOut } from '@/store/modules/auth';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
	private navigate(path: string) {
		this.$router.push({ path });
	}

	get isUserAuthenticated(): boolean {
		return isUserAuthenticated(this.$store)
	}

	private logOut() {
		logOut(this.$store)
			.then(() => {
				this.$router.push({ path: 'login' })
			})
	}
}
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	padding: 10px 10px;
	box-shadow:
		0px 7.1px 10px rgba(0, 0, 0, 0.012),
		0px 57px 80px rgba(0, 0, 0, 0.03)
	;
}

ul {
	list-style: none;
	display: flex;
	width: 960px;
	margin: 0 auto;

	li.logo {
		padding: 5px 0;
	}

	li:not(.logo) {
		padding: 5px 15px;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: rgba(160, 152, 144, 0.096);
		}
	}

}
</style>