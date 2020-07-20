import Carousel from './carouselModule/carousel/carousel.js';

// Initialize carousel & options
const createCarousel = new Carousel('.carousel', {
  nav: true,
  auto: true,
  coupon: {
    percent: 20,
    position: 'top'
  }
});

// Example usage
const carousel = document.querySelector('.carousel');
const couponArr = [...document.querySelectorAll('.coupon *')];
console.log({couponArr})

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