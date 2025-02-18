

document.addEventListener('DOMContentLoaded', function () {

    const Home = document.getElementById('hero')
    const About = document.getElementById('about')
    const Resume = document.getElementById('resume')
    const Portfolio = document.getElementById('portfolio')
    const Participation = document.getElementById('participation')
    const Contact = document.getElementById('contact')
    const sections = [Home, About, Resume, Portfolio, Participation, Contact]
    let currentSection = ''

    const dropdownMenu = document.getElementById('dropdown-menu')
    const DROPlinks = document.querySelectorAll('#dropdown-menu a')
    const NAVlinks = document.querySelectorAll('nav a')

    const form = document.querySelector('form')



    const observerOptions = {
        root: null,
        threshold: 0.2
    }
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection = entry.target.id
                console.log(`Currently viewing: ${currentSection}`)
                UpdateNavigation(currentSection)
            }
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section)
    })

    const UpdateNavigation = (activeSectionId) => {
        NAVlinks.forEach(link => {
            const span = link.querySelector('span')
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('text-sky-500')
                if (span) {
                    span.classList.add('text-white')
                }
            } else {
                link.classList.remove('text-sky-500')
                if (span) {
                    span.classList.remove('text-white')
                }
            }
        })
    }


    NAVlinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault()

            dropdownMenu.classList.add('hidden');

            const targetId = link.getAttribute('href').substring(1)
            const targetSection = document.getElementById(targetId)
            targetSection.scrollIntoView({ behavior: 'smooth' })
        })
    })

    DROPlinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault()

            dropdownMenu.classList.add('hidden');

            const targetId = link.getAttribute('href').substring(1)
            const targetSection = document.getElementById(targetId)
            targetSection.scrollIntoView({ behavior: 'smooth' })
        })
    })


    new Typed('.typed', {
        strings: ['Graphic Designer.', 'Full Stack Developer.', 'Data Science Student.', 'Blockchain Enthusiast.'],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    })
    var swiper = new Swiper(".mySwiper", {
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        autoplay: {
            delay: 1500,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    })

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const formData = new FormData(this)
        const BTN = document.getElementById('SubmitBtn')
        const loading = document.querySelector('.loading')
        BTN.classList.add('hidden')
        loading.classList.toggle('hidden')


        sendEmail(formData)
    });

    function sendEmail(formData) {
        fetch('https://nagesh-portfolio-website.vercel.app/contact', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent successfully:', data)
                const sentMessage = document.querySelector('.sent-message')
                const loading = document.querySelector('.loading')
                loading.classList.toggle('hidden')
                sentMessage.classList.toggle('hidden')
            })
            .catch(error => {
                console.error('Error sending email:', error)
                alert(`An error occurred: ${error.message}`)
            })
    }

})

const menuToggle = document.getElementById('menu-toggle')
const dropdownMenu = document.getElementById('dropdown-menu')

menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden')

})

async function generateSlider() {

}
