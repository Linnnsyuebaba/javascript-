/**
 * 万能模板 递归树
 * 全排列
 */

const combine = function (...chunks) {
  let res = []
  let count = 0
  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    let isLastChunk = chunkIndex === chunks.length - 1
    for (let val of chunk) {
      let current = [...prev, val]
      if (isLastChunk) {
        res.push(current)
      } else {
        helper(chunkIndex + 1, current)
      }
    }
  }
  helper(0, [])
  return { res, count }
}
combine(['iphone x', 'ipone 11'], ['128g', '256g'], ['red', 'white'])
