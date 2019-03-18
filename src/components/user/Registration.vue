<template>
	<div>
		<router-link to="/user/login">登录</router-link>
	</div>
</template>
<script>
	export default {
		methods: {
			register() {
				this.$router.push("/project/new")
			}
		}
	}
</script>