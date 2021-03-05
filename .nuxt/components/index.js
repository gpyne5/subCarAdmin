export { default as Logo } from '../../adminboard/components/Logo.vue'

export const LazyLogo = import('../../adminboard/components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
