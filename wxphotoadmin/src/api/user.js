const baseUrl = 'http://localhost:3001'

export const getUserList = () => {
  this.$http.get(`${baseUrl}/user/userlist`).then(res => { console.log(res) })
}
