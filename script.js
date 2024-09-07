document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effect to skill boxes
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.style.backgroundColor = '#23a6d5';
            box.style.color = '#fff';
        });
        box.addEventListener('mouseout', () => {
            box.style.backgroundColor = '';
            box.style.color = '';
        });
    });

    // Add typewriter effect to main title
    const mainTitle = document.querySelector('.main-title');
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            mainTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();

    // Highlight active section in navigation
    const highlightActiveSection = () => {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100; // Adjust for header height
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Call once on load
});
