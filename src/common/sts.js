import axios from "axios";

const stsUrl = "/upload/sts"; /* 接口: 获取sts */
const stsKey = 'sts'

/**
 * 获取STS账号
 */
export async function getSTS() {
  let stsValue = sessionStorage.getItem(stsKey)
  let cachedSTS = stsValue ? JSON.parse(stsValue) : null

  /* 不合格, 远程获取; 合格, 跳过 */
  if (!isValid(cachedSTS)) {
    try {
      cachedSTS = await axios.get(stsUrl)
      
      console.log('* 缓存最新的sts', cachedSTS)
      /* 缓存最新的sts */
      if(cachedSTS){
        cachedSTS.created = Date.now()
        sessionStorage.setItem(stsKey, JSON.stringify(cachedSTS))
      }else{
        throw Error(`解析sts出错 ${JSON.stringify(cachedSTS)}`)
      }
    } catch (err) {
      return Promise.reject('获取sts出错', err)
    }
  }

  /* 解构有效内容并返回 */
  let {
    accessKeyId = null,
    accessKeySecret = null,
    stsToken = null,
    bucket = null,
    region
  } = cachedSTS
  return {
    accessKeyId,
    accessKeySecret,
    stsToken,
    bucket,
    region
  }
}

/**
 * 判断 STS账号是否有效
 */
function isValid(cachedSTS) {
  if (cachedSTS) {
    let { created, expired } = cachedSTS
    /* 过期时间点 > 当前时间 => 有效期内 */
    if (created + expired * 0.8 > Date.now()) {
      return true
    }
  }
  return false
}