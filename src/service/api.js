/*
 * @Author: zhaoweihan
 * @Date: 2017-06-02 16:39:13
 * @Last Modified by: zhaoweihan
 * @Last Modified time: 2017-08-21 11:23:14
 */
import axios from 'axios'
const baseUrl = 'http://39.107.115.234:3001' // 192.168.102.63 | 192.168.1.106 | 39.107.115.234 | https://zwh.natapp4.cc
export const servers = {
  /**
         * get请求
         * @param {*接口地址} url
         * @param {*成功回调} sucessCallback
         * @param {*请求参数} dataParams
         */
  get (url, dataParams, sucessCallback) {
    axios.get(baseUrl + url, {
      params: dataParams
    }).then(function (response) {
      const result = response.data
      if (result.code === 200) {
        sucessCallback(result.data)
      } else {
        this.$message.error(result)
      }
    })
      .catch(function (error) {
        console.log('e:' + error)
      })
  },
  /**
         * post请求
         * @param {*接口地址} url
         * @param {*成功回调} sucessCallback
         * @param {*请求参数} dataParams
         */
  post (url, dataParams, sucessCallback, errorCallback) {
    axios.post(baseUrl + url, dataParams)
      .then(function (response) {
        const result = response.data
        if (result.code === 200) {
          sucessCallback(result.data)
        } else if (result.code >= 6000) {
          errorCallback(result.msg)
        }
      })
      .catch(function (error) {
        console.log('e:' + error)
      })
  },
  /*
         *表格数据
         */
  getTableData () {
    return this.get('/tableList', (result) => {

    })
  }
}
// 删除数组指定元素
// Array.prototype.deleteItemById = function (id) {
//   var i
//   this.forEach((ele, index) => {
//     if (ele.id == id) {
//       i = index
//     }
//   })
//   this.splice(i, 1)
// }
// // 判断数组是否包换某个元素
// Array.prototype.contains = function (needle) {
//   for (let i in this) {
//     if (this[i] == needle) return true
//   }
//   return false
// }
