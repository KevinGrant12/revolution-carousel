export default class Coupon {
  constructor(options) {
    this.percent = options.percent;
    this.position = options.position;
    this.message = options.message;

    const coupon = document.createElement('a');
          coupon.classList.add('coupon');
    const couponBg = document.createElement('div');
          couponBg.classList.add('coupon-bg');
    const couponTop = document.createElement('div');
          couponTop.classList.add('coupon-top');
          couponTop.innerHTML = this.percent + '% off'
    const couponBottom = document.createElement('div');
          couponBottom.classList.add('coupon-bottom');
          couponBottom.innerHTML = this.message;
    
    coupon.appendChild(couponBg);
    coupon.appendChild(couponTop);
    coupon.appendChild(couponBottom);
    return coupon
  }
}