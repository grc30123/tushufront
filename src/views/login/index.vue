<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">图书 后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.account"
          placeholder="Username"
          class="custom-placeholder"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          class="custom-placeholder"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="button-container">
        <el-button
          :loading="loading"
          type="info"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录
        </el-button>
        <!--        <el-button type="info" style="width: 49%; margin-bottom: 30px;" @click.native.prevent="handleRegister">注册</el-button>-->
      </div>
      <!--      <div style="padding-bottom: 60px ;display: flex">-->
      <!--        <div style="flex: 1">还没有账号？请<span-->
      <!--          style="color: #d02c2c;cursor:pointer"-->
      <!--          @click="handleRegister"-->
      <!--        > 注册。</span></div>-->
      <!--        <div>忘记密码</div>-->
      <!--      </div>-->

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // ref组件上使用，给组件起名  作用，使用$refs.名字 可以定位到组件  .validate 对组件使用的方法，验证组件的和发行
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log('登录成功')
            console.log(res)
            console.log(res.data.code)
            if (res.data.code === 200) {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
              console.log('redirect', this.redirect)
              console.log(this.loginForm)
            } else {
              this.$message.error(res.data.data)
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
            console.log('登录失败')
            this.$message.error('res.data.data')
          })
        } else {
          this.$message.error('请输入正确格式的账号和密码')
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss">
$bg: #dfe4ea;
$light_gray: #7c7878;
$cursor: #5e5e5e;

//@supports (-webkit- mask: none) and (not (cater-color: $cursor)) {
//  .login-container .el-input input {
//    color: $cursor;
//  }
//}

.button-container {
  display: flex; /* 使用 flex 布局使按钮水平排列 */
  justify-content: space-between; /* 在容器内均匀分布元素，使按钮在同一行的两端对齐 */
  margin-bottom: 0px;
}

.custom-placeholder ::placeholder {
  color: #a8a6a6; /* 设置占位符文本的颜色为红色 */
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgb(218, 190, 177);
    background: rgb(207, 210, 215);
    border-radius: 5px;
    color: #292a2c;
  }
}
</style>

<style lang="scss" scoped>
$bg: #d3d9da;
$dark_gray: #1a1a1a;
$light_gray: #454549;

.login-container {
  display: grid;
  place-items: center; /* 元素在网格中心 */
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {

    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid #ccc; /* 添加边框样式 */
    border-radius: 8px; /* 设置边框的圆角半径，使表单具有圆角外观 */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果，使表单看起来浮在页面上 */
    background-color: #fff; /* 设置表单的背景颜色为白色 */
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
