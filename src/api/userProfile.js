import api from './api'

const URLS = {
  userGeneralInformation: '/api/auth/me',
  updateGeneralInformation: '/api/user/',
  updatePassword: '/api/user/password/',
  updateAvatar: '/api/user/avatar/',

}

export const fetchUserGeneralInformation = () => api.get(URLS.userGeneralInformation, {})

export const updateUserGeneralInformation = (id, body) => api.post(URLS.updateGeneralInformation + id, body)
export const updateUserAvatar = (id, body) => api.post(URLS.updateAvatar + id, body)
export const updateUserAvatarWithProgress = (id, body, config) => {
  console.log('Upload: 0')
  return api.post(URLS.updateAvatar + id, body, config)
}
// export const updateUserAvatarWithProgress = (id, body) => {
//     console.log('Upload: 0')
//     return api.post(URLS.updateAvatar + id, body, {
//         onUploadProgress: (progressEvent, progress) => {
//             console.log('Upload Progress: 0')
//             console.log(progressEvent)
//         console.log('Upload Progress: '+ Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
//         progress.value = Math.round(progressEvent.loaded / progressEvent.total * 100);
//         }
//         })
// }
export const updatePassword = (id, body) => api.patch(URLS.updatePassword + id, body)
