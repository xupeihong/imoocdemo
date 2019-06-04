import Jsonp from "jsonp";
import axios from 'axios'
import { Modal } from "antd";
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      Jsonp(
        options.url,
        {
          param: "callback"
        },
        function(err, response) {
          if (response.status == "success") {
            resolve(response);
          } else {
            reject(response.message);
          }
        }
      );
    });
  }
  static ajax(option){
    let bassApi='https://www.easy-mock.com/mock/5cf4d41a54a36e06b21d2051/mockapi/'
    return new Promise((resolve,reject)=>{
       axios({
         url:option.url,
         method:'get',
         baseURL:bassApi,
         timeout:5000,
         params:(option.data&&option.data.params)||''
       }).then((response)=>{
             if (response.status=='200') {
               let res=response.data;
               if (res.code=='0') {
                 resolve(res)
               }else{
                 Modal.info({
                   title:'提示',
                   content:res.msg
                 })
               }
             }else{
               reject(response.data)
             }
       })
    });
  }
}
