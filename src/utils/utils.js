export default {
  formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    let month =
      date.getMonth() + 1 > 10 ? date.getMonth() : "0" + (date.getMonth() + 1);
    let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
    let getSeconds=date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();
    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      "-" +
      date.getHours() +  
      ":" +
      date.getMinutes() +  
      ":" +   
      getSeconds 
    );
  }
};
