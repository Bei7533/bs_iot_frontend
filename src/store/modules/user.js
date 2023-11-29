import { login } from '@/api/login'//引入登录 api 接口

const user = {
    actions: {
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    commit('')
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default user
