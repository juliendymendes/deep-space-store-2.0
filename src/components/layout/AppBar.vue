<template>
	<header>
		<nav class="py-4">
			<v-container class="d-flex flex-wrap justify-space-between">
				<div>
					<router-link to="/"><v-img src="/space-icon.png" width="32"></v-img></router-link>
				</div>

				<div>
					<router-link to="/" class="text-blue text-decoration-none font-weight-medium text-subtitle-1"
						>Home</router-link
					>
				</div>

				<div>
					<v-btn icon="mdi-cart-outline"></v-btn>
				</div>
			</v-container>
		</nav>
	</header>
</template>
