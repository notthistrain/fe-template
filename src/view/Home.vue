<script setup lang="ts">
import { useStore } from '~/store'

const store = useStore()
const { mode } = storeToRefs(store)
</script>

<template>
	<a-space class="home" direction="vertical">
		{{ mode }}
	</a-space>
</template>

<style lang="less" scoped>
.home {
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>
