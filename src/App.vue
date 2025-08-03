<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { theme } from 'ant-design-vue'

const items = ref<MenuProps['items']>([
	{
		key: 'Home',
		label: '主界面',
	},
])

const router = useRouter()

const selectedKeys = ref(['Home'])
const onSelect: SelectEventHandler = ({ key }) => {
	router.push({ name: key as string })
}
</script>

<template>
	<a-config-provider
		:theme="{
			algorithm: theme.darkAlgorithm,
		}"
	>
		<a-layout class="layout">
			<a-layout-header class="header">
				<a-menu
					v-model:selected-keys="selectedKeys"
					mode="horizontal"
					:items="items"
					@select="onSelect"
				/>
			</a-layout-header>
			<a-layout-content>
				<router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</a-layout-content>
		</a-layout>
	</a-config-provider>
</template>

<style lang="less" scoped>
.layout {
	width: 100%;
	height: 100%;
}

.header {
	padding-inline: 0;
	height: var(--header-height);
	line-height: var(--header-height);
}
</style>
