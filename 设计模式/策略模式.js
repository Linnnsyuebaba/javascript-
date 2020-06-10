// 策略类 可变可扩展
let levelList = {
  A: (num) => num * 2,
  B: (num) => num * 3,
  C: (num) => num * 4,
}

// 环境类 不可变 接受请求分发策略
const dispense = (level, num) => levelList[level](num)
