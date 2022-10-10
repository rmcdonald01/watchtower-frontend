import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'
import jwtConfig from './jwtConfig'

const { jwt } = useJwt(axios, jwtConfig)
export default jwt
