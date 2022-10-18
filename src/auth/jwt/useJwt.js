import axios from '@axios'
import useJwt from './watchtower-auth/useJwt'
import jwtConfig from './jwtConfig'

const { jwt } = useJwt(axios, jwtConfig)
export default jwt
