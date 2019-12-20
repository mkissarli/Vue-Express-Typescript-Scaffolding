import Api from "@/services/Api";

export default {
  testStatus () {
    return Api.call().get("test");
    //return Api().get('/test');
  }
}
