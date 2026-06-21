export function initAccordions() {
  const isDesktop = window.innerWidth >= 768

  document.querySelectorAll('.accordion').forEach((accordion) => {
    const header = accordion.querySelector('.accordion-header')
    const content = accordion.querySelector('.content')
    const arrow = accordion.querySelector('.arrow')

    if (!header || !content) return

    if (isDesktop) {
      content.classList.remove('hidden')
      content.classList.add('block')
      if (arrow) arrow.style.transform = 'rotate(0deg)'
    } else {
      content.classList.add('hidden')
      content.classList.remove('block')
      if (arrow) arrow.style.transform = 'rotate(0deg)'
    }

    if (!header.dataset.accordionBound) {
      header.dataset.accordionBound = 'true'
      header.addEventListener('click', () => {
        if (window.innerWidth >= 768) return
        const isHidden = content.classList.contains('hidden')
        if (isHidden) {
          content.classList.remove('hidden')
          content.classList.add('block')
          if (arrow) arrow.style.transform = 'rotate(-90deg)'
        } else {
          content.classList.add('hidden')
          content.classList.remove('block')
          if (arrow) arrow.style.transform = 'rotate(0deg)'
        }
      })
    }
  })
}

export function setupAccordionResize() {
  let wasDesktop = window.innerWidth >= 768

  function handleResize() {
    const isDesktop = window.innerWidth >= 768
    if (isDesktop === wasDesktop) return
    wasDesktop = isDesktop
    initAccordions()
  }

  window.addEventListener('resize', handleResize)
}
