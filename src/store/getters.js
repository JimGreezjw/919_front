const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sdnum: state => state.sdnum.sdnum,
  userId: state => state.user.userId,
  userList: state => state.user.userList
}
export default getters
