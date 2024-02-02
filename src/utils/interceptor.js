import axios from 'axios'
import defaultAvator from '../assets/avator.png'

axios.defaults.baseURL = GLOBAL.Host
/**
 * 苏州appid
 * at: 2023年9月27日
 */
const getTokenFn = function () {
  axios.post('/api/account/loginapi', {
    UserName: GLOBAL.UserName,
    Password: GLOBAL.Password
  }).then(({data}) => {
    sessionStorage.setItem('token', data.data.accesstoken)
    sessionStorage.setItem('nickName', data.data.nickName)
    sessionStorage.setItem('avator', data.data.avator || defaultAvator)
  }).catch(e => {
    console.error(e)
  })
}

getTokenFn()

axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = "Bearer  " + sessionStorage.getItem('token');
  }
  return config;
})

axios.interceptors.response.use(function(response){
  return response;
},function(error){
  console.log(error.response);
  if (error.response.data.code == 401) {
    getTokenFn()
    console.log(error.response.data.msg)
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
  return Promise.reject(error.response);
});



export default axios