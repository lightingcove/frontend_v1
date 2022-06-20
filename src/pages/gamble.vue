<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import StakedPoolsTable from '@/components/contextual/pages/pools/StakedPoolsTable.vue';
import UnstakedPoolsTable from '@/components/contextual/pages/pools/UnstakedPoolsTable.vue';
import TokenSearchInput from '@/components/inputs/TokenSearchInput.vue';
import FeaturedProtocols from '@/components/sections/FeaturedProtocols.vue';
import PoolsTable from '@/components/tables/PoolsTable/PoolsTable.vue';
import usePoolFilters from '@/composables/pools/usePoolFilters';
import usePools from '@/composables/pools/usePools';
import useStreamedPoolsQuery from '@/composables/queries/useStreamedPoolsQuery';
import useAlerts, { AlertPriority, AlertType } from '@/composables/useAlerts';
import useBreakpoints from '@/composables/useBreakpoints';
import { isMigratablePool } from '@/composables/usePool';
import useTokens from '@/composables/useTokens';
import { MIN_FIAT_VALUE_POOL_MIGRATION } from '@/constants/pools';
import { bnum } from '@/lib/utils';
import StakingProvider from '@/providers/local/staking/staking.provider';
import useWeb3 from '@/services/web3/useWeb3';

// COMPOSABLES
const router = useRouter();
const { t } = useI18n();
const { isWalletReady, appNetworkConfig, isWalletConnecting } = useWeb3();
const isElementSupported = appNetworkConfig.supportsElementPools;
const {
  selectedTokens,
  addSelectedToken,
  removeSelectedToken
} = usePoolFilters();

const { userPools, isLoadingPools, isLoadingUserPools, poolsQuery } = usePools(
  selectedTokens
);
const {
  dataStates,
  result: investmentPools,
  loadMore,
  isLoadingMore
} = useStreamedPoolsQuery(selectedTokens);
const { addAlert, removeAlert } = useAlerts();
const { upToMediumBreakpoint } = useBreakpoints();
const { priceQueryLoading } = useTokens();

// COMPUTED
const showMigrationColumn = computed(() =>
  userPools.value?.some(pool => {
    return (
      isMigratablePool(pool) &&
      // TODO: this is a temporary solution to allow only big holders to migrate due to gas costs.
      bnum(pool.shares).gt(MIN_FIAT_VALUE_POOL_MIGRATION)
    );
  })
);

// userPools.value[0].shares
watch(poolsQuery.error, () => {
  if (poolsQuery.error.value) {
    addAlert({
      id: 'pools-fetch-error',
      label: t('alerts.pools-fetch-error'),
      type: AlertType.ERROR,
      persistent: true,
      action: poolsQuery.refetch.value,
      actionLabel: t('alerts.retry-label'),
      priority: AlertPriority.MEDIUM
    });
  } else {
    removeAlert('pools-fetch-error');
  }
});

const migratableUserPools = computed(() => {
  return userPools.value.filter(pool => isMigratablePool(pool));
});

const isInvestmentPoolsTableLoading = computed(
  () => dataStates['basic'] === 'loading' || priceQueryLoading.value
);

watch(showMigrationColumn, () => console.log(showMigrationColumn.value));
/**
 * METHODS
 */
function navigateToCreatePool() {
  router.push({ name: 'create-pool' });
}
</script>

<template>
  <div class="lg:container lg:mx-auto pt-10 md:pt-12">
    <BalStack vertical>
      <div class="px-4 lg:px-0">
        <h3 class="mb-3">{{ $t('investmentPools') }}</h3>
      </div>
      <PoolsTable
        :data="investmentPools"
        :noPoolsLabel="$t('noPoolsFound')"
        :isLoadingMore="isLoadingMore"
        @loadMore="loadMore"
        :selectedTokens="selectedTokens"
        class="mb-8"
        :hiddenColumns="['migrate', 'stake']"
        :columnStates="dataStates"
        :isPaginated="true"
        :isLoading="isInvestmentPoolsTableLoading"
      >
      </PoolsTable>
    </BalStack>
  </div>
</template>
