/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

function createCarousel(slidesCount = 5) {
  let outSlides = '';
  let slideItems = '<li class="slides__item active"><a href="#"></a></li>';
  let styleItems = '';
  let indicatorItemOut = '<span class="indicators__item active" data-slide-to="0"></span>';



for (let i = 1; i <= slidesCount; i++) {
  slideItems += '<li class="slides__item"><a href="#"></a></li>';
  indicatorItemOut += `<span class="indicators__item" data-slide-to="${i}"></span>`;
}

for (let i = 1; i <= slidesCount; i++) {
  styleItems += `.slides__item:nth-child(${i}) { background-image: url('img/_${Math.round(1 + Math.random() * 5)}.jpg'); } `;
}

outSlides += `<ul class="slides">${slideItems}</ul><div class="indicators">${indicatorItemOut}</div>`;

document.getElementById('carousel').innerHTML = outSlides + document.getElementById('carousel').innerHTML;
document.querySelector('style').innerHTML = styleItems;

}

createCarousel(5);

let slides = document.querySelectorAll('.slides__item');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let isPlaying = true;

let pauseButton = document.querySelector('.controls__pause');
let pauseIcon = document.querySelector('#pause');
let nextButton = document.querySelector('#next');
let previousButton = document.querySelector('#previous');
let controls = document.querySelector('.controls');

let indicatorsItems = document.querySelectorAll('.indicators__item');
let indicators = document.querySelector('.indicators');
let carousel = document.querySelector('.carousel');

function goToSlide(n) {
  slides[currentSlide].classList.toggle('active');
  indicatorsItems[currentSlide].classList.toggle('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicatorsItems[currentSlide].classList.toggle('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function pauseSlideShow() {
  pauseIcon.className = 'fas fa-play';
  isPlaying = false;
  clearInterval(slideInterval);
}

function playSlideShow() {
  pauseIcon.className = 'fas fa-pause';
  isPlaying = true;
  slideInterval = setInterval(nextSlide, 2000);
}

function indicatorsSlide(event) {
  let target = event.target;

  if (target.classList.contains('indicators__item')) {
    pauseSlideShow();
    goToSlide(+target.getAttribute('data-slide-to'));
  }
}

indicators.addEventListener('click', indicatorsSlide);

function toPauseIfPlay() {
  if (isPlaying) pauseSlideShow();
  else playSlideShow();
}

pauseButton.addEventListener('click', toPauseIfPlay);

function toNextSlide() {
  pauseSlideShow();
  nextSlide();
}

nextButton.addEventListener('click', toNextSlide);

function toPreviousSlide() {
  pauseSlideShow();
  previousSlide();
}

previousButton.addEventListener('click', toPreviousSlide);
