import { scrollTo } from './portfolio.js';

document.getElementById("projects-anchor").addEventListener("click", function () {
    window.location.href = 'https://arod209.github.io/portfolio.html'
    scrollTo("projects-section");
})

document.getElementById("contact-anchor").addEventListener("click", function () {
    window.location.href = 'https://arod209.github.io/portfolio.html'
    scrollTo("contact-section");
})