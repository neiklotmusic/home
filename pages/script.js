// get pageName (e.g. "Arad") and look for filepath "data/arad.json"
const pageName = document.querySelector('h1').innerText.toLowerCase()
const path = `../data/${pageName}.json`

// build image path from pageName and imageFilename (e.g. "arad" -> "../assets/arad/image.jpg")
const buildImagePath = (imageFilename) => (`../assets/${pageName}/${imageFilename}`)

const imagesContainer = document.querySelector('#images')
const imageContainer = imagesContainer.querySelector('img')
const subtitleContainer = imagesContainer.querySelector('.subtitle')

const renderFrame = (frame) => {
  const imagePath = buildImagePath(frame.image)
  imageContainer.src = imagePath
  subtitleContainer.innerText = frame.subtitle
}

const renderNewFrame = (frames, newFrameIndex) => {
  const newFrame = frames[newFrameIndex]
  renderFrame(newFrame)
}

// fetch frames from json file
const loadFrames = async () => {
  try {
    const response = await fetch(path)
    const pageData = await response.json()
    return pageData.frames
  } catch (error) {
    console.error('Error loading frames:', error)
    return []
  }
};

const initializeGallery = async () => {
  const frames = await loadFrames()

  if (frames.length === 0) {
    console.error('No frames loaded')
    return
  }

  // render first frame
  let currentFrameIndex = 0
  renderNewFrame(frames, currentFrameIndex)

  // add event listener to the div#images to render the next image when clicked
  imagesContainer.addEventListener('click', () => {
    currentFrameIndex = (currentFrameIndex + 1) % frames.length
    renderNewFrame(frames, currentFrameIndex)
  })

  // add event listener to the div#images to change image when arrow-right is pressed
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentFrameIndex = (currentFrameIndex + 1) % frames.length
      renderNewFrame(frames, currentFrameIndex)
    } else if (event.key === 'ArrowLeft') {
      currentFrameIndex = (currentFrameIndex - 1 + frames.length) % frames.length
      renderNewFrame(frames, currentFrameIndex)
    }
  })
}

initializeGallery()
