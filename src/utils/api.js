const bird = "https://bird.ioliu.cn/v2?url=";

const api = "https://spwm2giy.api.lncld.net/1.1";
const douban = "https://api.douban.com/v2";

export default {
    // 注册
    registerUser: `${api}/users`,
    // 登录
    loginUser: `${api}/login`,

    // 正在上映
    getMovieInTheaters: `${douban}/movie/in_theaters`,
    // 即将上映
    getMovieCommingSoon: `${douban}/movie/coming_soon`,
    // top250
    getMovieTop250: `${douban}/movie/top250`,
    // 电影条目信息
    getMovieSubject: `${douban}/movie/subject`, // :id
}