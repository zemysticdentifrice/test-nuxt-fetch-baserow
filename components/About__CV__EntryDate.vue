<template>
	<div class="cv_entry_date" v-if="!removeDate">
		<span v-if="show">{{ formattedDate }}</span>
	</div>
</template>

<script setup>
const { dateStart, dateEnd } = defineProps(["dateStart", "dateEnd", "show"]);

const removeDate = ref(false);

const formattedDate = computed(() => {
	if (!dateStart && !dateEnd) {
		removeDate.value = true;
		return;
	}
	if (dateStart && !dateEnd) {
		return dateStart;
	}

	if (dateStart.match(/^\d{4}$/) && dateEnd.match(/^\d{4}$/)) {
		return `${dateStart}-${dateEnd.slice(-2)}`;
	}
});
</script>
