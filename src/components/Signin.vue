<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h3 class="page-header">Sign In</h3>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="text" 
            class="form-control" 
				    placeholder="Your email address" 
            v-model="loginModel.email"
				    data-vv-name="email" 
            data-vv-as="Email" 
            v-validate="'required|email'" 
          />
          <span v-if="errors.first('email')" class="invalid-input">
            {{ errors.first('email') }}
          </span>
        </div>
        
        <div class="form-group mt-4">
          <label for="password">Password</label>
          <input 
            type="password" 
            class="form-control" 
            placeholder="Your password" 
            v-model="loginModel.password"
            data-vv-name="password" 
            data-vv-as="Password" 
            v-validate="'required|min:4'" 
          />
          <span v-if="errors.first('password')" class="invalid-input">
            {{ errors.first('password') }}
          </span>
        </div>

        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="loginModel.rememberMe">
          <label class="form-check-label">Remember me</label>
        </div>
        <div class="row">
          <div class="col">
            <button style="width:auto" type="submit" class="btn btn-primary">Sign In</button>
            <div>
              Don't have an account? <router-link :to="{ name: 'signup' }">Register</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AccountService from '@/services/AccountService';

export default {
  name: 'Signin',
  data () {
    return {
      loginModel: {
        email: null,
        password: null,
        rememberMe: false
      }
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          AccountService.signin(this.loginModel)
          .then(response => {
            this.$router.push('/');
          })
          .catch(error => {
            console.log('login error: ', error.response.data);
          });
        }
      })
    }
  }
}
</script>

<style>
.invalid-input {
  color: #dc3545;
}
</style>