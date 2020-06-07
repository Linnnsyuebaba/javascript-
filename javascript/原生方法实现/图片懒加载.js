let imageList = document.querySelectorAll('img'),
  length = imageList.length

//getBoundingClientRect
const lazyload = (function () {
  let count = 0
  return function () {
    let loadedIndexList = []
    imageList.forEach((img, index) => {
      let rect = img.getBoundingClientRect()
      if (rect.top > window.innerHeight) {
        img.src = img.dataset.src
        loadedIndexList.push(index)
        count++
        if (count === num) {
          document.removeEventListener('scroll', lazyload)
        }
      }
    })
    imageList = imageList.filter(
      (item, index) => !loadedIndexList.includes(index)
    )
  }
})()

// IntersectionObserver
const lazyload = function () {
  let obserer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entries.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src
        obserer.unobserve(entry.target)
      }
    })
  })
  imageList.forEach(img => {
    obserer.observe(img)
  })
}
