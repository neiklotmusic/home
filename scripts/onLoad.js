import { selectGallery } from './selectGallery.js'

export const onLoad = {
  init: () => {
    const galleryButtons = document.querySelectorAll('.gallery-button')

    galleryButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const pageName = event.target.innerText.toLowerCase()
        selectGallery.select(pageName)
      })
    })
  }
}
