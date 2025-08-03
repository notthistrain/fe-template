import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeRoute from './routes/home'

export const routes: RouteRecordRaw[] = [
	{
		name: '',
		path: '/',
		redirect: { name: 'Home' },
		children: [
			HomeRoute,
		],
	},
]

export const router = createRouter({
	history: createWebHistory('/'),
	routes,
})
