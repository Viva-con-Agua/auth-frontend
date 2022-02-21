<template>
    <div class="text-left">
        <form>
            <vca-input
                ref="email"
                :errorMsg="$t('sign.register.email.error')"
                :placeholder="$t('sign.register.email.placeholder')"
                v-model.trim="email" 
                :rules="$v.email">
            </vca-input>
            <vca-input
                ref="display_name"
                :errorMsg="$t('sign.register.displayname.error')"
                :placeholder="$t('sign.register.displayname.placeholder')"
                v-model.trim="display_name" 
                :rules="$v.display_name">
            </vca-input>
            <vca-field-row>
                <vca-input 
                    ref="first_name"
                    first
                    :errorMsg="$t('sign.register.firstname.error')"
                    :placeholder="$t('sign.register.firstname.placeholder')"
                    v-model.trim="first_name" 
                    :rules="$v.first_name">
                </vca-input>
                <vca-input
                    ref="last_name"
                    last
                    :errorMsg="$t('sign.register.lastname.error')"
                    :placeholder="$t('sign.register.lastname.placeholder')"
                    v-model.trim="last_name" 
                    :rules="$v.last_name">
                </vca-input>
            </vca-field-row>
            <vca-input
                ref="password"
                type="password"
                :errorMsg="$t('sign.register.password1.error')"
                :placeholder="$t('sign.register.password1.placeholder')"
                v-model.trim="password" 
                :rules="$v.password">
            </vca-input>
            <vca-input
                ref="password_check"
                type="password"
                :errorMsg="pwError"
                :placeholder="$t('sign.register.password2.placeholder')"
                v-model.trim="password_check" 
                :rules="$v.password_check">
            </vca-input>

            <vca-checkbox 
                ref="privacy_policy"
                v-model="privacy_policy"
                :rules="$v.privacy_policy"
                :errorMsg="$t('sign.register.privacy_policy.error')" > 
                    <i18n path="sign.register.privacy_policy.text">
                        <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">{{ $t('sign.register.privacy_policy.privacy_policy') }}</a>
                    </i18n>
            </vca-checkbox>

            <vca-checkbox
                v-model="user.offset.newsletter">
                    <div class="highlight">{{ $t('sign.register.newsletter.title') }}</div> <span v-html="$t('sign.register.newsletter.text')"></span>
            </vca-checkbox>
            <br/>
            <div class="select-known">
                <vca-dropdown :label="$t('sign.register.known_from.label')" @input="changeKnown" :placeholder="$t('sign.register.known_from.placeholder')" ref="known_from" :options="known_options"/>
            </div>

            <button
                class="vca-button button"
                @click.prevent="validate">
                {{ $t('sign.register.title') }}
            </button>
        </form>
        <div class="vca-center text-center">
            <h2>
                <i18n path="sign.register.login">
                    <span class="link" @click="login">{{ $t('sign.login.title') }}</span>
                </i18n>
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    props: {
      scope: {
        type: String,
        default: 'factory',
        validator: function (value) {
          return value !== undefined
        }
      },
      language: {
        type: String,
        default: localStorage.language,
        validator: function (value) {
          return ['de', 'ch', 'za'].indexOf(value) !== -1
        }
      }
    },
    computed: {
        user: {
            get () {
                return this.$store.state.register.form.data
            },
            set (value) {
                this.$store.commit('register/user', value)
            }
        },
        email: {
            get () {
                return this.$store.state.register.form.data.email
            },
            set (value) {
                this.$store.commit('register/form/email', value)
            }
        },
        password: {
            get () {
                return this.$store.state.register.form.data.password
            },
            set (value) {
                this.$store.commit('register/form/password', value)
            }
        },
        display_name: {
            get () {
                return this.$store.state.register.form.data.display_name
            },
            set (value) {
                this.$store.commit('register/form/display_name', value)
            }
        },
        first_name: {
            get () {
                return this.$store.state.register.form.data.first_name
            },
            set (value) {
                this.$store.commit('register/form/first_name', value)
            }
        },
        last_name: {
            get () {
                return this.$store.state.register.form.data.last_name
            },
            set (value) {
                this.$store.commit('register/form/last_name', value)
            }
        },
        privacy_policy: {
            get () {
                return this.$store.state.register.form.data.privacy_policy
            },
            set (value) {
                this.$store.commit('register/form/privacy_policy', value)
            }
        },

        pwError () {
            if (this.$v.password_check.required && !this.$v.password_check.sameAs) {
                return this.$t('sign.register.password2.error.same')
            }
            return this.$t('sign.register.password2.error.enter')
        }
    },
    data () {
        return {
            password_check: '',            
            known_options:
            [
                { title: this.$t('sign.register.known_from.select'), label: this.$t('sign.register.known_from.select'), value: "" },
                { title: this.$t('sign.register.known_from.family_friends'),  label: this.$t('sign.register.known_from.family_friends'), value: "family_friends" },
                { title: this.$t('sign.register.known_from.festivals_cupdonation'), label: this.$t('sign.register.known_from.festivals_cupdonation'), value: "festivals_cupdonation" },
                { title: this.$t('sign.register.known_from.water'), label: this.$t('sign.register.known_from.water'), value: "water" },
                { title: this.$t('sign.register.known_from.instagram'), label: this.$t('sign.register.known_from.instagram'), value: "instagram" },
                { title: this.$t('sign.register.known_from.facebook'), label: this.$t('sign.register.known_from.facebook'), value: "facebook" }
            ]
        }
    },
    validations() {
        return this.$store.getters['register/form/validations']
    },
    created() {
        this.$store.commit('register/login_challenge', this.$route.query.login_challenge)
        this.$i18n.locale = this.$route.query.language
    },
    methods: {
        validate() {
            if (this.$v.$invalid === true) {
                this.$refs.email.validate()
                this.$refs.password.validate()
                this.$refs.first_name.validate()
                this.$refs.last_name.validate()
                this.$refs.display_name.validate()
                this.$refs.password_check.validate()
                this.$refs.privacy_policy.validate()
            } else {
                this.submit()
            }
        },
        submit() {
            //this.$store.commit('loadingFlow')
            this.$store.dispatch({type: 'register/form/register'})
                .then((data)=> {
                    if (data.payload.message === "no_token") {
                        /* TODO get scope from data.scope */
                        this.$router.push({name: "Login", query: {scope: 'move4water', msg: data.message, source: 'register'}})
                    } else {
                        if (this.$store.getters.callback !== 'null' || this.$store.getters.callback !== null) {
                            window.location = data.payload.redirect_url + "?code=" + data.payload.code + "&callback=" + this.$store.getters.callback
                        } else {
                            window.location = data.payload.redirect_url + "?code=" + data.payload.code
                        }
                    }
                })
                .catch ((error) => {
                    this.notification(error)
                })
        },
        changeKnown(nVal) {
            if (nVal.length > 0) {
                this.user.offset.known_from = nVal[0].value
            } else {
                this.user.offset.known_from = "UNKOWN"
            }
        },
        login() {
            this.$router.push({name: 'Login', query: { scope: this.$route.query.scope, language: this.$route.query.language }})
        }
    }
}
</script>
