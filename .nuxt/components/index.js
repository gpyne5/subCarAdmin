export { default as CarsTable } from '../../adminboard/components/CarsTable.vue'
export { default as CurrenMonth } from '../../adminboard/components/CurrenMonth.vue'
export { default as Logo } from '../../adminboard/components/Logo.vue'

export const LazyCarsTable = import('../../adminboard/components/CarsTable.vue' /* webpackChunkName: "components/cars-table" */).then(c => c.default || c)
export const LazyCurrenMonth = import('../../adminboard/components/CurrenMonth.vue' /* webpackChunkName: "components/curren-month" */).then(c => c.default || c)
export const LazyLogo = import('../../adminboard/components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
