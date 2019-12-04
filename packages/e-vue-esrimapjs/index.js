import eVueEsrimapjs from './e-vue-esrimapjs.vue'


eVueEsrimapjs.install = function (vue) {
    Vue.component(eVueEsrimapjs.name, eVueEsrimapjs)
}

export default eVueEsrimapjs;