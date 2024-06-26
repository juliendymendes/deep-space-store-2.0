<template>
	<v-app>
		<v-main>
			<Alert />
			<Loader />
			<AppBar />

			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import Loader from './components/ui/Loader.vue';
import Alert from './components/ui/Alert.vue';
import AppBar from './components/layout/AppBar.vue';
//
</script>
