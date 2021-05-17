/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';
import Constants from './Constants';

const base = async (url: string, params: any) => {
  const { headers = {} } = params;
  params.headers = {
    ...headers,
  };

  const response = await fetch(url, params);
  const data = await response.json();

  return data;
};

/**
 * get请求
 * @param url
 * @param callBack
 */
export const get = async (url: string) => {
  const isHttp = url.indexOf('http') === 0;
  return base(`${isHttp ? url : `${Constants.BASE_URL}${url}`}`, {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  });
};

/**
 * delete请求
 * @param url
 * @param callBack
 */
export const del = (url: string) => {
  return base(`${Constants.BASE_URL}${url}`, {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    mode: 'cors',
  });
};

/**
 * post请求
 * @param url
 * @param data
 * @param callBack
 */
export const post = (url: string, data: any, headers = {}) => {
  return base(`${Constants.BASE_URL}${url}`, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    method: 'POST',
    mode: 'cors',
  });
};

/**
 * post请求
 * @param url
 * @param data
 * @param callBack
 */
export const upload = (url: string, data: any) => {
  return base(`${Constants.BASE_URL}${url}`, {
    body: data,
    cache: 'no-cache',
    credentials: 'include',
    method: 'POST',
    mode: 'cors',
  });
};

/**
 * put请求
 * @param url
 * @param data
 * @param callBack
 */
export const put = (url: string, data: any) => {
  return base(`${Constants.BASE_URL}${url}`, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    mode: 'cors',
  });
};
