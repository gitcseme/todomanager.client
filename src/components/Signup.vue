<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h3 class="page-header">Sign Up</h3>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="text" 
            class="form-control" 
				    placeholder="Your email address" 
            v-model="signinModel.email"
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
            v-model="signinModel.password"
            data-vv-name="password" 
            data-vv-as="Password" 
            v-validate="'required|min:4'" 
          />
          <span v-if="errors.first('password')" class="invalid-input">
            {{ errors.first('password') }}
          </span>
        </div>

        <div class="form-group mt-4">
          <button style="width:auto" type="submit" class="btn btn-primary">Submit</button>
          <router-link style="float: right" :to="{ name: 'signin' }">Back to signin</router-link>
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
      signinModel: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          AccountService.signup(this.signinModel).then(response => {
            this.$router.push({ name: 'dashboard' });
          }).catch(error => {
            console.log('signup error: ', error.response.data);
          });
        }
      });
    }
  }
}
</script>