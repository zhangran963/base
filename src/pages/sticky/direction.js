let prevPageYOffset = 0

export function direction(){
  let pageYOffset = window.pageYOffset;

  let res = {isUp: false, isDown: false}
  let diff = pageYOffset - prevPageYOffset

  if(diff > 0){
    console.log('* 向上滑动')

    res.isUp = true
    res.isDown = false
  }else if(diff < 0){
    console.log('* 向下滑动')

    res.isUp = false
    res.isDown = true
  }else{

    res.isUp = false
    res.isDown = false
  }

  prevPageYOffset = pageYOffset
  return res
}

