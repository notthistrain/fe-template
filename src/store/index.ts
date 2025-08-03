export const useStore = defineStore('store', () => {
	const mode = ref('')
	function setMode(v: string) {
		mode.value = v
	}

	return {
		mode,
		setMode,
	}
})
