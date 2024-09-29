// fetch frames from json file
const loadFrames = async (path) => {
    try {
      const response = await fetch(path)
      const pageData = await response.json()
      return pageData.frames
    } catch (error) {
      console.error('Error loading frames:', error)
      return []
    }
  };

// build image path from pageName and imageFilename (e.g. "arad" -> "assets/arad/image.jpg")
const buildImagePath = (pageName, imageFilename) => (`assets/${pageName}/${imageFilename}`)

const imagesContainer = document.querySelector('#images')
const imageContainer = imagesContainer.querySelector('img')
const subtitleContainer = imagesContainer.querySelector('.subtitle')

const renderFrame = (pageName, frame) => {
  const imagePath = buildImagePath(pageName, frame.image)
  imageContainer.src = imagePath
  subtitleContainer.innerText = frame.subtitle
}

const renderNewFrame = (pageName, frames, newFrameIndex) => {
  const newFrame = frames[newFrameIndex]
  renderFrame(pageName, newFrame)
}

const initializeGallery = async (pageName) => {
  const path = `data/${pageName}.json`
  const frames = await loadFrames(path)

  if (frames.length === 0) {
    console.error('No frames loaded')
    return
  }

  // render first frame
  let currentFrameIndex = 0
  renderNewFrame(pageName, frames, currentFrameIndex)

  // add event listener to the div#images to render the next image when clicked
  imagesContainer.addEventListener('click', () => {
    currentFrameIndex = (currentFrameIndex + 1) % frames.length
    renderNewFrame(pageName, frames, currentFrameIndex)
  })

  // add event listener to the div#images to change image when arrow-right is pressed
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentFrameIndex = (currentFrameIndex + 1) % frames.length
      renderNewFrame(pageName, frames, currentFrameIndex)
    } else if (event.key === 'ArrowLeft') {
      currentFrameIndex = (currentFrameIndex - 1 + frames.length) % frames.length
      renderNewFrame(pageName, frames, currentFrameIndex)
    }
  })
}

export const selectGallery = {
  select: (pageName) => {
    initializeGallery(pageName)
  }
}
