import axios from '@axios'


export default {
    storeBudget ({commit}, budget) {
        return new Promise((resolve, reject) => {
            axios.post('/api/budgets', budget).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error)
            }); 
        })
    },
    budgets({commit}, queryParams) {
        return new Promise((resolve, reject) => {
            axios.get('/api/budgets', queryParams).then((response) => {
                //commit(SET_BUDGET, 'ramon')
                resolve(response);
            }).catch((error) => {
                reject(error)
            })
        })
    },
    showBudget({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.get('/api/budgets/' + params.id).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    updateBudget({commit}, params) {
        return new Promise((resolve, reject) => {
            //params.budget._method = 'PUT'
            axios.patch('/api/budgets/' + params.id, params.budget).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    deleteBudget({commit}, id) {
        return new Promise((resolve, reject) => {
            //params.budget._method = 'PUT'
            axios.delete('/api/budgets/' + id).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}