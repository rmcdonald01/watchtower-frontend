import api from './api'

export const verifyEmail = (url) => {
    return api.get(url, {});
}
