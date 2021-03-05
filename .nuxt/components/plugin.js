import Vue from 'vue'

const components = {
  CarsTable: () => import('../../adminboard/components/CarsTable.vue' /* webpackChunkName: "components/cars-table" */).then(c => c.default || c),
  Logo: () => import('../../adminboard/components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
