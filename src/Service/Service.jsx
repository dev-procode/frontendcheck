import axios from "axios";
import { toast } from "react-toastify";

export const serverPath = "https://api.chartersub.com/v1";

export const userInstance = async (
  method,
  endpoint,
  data = {},
  id = "",
  index = ""
) => {
  return new Promise((resolve, reject) => {
    if (method === "GET") {
      axios
        .get(`${serverPath}/${endpoint}${data}${id}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            resolve(res);
          } else {
            throw new Error("Http response code is: " + res.status);
          }
        })
        .catch(function (error) {
          // toast.error(error.message);
          console.log(error.toJSON());
          return Promise.reject(error);
        });
    } else if (method === "POST") {
      axios({
        method: "post",
        url: `${serverPath}/${endpoint}`,
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: (token && `Bearer ${token} `) || null,
        },
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            resolve(res);
          } else {
            throw new Error("Http response code is: " + res.status);
          }
        })
        .catch(function (error) {
          // toast.error(error.message);
          console.log(error.toJSON());
          return reject(error);
        });
    } else {
      axios({
        method: "patch",
        url: `${serverPath}/${endpoint}${id}${index}`,
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).catch(function (error) {
        // toast.error(error.response.data.message);
        console.log(error.toJSON());
        return reject(error);
      });
    }
  });
};
