<template>
	<div class="loader" :style="loaderStyle"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {
	@Prop({ default: 30 }) dimension!: number;
	@Prop({ default: '#000' }) color!: string;

	get loaderStyle() {
		return {
			height: `${this.dimension}px`,
			width: `${this.dimension}px`,
			borderColor: this.color
		}
	}
}
</script>

<style lang="scss" scoped>
.loader {
	border-width: 2px;
	border-style: solid;
	border-radius: 99999px;
	border-right-color: transparent !important;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotateZ(0deg);
	}	
	to {
		transform: rotateZ(360deg);
	}
}
</style>