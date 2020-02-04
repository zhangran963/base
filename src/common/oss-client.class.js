import OSS from "ali-oss";
import { getSTS } from "./sts";

export class COSSClient {
  constructor() {
    // getSTS().then(sts => {
    //   let { region, accessKeyId, accessKeySecret, stsToken, bucket } = sts;

    //   this.client = new OSS({
    //     region,
    //     accessKeyId,
    //     accessKeySecret,
    //     stsToken,
    //     bucket
    //   });
    // }).catch(err => {
    //   console.log('* err', err)
    // })

    // this.client = null

    this.path = "/www/lyric/lyrics/"
  }

  /* 新创建 client */
  async create(){
    try {
      let sts = await getSTS()
      let { region, accessKeyId, accessKeySecret, stsToken, bucket } = sts;
      this.client = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        stsToken,
        bucket
      });
    } catch (err) {
      console.log('* err', err)
    }
  }

  get client(){

  }
}


export async function createOSSClient(){
  try {
    let sts = await getSTS()
    let { region, accessKeyId, accessKeySecret, stsToken, bucket } = sts;
    console.log('创建一次client')
    return new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket
    });
  } catch (err) {
    console.log('* err', err)
  }
}
