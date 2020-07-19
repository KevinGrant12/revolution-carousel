import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

export default class Carousel {

  constructor(carouselElement, options) {

    this.carousel = document.querySelector(carouselElement);
    this.options = options;
    this.slider = this.carousel.querySelector('.slider');
    this.slides = [...this.carousel.getElementsByClassName('slide')];
    this.arrows = [...this.carousel.getElementsByClassName('arrow')];
    this.navItems = [...this.carousel.getElementsByClassName('nav-item')];
    this.firstLoad = true;
    this.before = true;
    this.slideIndex = 1;
    this.events = {
      init: new CustomEvent('carouselInitEvent'),
      beforeChange: new CustomEvent('beforeSlideChange'),
      afterChange: new CustomEvent('afterSlideChange')
    }
    this.stats = {
      cardClicks: 0,
      couponeClicks: 0
    }

    this.carousel.addEventListener('beforeSlideChange', (e) => {
      console.log('before change')
    })

    // Intialize carousel
    if ( ! this.slider.classList.contains('carousel-initialized') ) {
      this.slider.classList.add('carousel-initialized')
      this.carousel.dispatchEvent(this.events.init)
      this.setArrows();
      this.setNav();
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
        return arrow.classList.contains('prev') ? this.changeSlide(-1) : this.changeSlide(1);
      });
    });
  }

  setNav() {
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const navIndex = this.navItems.indexOf(item) + 1;
        this.currentSlide(navIndex)
      });
    });
  } 
}