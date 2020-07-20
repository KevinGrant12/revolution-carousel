import Coupon from './components/coupon/coupon.js';

export default class Carousel {

  constructor(carouselElement, options) {

    this.carouselElement = carouselElement;
    this.carousel = document.querySelector(carouselElement);
    this.options = options;
    this.slider = this.carousel.querySelector('.slider');
    this.slides = [...this.slider.children];
    this.arrows = [...this.carousel.getElementsByClassName('arrow')];
    this.nav = document.querySelector('.nav');
    this.navItems = [...this.carousel.getElementsByClassName('nav-item')];
    this.autoPlay = options.autoPlay;
    this.firstLoad = true;
    this.before = true;
    this.slideIndex = 1;
    this.events = {
      init: new CustomEvent('carouselInit'),
      beforeChange: new CustomEvent('beforeSlideChange'),
      afterChange: new CustomEvent('afterSlideChange')
    }

    // Intialize carousel
    if ( ! this.slider.classList.contains('carousel-initialized') ) {
      this.slider.classList.add('carousel-initialized')
      this.carousel.dispatchEvent(this.events.init)
      this.handleOptions();
      this.setArrows();
      this.updateCarousel(this.slideIndex);
    }
  }

  changeSlide(n) {
    this.updateCarousel(this.slideIndex += n);
  }

  currentSlide(n) {
    this.updateCarousel(this.slideIndex = n)
  }

  updateCarousel(n) {
    const handleMutationEvents = (mutations) => {
      if ( this.firstLoad === false ) {
        let activeSlideMutations = [...mutations.filter(mutation => mutation.attributeName === 'class' && mutation.target.matches('.active-slide'))];
          activeSlideMutations.forEach(mutation => {
            if ( activeSlideMutations.indexOf(mutation) === 0 && this.before === true ) {
              this.carousel.dispatchEvent(this.events.beforeChange)
              this.before = false;
            } else if ( activeSlideMutations.indexOf(mutation) === 1 && this.before === false ) {
              setTimeout(() => {
                this.carousel.dispatchEvent(this.events.afterChange)
              }, 100)
              this.before = true
            }
          });
        observer.disconnect()
      }
    }
    const targetNode = this.slider;
    const observerConfig = { attributes: true, childList: true, subtree: true }
    const observer = new MutationObserver(handleMutationEvents);
    observer.observe(targetNode, observerConfig);
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('active-slide');
    })
    this.navItems.forEach(item => {
      item.classList.remove('active');
    })
    this.slides[this.slideIndex - 1].style.display = 'block';
    this.slides[this.slideIndex - 1].classList.add('active-slide');
    this.navItems[this.slideIndex - 1].classList.add('active');
    this.firstLoad = false;

  } //end update carousel
  
  setArrows() {
    this.arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        clearInterval(this.slideInterval)
        this.autoPlayStart()
        return arrow.classList.contains('prev') ? this.changeSlide(-1) : this.changeSlide(1);
      });
    });
  }

  setNav() {
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const navIndex = this.navItems.indexOf(item) + 1;
        this.currentSlide(navIndex)
        clearInterval(this.slideInterval)
        this.autoPlayStart()
      });
    });
  }

  autoPlayStart() {
   this.slideInterval =  setInterval(() => {
      this.changeSlide(1)
    }, 4000)
  }

  handleOptions() {
    const options = this.options;
    const couponOptions = options.coupon;
    const navOption = options.nav;
    const carouselElem = document.querySelector(this.carouselElement);

    // Coupon option
    if (couponOptions) {
      const coupon = new Coupon(couponOptions);
      carouselElem.appendChild(coupon);
    }

    // Autoplay option
    if ( this.autoPlay === true ) {
      this.autoPlayStart();
    }

    if ( this.options.nav === true ) {
      this.setNav();
    }
  }
}