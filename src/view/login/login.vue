<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      // this.$http.post(
      //   this.$api.login,
      //   {
      //     phone: '17664116174',
      //     password: '123456'
      //   }
      // )
      //   .then(res => {
      //     console.log(res)
      //     this.getUserInfo().then(res => {
      //       this.$router.push({
      //         name: this.$config.homeName
      //       })
      //     })
      //   })

      this.handleLogin({ userName: userName, password: password }).then(res => {
        console.log(res)
        this.$router.push({
          name: this.$config.homeName
        })
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
      })
    }
  }
}
</script>

<style>

</style>
