import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getArticles() {
    const teams = await api.get(host + '/data/cars');
    return teams;
}

export async function getArticle(id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function createAritcle(article) {
    return await api.post(host + '/data/cars', article);
}

export async function editArticle(id, article) {
    return await api.put(host + '/data/cars/' + id, article);
}

export async function deleteArticle(id) {
    return await api.del(host + '/data/cars/' + id);
}

export async function getMyArticles(){
    const userId=sessionStorage.getItem('userId')
    const data=await api.get(host+`/data/cars?where=_ownerId%3D%22${userId}%22`)
    return data
}