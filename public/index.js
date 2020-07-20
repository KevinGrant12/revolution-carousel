import Carousel from '../carouselModule/carousel.js';

// Initialize carousel & options
const createCarousel = new Carousel('.carousel', {
  nav: true,
  autoPlay: true,
  coupon: {
    percent: 20,
    message: 'first pirchase'
  }
});

// Do fun stuff like add animations
const carousel = document.querySelector('.carousel');
const couponArr = [...document.querySelectorAll('.coupon *')];

// Animate card and coupon
carousel.addEventListener('beforeSlideChange', () => {
  const card = document.querySelector('.active-slide .card');
  card.classList.remove('visible')
  rotateCoupon('remove')
});
carousel.addEventListener('afterSlideChange', () => {
  const card = document.querySelector('.active-slide .card');
  card.classList.add('visible')
  rotateCoupon()
});

const rotateCoupon = (action) => {
  action === 'remove' ?
  couponArr.forEach((elem) => elem.classList.remove('visible')) :
  couponArr.forEach(elem => {
    setTimeout(() => {
      elem.classList.add('visible')
    }, 100 * couponArr.indexOf(elem))
  });
};