<template>
  <div class="container">
    <h1>Login to Area52</h1>
    <label>
      Enter Username/Email or Phone:
      <input type="text" name="username" v-model="username" maxlength="20">
    </label>
    <label>
      Enter Password:
      <input type="password" name="password" v-model="password" maxlength="20">
    </label>
    <div v-if="authError" class="auth-error">
      Authentication failed
    </div>
    <button type="submit" name="login" @click="onLoginClicked">Login</button>
    <button id="cancelBtn" v-if="isSubmitting" @click="cancelLogin">Cancel</button>
  </div>
</template>

<script>
import login from '../auth/login.service';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      authError: false,
      isSubmitting: false,
      login,
      loginRequest: undefined
    }
  },
  methods: {
    async onLoginClicked() {
      this.isSubmitting = true;
      this.loginRequest = this.login(this.username, this.password);

      this.loginRequest
          .then(result => {
            this.authError = !result.success;
            -
                this.redirectToDashboard();
          })
          .catch(() => {
            this.authError = true;
          })
          .finally(() => {
            this.isSubmitting = false;
          });
    },
    redirectToDashboard() {
      this.$router.push({name: 'Dashboard', path: '/dashboard'});
    },
    cancelLogin() {
      this.loginRequest.cancel();
    }
  }
}
</script>

<style scoped>

</style>
