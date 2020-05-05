<template>
    <el-form
        :ref="credentials"
        :model="credentials"
        @keyup.enter.native="submit(credentials)"
        :rules="rules">
        <el-form-item
            label="signin.label.email"
            prop="email">
            <el-input
                v-model="credentials.email"
                autoComplete="on"
                />
        </el-form-item>
        <el-form-item
            label="signin.label.password"
            prop="password">
            <el-input
                v-model="credentials.password"
                type="password"
                >
            </el-input>
        </el-form-item>
        <button
            class="vca-button-primary button"
            @click.prevent="submit(credentials)">
            options.signin
        </button>

    </el-form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Credentials',
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: 'validationError.email',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'inputSample.email',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: 'validateError.passwordRequired',
                        trigger: 'blur'
                    }
                ]
            }

        }
    },
    methods: {
        submit(value) {
            this.$refs[value].validate((valid) => {
                if (valid) {
                    axios.post('/api/auth/signin', this.credentials)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style scoped>
.button{
    margin-top:1em;
    margin-bottom:1em;
    width: 100%;
}
</style>
