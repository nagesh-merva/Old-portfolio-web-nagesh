import { animate } from 'https://cdn.jsdelivr.net/npm/@motionone/dom/+esm'

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
    }
    const Header = document.querySelector('header')
    let previousWindowWidth = window.innerWidth
    animate(Header,
        { opacity: [0, 1], transform: ['translateX(-300px)', 'translateX(0px)'] },
        { duration: 0.9, easing: 'ease-in-out' }
    )
    const checkWindowSize = () => {
        const currentWindowWidth = window.innerWidth
        if (currentWindowWidth < 1150 && previousWindowWidth >= 1150) {
            animate(Header,
                { opacity: [0, 1], transform: ['translateX(0px)', 'translateX(-300px)'] },
                { duration: 0.4, easing: 'ease-in-out' }
            )
            Header.classList.add('hidden')
        } else if (currentWindowWidth >= 1150 && previousWindowWidth < 1150) {
            Header.classList.remove('hidden')
            animate(Header,
                { opacity: [0, 1], transform: ['translateX(-300px)', 'translateX(0px)'] },
                { duration: 0.9, easing: 'ease-in-out' }
            )
        }
        previousWindowWidth = currentWindowWidth
    }

    const observerCallback = (entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.classList.contains('subtle')) {
                    animate(element,
                        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
                        { duration: 0.4, easing: 'ease-in-out' }
                    ).finished.then(() => {
                        observer.unobserve(element)
                    })
                }

                if (element.classList.contains('subtleDiv')) {
                    const components = element.querySelectorAll('.component')
                    const sliders = element.querySelectorAll(".Pslider")
                    components.forEach(component => {
                        component.style.opacity = '0'
                    })
                    sliders.forEach(slider => {
                        slider.style.opacity = '0'
                    })
                    animate(element,
                        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
                        { duration: 0.7, easing: 'ease-in-out' }
                    ).finished.then(() => {
                        components.forEach((component, index) => {
                            animate(component,
                                { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
                                { duration: 0.9, easing: 'ease-in-out', delay: index * 0.3 }
                            ).finished.then(() => {
                                component.style.opacity = '1'
                                component.classList.add('animated')
                            })
                        })
                        sliders.forEach((slider, index) => {
                            animate(slider, { width: ['0', slider.dataset.width] }, { duration: 0.9, easing: 'ease-in-out', delay: index * 0.3 }).finished.then(() => {
                                slider.style.opacity = '1'
                                slider.classList.add('animated')
                            })
                        })
                        observer.unobserve(element)
                    })
                }
            }
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const elementsToObserve = document.querySelectorAll('.subtle, .subtleDiv')
    elementsToObserve.forEach(element => observer.observe(element))
    window.addEventListener('resize', checkWindowSize)
})
