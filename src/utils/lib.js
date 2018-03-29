import $http from './fetch'
import api from './api'

/**
 * options 格式
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

export function registerUser(params) {
    return $http({
        url: api.registerUser,
        method: 'POST',
        params
    })
}
export function loginUser(params) {
    return $http({
        url: api.loginUser,
        method: 'POST',
        params
    })
}

export function getMovieInTheaters() {
    return $http({
        url: api.getMovieInTheaters,
        method: 'GET',
        params: '',
    })
}
export function getMovieCommingSoon() {
    return $http({
        url: api.getMovieCommingSoon,
        method: 'GET',
        params: '',
    })
}
export function getMovieTop250() {
    return $http({
        url: api.getMovieTop250,
        method: 'GET',
        params: '',
    })
}
export function getMovieSubject(id) {
    return $http({
        url: api.getMovieSubject + '/' + id,
        method: 'GET',
    })
}
// 搜索图书
export function getBookBySearch(params) {
    return $http({
        url: api.getBookBySearch + '?q=' + params.q,
        method: 'GET',
    })
}
// 获取图书信息
export function getBookById(id) {
    return $http({
        url: api.getBookById + '/' + id,
        method: 'GET',
    })
}
// 获取某本图书的所有笔记
export function getBookAnnotations(id) {
    return $http({
        url: api.getBookAnnotations + '/' + id + '/annotations',
        method: 'GET'
    })
}
// 获取某系列书目
export function getBookBySeries(id) {
    return $http({
        url: api.getBookBySeries + '/' + id + '/books',
        method: 'GET'
    })
}
// 根据isbn获取图书信息
export function getBookByISBN(isbn) {
    return $http({
        url: api.getBookByISBN + '/' + isbn,
        method: 'GET'
    })
}
// 获取豆瓣今日精选
export function getTodayRecommend() {
    return $http({
        url: api.getTodayRecommend,
        method: 'GET'
    })
}

// 收藏项目
export function postCollection(params) {
    return $http({
        url: api.postCollection,
        method: 'POST',
        params
    })
}
// chakan收藏项目
export function getCollection(params) {
    return $http({
        url: `${api.getCollection}?where={"user_id":"${params.user_id}"}`,
        method: 'GET',
    })
}
// 记录某本书的笔记
export function postBookNote(params) {
    return $http({
        url: api.postBookNote,
        method: 'POST',
        params
    })
}
// 获得所有 lc 中的笔记
export function getBookNote() {
    return $http({
        url: api.getBookNote,
        method: 'GET',
    })
}
// 获得个人笔记
export function getBookNoteByUser(params) {
    return $http({
        url: `${api.getBookNote}?where={"user_id":"${params.user_id}"}`,
        method: 'GET',
    })
}
