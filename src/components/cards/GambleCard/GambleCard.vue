<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const title = computed(() => {
	if ('expired') return t('passed');
	if ('upcoming') return t('upcoming');
	if ('after') return t('after');
	return t('onair');
});
</script>

<template>
    <BalCard>
		<template v-slot:header>
			<div class="w-full flex items-center justify-between">
				<h4 class="font-bold">{{ title }}</h4>
			</div>
		</template>
		<div>
			
		</div>
    </BalCard>
</template>
