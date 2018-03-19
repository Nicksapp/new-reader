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
        params: '',
    })
}
// 搜索图书
export function getBookBySearch(params) {
    return $http({
        url: api.getBookBySearch + '?q=' + params.q,
        method: 'GET',
    })
}