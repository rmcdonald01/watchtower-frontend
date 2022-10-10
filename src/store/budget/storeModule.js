import state from './moduleState.js'
import mutation from './moduleMutation.js'
import actions from './moduleActions.js';
import getters from './moduleGetters.js'

export default {
    namespaced: true,
    state,
    mutation,
    actions,
    getters,
}