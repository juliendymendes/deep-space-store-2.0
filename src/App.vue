<template>
	<v-app>
		<v-main>
			<Alert />
			<Loader />

			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import Loader from './components/Loader.vue';
import Alert from './components/Alert.vue';
//
</script>
