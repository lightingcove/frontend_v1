import { merge } from 'lodash';

import { isPolygon } from '@/composables/useNetwork';

const defaultAttrs = {
  pool: {
    id: true
  },
  timestamp: true,
  amounts: true,
  totalShares: true,
  swapVolume: true,
  swapFees: true
};

if (!isPolygon.value) {
  defaultAttrs['liquidity'] = true;
}

export default (args = {}, attrs = {}) => ({
  poolSnapshot: {
    __args: args,
    ...merge({}, defaultAttrs, attrs)
  }
});
