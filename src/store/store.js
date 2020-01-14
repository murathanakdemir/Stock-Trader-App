import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';
import porfolio from './modules/portfolio';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        stocks,
        porfolio
    },
    actions
}); 