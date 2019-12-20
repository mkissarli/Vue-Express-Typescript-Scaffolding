import axios from 'axios'

export default class Api {
  static call() {
    return axios.create({
      baseURL: `http://192.168.0.28:8081/`,
      withCredentials: false,
      headers: Api.headers
    });
  }
  static headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }
}
