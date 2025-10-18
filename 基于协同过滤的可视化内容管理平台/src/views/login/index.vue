<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">登录界面</h1>
 
      <el-form :model="form" label-width="auto" class="login-form">
        <el-form-item label="用户名" class="form-item">
          <span class="svg-container">
            <img :src="userIcon" alt="user" class="img-svg">
          </span>
          <el-input 
            v-model="form.username" 
            placeholder="用户名只能是wowowo-1213或者wowowo-admin"
            class="form-input"
          />
        </el-form-item>
 
        <el-form-item label="密码" class="form-item">
          <span class="svg-container">
            <img :src="passwordIcon" alt="password" class="img-svg">
          </span>
          <el-input 
            v-model="form.password" 
            :type="passwordType" 
            placeholder="密码是114514捏~(￣▽￣)~*"
            class="form-input"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="toggleShowPassword">
            <img :src="passwordType === 'password' ? eyeIcon : eyeOpenIcon" alt="eye" class="img-svg" />
          </span>
        </el-form-item>
 
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="Login">
import { ref, reactive } from 'vue';
import { getIcon } from '@/icons';
import { isValidUsername, isValidPassword } from '@/utils/validate';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const userIcon = getIcon('user');
const passwordIcon = getIcon('password');
const eyeIcon = getIcon('eye');
const eyeOpenIcon = getIcon('eye-open');

const passwordType = ref('password');

const toggleShowPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
}

// 这边是Element-plus的默认导入写法
// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
});

const handleLogin = async () => {
  try {
    const validUsername = isValidUsername(form.username);
    const validPassword = isValidPassword(form.password);
    if (!validUsername) {
      alert('用户名不正确');
      return;
    } else if (!validPassword) {
      alert('密码不正确');
      return;
    }

    await userStore.login(form);
    router.push('/');
  } catch (error) {
    alert('登录失败，用户名不存在或密码错误(这边其实还可以根据不同情况来弹出不同提示)');
    console.error('错误发生在login页面，登录失败:', error);
  }
};
</script>

<style scoped>
:root {
  --day-color: #f5f7fa;
  --night-color: #283443;
  --day-login-box-background: #fff;
  --night-login-box-background: ;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}
 
.login-box {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 8px;
  /* 这边下面 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
 
.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}
 
.login-form {
  width: 100%;
}
 
.form-item {
  margin-bottom: 22px;
}
 
.form-input {
  width: 100%;
}

.form-item :deep(.el-form-item__label-wrap) {
  height: 52px;
  display: flex;
  align-items: center;
  font-size: 16px
}

/* 在.form-item中深度查找类名为 .el-input__inner 的元素 */
.form-input :deep(.el-input__inner) {
  padding-left: 35px;
  height: 50px;
  font-size: 16px;
}
 
.svg-container {
  /* 这边是相对于el-form-item__content进行位移，为什么 */
  position: absolute;
  left: 10px;
  top: 60%;
  transform: translateY(-50%);
  z-index: 1;
}
 
.img-svg {
  width: 18px;
  height: 18px;
  color: #c0c4cc;
}
 
.show-pwd {
  position: absolute;
  right: 10px;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}
 
.login-btn {
  width: 100%;
  margin-top: 10px;
  height: 40px;
  font-size: 16px;
}
</style>