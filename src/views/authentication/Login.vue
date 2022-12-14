<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo/>
        <h2 class="brand-text text-primary ml-1">
          Watchtower
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
          lg="8"
          class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
              fluid
              :src="imgUrl"
              alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
          lg="4"
          class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
            sm="8"
            md="6"
            lg="12"
            class="px-xl-2 mx-auto"
        >
          <b-card-title
              title-tag="h2"
              class="font-weight-bold mb-1"
          >
            Welcome to Watchtower! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account and start the adventure
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
                class="auth-login-form mt-2"
                @submit.prevent
            >
              <!-- email -->
              <b-form-group
                  label="Email"
                  label-for="login-email"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                >
                  <b-form-input
                      id="login-email"
                      v-model="userEmail"
                      :state="errors.length > 0 ? false:null"
                      name="login-email"
                      placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                    #default="{ errors }"
                    name="Password"
                    rules="required"
                >
                  <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                        id="login-password"
                        v-model="password"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-alert

                    variant="danger"
                    :show="loginStatusError"
                    class="mb-0"
                >
                  <div class="alert-body">
                    <feather-icon
                        icon="InfoIcon"
                        class="mr-50"
                    />

                    {{ errorMessage }}
                  </div>
                </b-alert>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                  type="submit"
                  variant="primary"
                  block
                  @click="validationForm"
                  :disabled="loginStatusPending"
              >
                <span v-if="!loginStatusPending">Sign in</span>
                <b-spinner v-if="loginStatusPending" small />
                <span v-if="loginStatusPending">Loading...</span>

              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'page-auth-register-v2'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import {
  BRow,
  BCol,
  BLink,
  BSpinner,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { setUser } from '@/services/stateful/userService'
import {
  is404, is422, is401, is403,
} from '@/libs/utils/response'
import {apiStatusComputedFactory, apiStatus } from '@/api'
const {
  IDLE,
  ERROR,
  SUCCESS,
  PENDING,
} = apiStatus

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BSpinner,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      show: false,
      errorMessage: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      loginStatus: IDLE,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    ...apiStatusComputedFactory('loginStatus'),
  },
  methods: {
    validationForm() {
      this.loginStatus = PENDING
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          useJwt.login({
            email: this.userEmail,
            password: this.password,
          }).then(response => {
            const userData = response.data.data
            useJwt.setToken(response.data.meta.token)
            useJwt.setRefreshToken(response.data.meta.token)
            localStorage.setItem('userData', JSON.stringify(userData))
            setUser(userData)
            this.$ability.update(userData.ability)
            this.loginStatus = SUCCESS
            this.$router.replace(getHomeRouteForLoggedInUser(userData.role)).then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.fullName}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                },
              })
            })
          }).catch(error => {
            this.loginStatus = ERROR
            if (is422(error)) {
              this.errorMessage = error.response.data.errors.email
              return
            }
            if (is403(error)) {
              this.errorMessage = error.response.data.errors.verify_email
              return
            }
            this.errorMessage = 'Error. Please try again later.'
          })
        } else {
          this.loginStatus = IDLE
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
