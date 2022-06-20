<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  active: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  active: false
});

const classes = computed(() => ({
  'border-white dark:border-gray-900': !props.active,
  'border-red-500 text-red-500': props.active
}));
</script>

<template>
  <router-link :class="['desktop-link-item', classes]">
    <slot />
  </router-link>
</template>

<style scoped>
.desktop-link-item {
  @apply transition ease-in-out duration-500;
  @apply h-full flex flex-col justify-center;
  @apply cursor-pointer hover:text-red-500;
}
</style>
