/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import qs from 'qs';
import { get, post, del, put, upload } from '../utils/request';

export async function getRemoteConfig() {
  return get(`/manifest.json`);
}

// export async function contentLists(params) {
//   return get(`/api/contents?${qs.stringify(params)}`);
// }

// export async function tagLists(params = { pageSize: 1000 }) {
//   return get(`/api/tags?${qs.stringify(params)}`);
// }

// export async function getTests(id) {
//   return get(`/api/tests/${id}`);
// }

// export async function getTestsLists(params = { pageSize: 1000 }) {
//   return get(`/api/testss?${qs.stringify(params)}`);
// }

// export async function getContent(id) {
//   return get(`/api/content/${id}`);
// }

// export async function putContent(id, values) {
//   return put(`/api/content/${id}`, values);
// }

// export async function searchContent(keyword) {
//   return get(`/api/content/search?keyword=${keyword}`);
// }

// export async function getUserInfo() {
//   return get(`/api/user`);
// }

// export async function problemLists(params = { pageSize: 1000 }) {
//   return get(`/api/problems?${qs.stringify(params)}`);
// }

// export async function recommendLists(params = { pageSize: 1000 }) {
//   return get(`/api/recommends?${qs.stringify(params)}`);
// }

// export async function recommendByDate(id) {
//   return get(`/api/recommend/${id}`);
// }

// export async function collectionIds() {
//   return get(`/api/collection/ids`);
// }

// export async function getCollections(params = { pageSize: 20 }) {
//   return get(`/api/collections?${qs.stringify(params)}`);
// }

// export async function getGroups(params = { pageSize: 1000 }) {
//   return get(`/api/groups?${qs.stringify(params)}`);
// }

// export async function getAnswer(id) {
//   return get(`/api/answer/${id}`);
// }

// export async function createAnswer(values) {
//   return post(`/api/answer`, values);
// }

// export async function updateAnswer(id, values) {
//   return put(`/api/answer/${id}`, values);
// }

// export async function collection(values) {
//   return post(`/api/collection`, values);
// }

// export async function uploadImage(values) {
//   return upload(`/api/upload`, values);
// }

// export async function tests(values) {
//   return post(`/api/tests/default`, values);
// }

// export async function createContent(values) {
//   return post(`/api/content`, values);
// }

// export async function deleteCollection(id) {
//   return del(`/api/collection/${id}`);
// }
