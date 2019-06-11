import Jsonp from "jsonp";
import axios from 'axios'
import { Modal } from "antd";
import Utils from './../utils/utils'
export default class Axios {
  static requestList(_this,url,params){
   var data={
     params:params
   }
   this.ajax({
     url,
     data
   }).then((data)=>{    
     if (data&&data.result) {
      _this.setState({
        list: data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        }),
        pagination: Utils.pagination(data, current => {
          _this.params.page = current;
          _this.requestList();
        })
      });
     }
   })
  }
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      Jsonp(
        options.url,
        {
          param: "callback"
        },
        function(err, response) {
          if (response.status ==='success') {
            resolve(response);
          } else {
            reject(response.message);
          }
        }
      );
    });
  }
  static ajax(option){
    let loading;
    if (option.data && option.data.isShowLoading!==false) {
      loading=document.getElementById('ajaxLoading');
      loading.style.display='block';
    }
    let bassApi='https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    return new Promise((resolve,reject)=>{
       axios({
         url:option.url,
         method:'get',
         baseURL:bassApi,
         timeout:5000,
         params:(option.data&&option.data.params)||''
       }).then((response)=>{
        if (option.data && option.data.isShowLoading!==false) {
          loading=document.getElementById('ajaxLoading');
          loading.style.display='none';
        }
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
