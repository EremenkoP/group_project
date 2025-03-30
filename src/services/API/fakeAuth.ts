import { IApiAuth, IApiAuthResponce, IApiRegestry } from "../types";

export const regestry = async (body: IApiRegestry) => {
  return await new Promise<{ status: number }>((resolve, reject) => {
    if (Object.keys(body).some((value) => typeof value === "undefined")) {
      setTimeout(() => {
        reject({ status: 400 });
      }, 200);
    }
    if (localStorage.getItem(body.email)) {
      setTimeout(() => {
        reject({ status: 409 });
      }, 500);
    }
    const { email, ...data } = body;
    localStorage.setItem(email, JSON.stringify(data));
    setTimeout(() => {
      resolve({ status: 200 });
    }, 1000);
  });
};

export const login = async (body: IApiAuth) => {
  return await new Promise<IApiAuthResponce>(
    (resolve, reject) => {
      if (Object.keys(body).some((value) => typeof value === "undefined")) {
        setTimeout(() => {
          reject({ status: 401 });
        }, 500);
      }
      const item = localStorage.getItem(body.email);
      if (item) {
        const { password, userName } = JSON.parse(item);
        if (password === body.password) {
          setTimeout(() => {
            resolve({ userName });
          }, 500);
        }
      } else {
        setTimeout(() => {
          reject({ status: 401 });
        }, 500);
      }
    }
  );
};
