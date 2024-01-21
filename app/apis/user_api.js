import axios from 'axios';
import http, { instance } from './http';

export const loginApi = async data => instance.post('users/login', data);
export const registerApi = async data => instance.post('users/register', data);
// export const logout = async data => instance.post('users/lo', data);

export const getAllProduct = async data => instance.get('products');
export const getAllProductId = async id => instance.get(`products/${id}`);
export const addtocart = async (id, access_token) =>
  instance.post(
    `carts`,
    { product_id: id },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
export const getcart = async access_token =>
  instance.get(`carts`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const deletecart = async (id, access_token) =>
  instance.delete(`carts/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const deleteallcart = async access_token =>
  instance.delete(`carts`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const getMe = async access_token =>
  instance.get(`users`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const updateMe = async (access_token, body) =>
  instance.post(`users/update-me`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const searchProduct = async key => instance.get(`products/search/${key}`);
export const searchProductList = async key => instance.get(`products/list/${key}`);
