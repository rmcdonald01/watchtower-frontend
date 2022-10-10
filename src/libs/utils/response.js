const isErrorWithResponseAndStatus = function (err) {
  return err.response && err.response.status
}

export const is401 = function (err) {
  return isErrorWithResponseAndStatus(err) && err.response.status === 401
}
export const is403 = function (err) {
  return isErrorWithResponseAndStatus(err) && err.response.status === 403
}

export const is404 = function (err) {
  return isErrorWithResponseAndStatus(err) && err.response.status === 404
}

export const is422 = function (err) {
  return isErrorWithResponseAndStatus(err) && err.response.status === 422
}
