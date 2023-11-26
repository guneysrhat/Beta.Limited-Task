// Library
import axios from "axios";

const BASE_URL = "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/";

//* Token'siz api istekleri icin bir instance olustur.
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

//* local storage'dan token'ı oku
const escapedToken = JSON.parse(localStorage.getItem("persist:root"))?.token;
const token = escapedToken && JSON.parse(escapedToken);

console.log(token)

//* Token gerektiren istekler icin bir baska instance olusutur.
export const axiosWithToken = axios.create({
  baseURL: BASE_URL,
  headers: { "Session-ID": `${token}` },
});

//* Instance, token'nın ilk degirini okuyarak istekte bulunur.
//* Dolayisiyla bazen localSotrage'Dan token alinmadan ilk degeri (null) ile istek yapilmis olabilir.
//* Bunun cozumu icin axios interceptors kullanilabilir.
//* interceptor belirtilen her axios instance calismadan once calisan bir metodtur.
//* Dolayısıyla once yeni token okunmasini saglar.

axiosWithToken.interceptors.request.use((config) => {
  console.log("interceptor run");

  if (!config.headers["Session-ID"]) {
    config.headers["Session-ID"] = `${token}`;
  }
  return config;
});

