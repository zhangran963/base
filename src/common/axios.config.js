import $global from './GLOBAL.vue';
import Loading from "element-ui/lib/loading";
let loadingObj = null;

// axios 默认值
import axios from "axios";
const domain = process.env.NODE_ENV==='development'?'':'https://api.thesoundofsilence.top'
// const domain = 'https://api.thesoundofsilence.top';
axios.defaults.baseURL = `${domain}/base`;


let pending = []; // [{标识, 取消函数}, ...]
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    pending.forEach((pend, index)=>{
        let url = config.url.startsWith('/base')?config.url.slice(5):config.url;
        if (pend.id === url + "&" + config.method){
            pend.cancel();
            pending.splice(index, 1);
            console.log('取消请求: ', pend.id);
        }
    })
};


/**
 * 请求
 */
axios.interceptors.request.use(config => {
    removePending(config); // 移除旧的相同请求, 用本次请求
    config.cancelToken = new cancelToken(cancel => {
        // {id:标识; cancel:取消函数; showLoading: 是否需要loading}
        pending.push({ id: config.url + "&" + config.method, cancel, showLoading: $global.showLoading });
    });

    // 显示 loading
    if($global.showLoading){
        loadingObj = Loading.service({ fullscreen: true,background: "rgba(0, 0, 0, 0.7)" });
    }

    return config
}, Promise.reject);


/**
 * 响应
 */
axios.interceptors.response.use(({config, data: originData, status}) => {
    removePending(config); // 把已经完成的请求从pending中移除
    
    // 没有需要显示的 loading 了;
    if(loadingObj && !pending.some(pend=>pend.showLoading)){
        loadingObj.close();
    }
    $global.showLoading = true;

    // 通用处理
    if (status === 200) {
        if (originData.code === 0) {
            return originData.data;
        } else {
            return Promise.reject(originData.msg);
        }
    } else {
        return Promise.reject("网络错误");
    }
}, Promise.reject);