const bird = "https://bird.ioliu.cn/v2?url=";

const api = "https://spwm2giy.api.lncld.net/1.1";
const douban = "https://api.douban.com/v2";
const leanclooud = "https://nreader.leanapp.cn/api"

export default {
    // 注册
    registerUser: `${api}/users`,
    // 登录
    loginUser: `${api}/login`,
    // 修改密码
    modifyPassword: `${api}/users/`,
    // 收藏项目
    postCollection: `${api}/classes/collection`,
    // 查看收藏
    getCollection: `${api}/classes/collection`,
    // 取消收藏

    // 课程收藏
    lessonCollection: `${api}/classes/lessoncollection`,

    // 正在上映
    getMovieInTheaters: `${douban}/movie/in_theaters`,
    // 即将上映
    getMovieCommingSoon: `${douban}/movie/coming_soon`,
    // top250
    getMovieTop250: `${douban}/movie/top250`,
    // 电影条目信息
    getMovieSubject: `${douban}/movie/subject`, // :id

    // 获取图书信息
    getBookById: `${douban}/book`, //:id
    // 根据isbn获取图书信息
    getBookByISBN: `${douban}/book/isbn`, //:name
    // 搜索图书
    getBookBySearch: `${douban}/book/search`, // params: q->查询关键字，tag->查询tag，count->取结果的条数, start->取结果的开始位置
    // 获取某本图书的所有笔记
    getBookAnnotations: `${douban}/book`, //:id/annotations,
    // 获取某篇笔记的信息
    getBookAnnotationsInfo: `${douban}/book/annotation`, //:id
    // 获取某系列书目
    getBookBySeries: `${douban}/book/series`, //  :id/books

    // 获取豆瓣今日精选
    getTodayRecommend: `${leanclooud}/doubanhome`,

    // 获得标签下所有书籍
    getBookByTag: `${douban}/book/search`, // query: tag = ''
    // 记录某本书的笔记
    postBookNote: `${api}/classes/note`,
    // 获得所有 lc 中的笔记
    getBookNote: `${api}/classes/note`,
    // 删除指定笔记
    
    // 慕课列表
    getMoocList: `${leanclooud}/mooc`,
    // 电影 tag
    getMovieBySearch: `${douban}/movie/search`, 
}