<script setup lang="ts">
import { computed, onMounted } from 'vue';
// Composables
import { useStore } from 'vuex';

// Components
// import MyWallet from '@/components/cards/MyWallet/MyWallet.vue';
import TradeCard from '@/components/cards/TradeCard/TradeCard.vue';
import TradeCardGP from '@/components/cards/TradeCardGP/TradeCardGP.vue';
// import FuturesCard from '@/components/cards/TradeCard/FuturesCard.vue';
// import TrendingPairs from '@/components/cards/TrendingPairs/TrendingPairs.vue';
import Col3Layout from '@/components/layouts/Col3Layout.vue';
import usePoolFilters from '@/composables/pools/usePoolFilters';
import { ENABLE_LEGACY_TRADE_INTERFACE } from '@/composables/trade/constants';
// Types
import { TradeInterface } from '@/store/modules/app';

/**
 * COMPOSABLES
 */
const store = useStore();
const { setSelectedTokens } = usePoolFilters();

/**
 * COMPUTED
 */
const appLoading = computed(() => store.state.app.loading);
const tradeInterface = computed(() => store.state.app.tradeInterface);

onMounted(() => {
  // selectedPoolTokens are only persisted between the Home/Pool pages
  setSelectedTokens([]);
});
</script>

<template>
  <Col3Layout offsetGutters mobileHideGutters class="mt-8">
    <BalLoadingBlock v-if="appLoading" class="h-96" />
    <template v-else>
      <template v-if="ENABLE_LEGACY_TRADE_INTERFACE">
        <TradeCard v-if="tradeInterface === TradeInterface.BALANCER" />
        <TradeCardGP v-else-if="tradeInterface === TradeInterface.GNOSIS" />
      </template>
      <template v-else>
        <TradeCardGP />
      </template>
    </template>
  </Col3Layout>
</template>
