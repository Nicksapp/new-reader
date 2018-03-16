import { Alert } from 'react-native';

let token = '';

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

export default function $http(options) {
    let header = {
        'Content-Type': 'application/json',
        'X-LC-Id': 'spWm2GIyW9DqnBkYH0bLqcrk-gzGzoHsz',
        'X-LC-Key': 'PvuLRGKSiPBrFvU1seSpt9MB',
        // 'accesstoken': token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    const {url, method='GET', params=''} = options;
    const urlCheck = url && url.slice(0, 25) === 'https://api.douban.com/v2';

    console.log('request url:', url, params);  //打印请求参数

    if (params == '') {   //如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: method,
                headers: !!urlCheck ? null : header
            }).then((response) => response.json())
                .then((responseData) => {
                    // console.log('res:', url, responseData);  //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((error) => {
                    Alert.alert('提示',
                        '请求异常: ' + error,
                        [
                            { text: '确认', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false })  
                    reject(error);
                });
        });
    } else {   //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: method,
                headers: !!urlCheck ? null : header,
                body: JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then((responseData) => {
                    // console.log('res:', url, responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((error) => {
                    Alert.alert('提示',
                        '请求异常: ' + error,
                        [
                            { text: '确认', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false })
                    reject(error);
                });
        });
    }
}
