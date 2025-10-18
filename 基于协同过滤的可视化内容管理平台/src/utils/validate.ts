/**
 * @param {string} str
 * @return {Boolean}
 */
export const isValidUsername = (str: string) => {
  const name = ['wowowo-1213', 'wowowo-admin']; // 这边用来设置允许的用户名，拥有的才能登陆
  return name.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} str
 * @return {Boolean}
 */
export const isValidPassword = (password: string) => {
  const pwd = ['114514']; // 这边用来设置对应用户名的密码
  return pwd.indexOf(password.trim()) >= 0;
}