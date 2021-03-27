export default class Cart {
    constructor(cartSelector, cardButtonSelector, cardNameSelector, cardImgSelector, cardPriceSelector, cartButtonSelector, cartRemoveSelector, headerSelector, headerMenuSelector) {
      this.cart = [];
      this.product = {};
      this.cartElem = document.querySelector(cartSelector);
      this.cardButtons = document.querySelectorAll(cardButtonSelector);
      this.cardNameSelector = cardNameSelector;
      this.cardImgSelector = cardImgSelector;
      this.cardPriceSelector = cardPriceSelector;
      this.cartButton = document.querySelector(cartButtonSelector);
      this.cartRemoveSelector = cartRemoveSelector;
      this.header =  document.querySelector(headerSelector);
      this.headerMenu = document.querySelector(headerMenuSelector);
    }
    getProductInfo() {
      this.cardButtons.forEach((item, i) => {
      item.addEventListener('click', () => {
        //Получаем родителя нашей кликнутой кнопки
        const parent = item.parentElement.parentElement.parentElement;

        //Собираем инфу о выбранном продукте
        this.product.name = parent.querySelector(this.cardNameSelector).textContent;
        this.product.img = parent.querySelector(this.cardImgSelector).getAttribute('src');
        this.product.count = 5;
        this.product.weight = 120;
        this.product.id = i;
        this.product.price = Number(parent.querySelector(this.cardPriceSelector).textContent.replace(/₽/, ''));

        //Добавляем товар в корзину
        this.cart.push(this.product);

        this.addProduct();
        this.deleteProduct();
        this.changeSum();
      });
    });
  }

  showCart() {

    const menuHeight = this.headerMenu.clientHeight;
    const headerHeight = this.header.clientHeight;
    const cartSize = Number(window.getComputedStyle(this.cartElem).width.replace(/px/, ''));
    const cartButtonSize = Number(window.getComputedStyle(this.cartButton).width.replace(/px/, ''));
  
    window.addEventListener('scroll', () => {
      this.cartElem.classList.remove('cart_active');
    });
  
    this.cartButton.addEventListener('click', () => {
      if (this.header.classList.contains('header_active')) {
        this.cartElem.style.top = `${headerHeight + 15}px`;
      }
      if (this.headerMenu.classList.contains('header__menu_active')) {
        this.cartElem.style.top = `${menuHeight + 36}px`;
      }
      if (!this.header.classList.contains('header_active') && !this.headerMenu.classList.contains('header__menu_active')) {
          this.cartElem.style.top = `${headerHeight + 15}px`;
      }
      if (this.cart.length == 0) {
        this.cartElem.textContent = 'Вы ещё ничего не добавили в корзину';
      }
      let coord = this.cartButton.getBoundingClientRect();
      this.cartElem.classList.toggle('cart_active');
      this.cartElem.style.left = `${coord.left - (cartSize - cartButtonSize)}px`;
    });
  }
  

  addProduct() {
    this.cartElem.innerHTML = '';
    if (this.cart.length == 0) {
      this.cartElem.textContent = 'Вы ещё ничего не добавили в корзину';
    }
    for (let item of this.cart) {
         const elem = `<div class="cart__item">
          <div class="cart__row">
              <div class="cart__col">
                  <div class="cart__img">
                      <img src="${item.img}" alt="item-1">
                  </div>
              </div>
              <div class="cart__col">
                  <div class="cart__details">
                      <div class="cart__name">
                          ${item.name}
                      </div>
                      <div class="cart__counts">
                          <span class="cart__count">${item.count}шт</span>
                          <span class="cart__weight">(${item.weight}г)</span>
                      </div>
                      <div class="cart__buttons">
                          <button class="cart__button cart__button-remove">
                              <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.60254 2.42627H10.5337C11.0605 2.42627 11.5176 1.96924 11.5176 1.42334C11.5176 0.877441 11.0605 0.42041 10.5337 0.42041H1.60254C1.10107 0.42041 0.618652 0.877441 0.618652 1.42334C0.618652 1.96924 1.10107 2.42627 1.60254 2.42627Z" fill="#1A1A1A"/>
                              </svg>
                          </button>
                          <div class="cart__buttons-count">1</div>
                          <button class="cart__button cart__button-add">
                              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.5 11.9331C6.0459 11.9331 6.50293 11.457 6.50293 10.9492V7.42627H9.9624C10.4893 7.42627 10.9463 6.96924 10.9463 6.42334C10.9463 5.87744 10.4893 5.42041 9.9624 5.42041H6.50293V1.89746C6.50293 1.37061 6.0459 0.919922 5.5 0.919922C4.9541 0.919922 4.49707 1.37061 4.49707 1.89746V5.42041H1.03125C0.529785 5.42041 0.0473633 5.87744 0.0473633 6.42334C0.0473633 6.96924 0.529785 7.42627 1.03125 7.42627H4.49707V10.9492C4.49707 11.457 4.9541 11.9331 5.5 11.9331Z" fill="#1A1A1A"/>
                              </svg>
                          </button>
                      </div>
                      
                  </div>
              </div>
              <div class="cart__col">
                  <button class="cart__remove">
                      <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4824 14.458L11.9541 4.51855H12.7744C13.0547 4.51855 13.2803 4.2793 13.2803 3.99902C13.2803 3.71875 13.0547 3.48633 12.7744 3.48633H9.65039V2.46094C9.65039 1.47656 8.9873 0.847656 7.93457 0.847656H5.37793C4.3252 0.847656 3.66895 1.47656 3.66895 2.46094V3.48633H0.551758C0.27832 3.48633 0.0458984 3.72559 0.0458984 3.99902C0.0458984 4.2793 0.27832 4.51855 0.551758 4.51855H1.37891L1.85059 14.4648C1.89844 15.4424 2.54102 16.0713 3.53223 16.0713H9.80078C10.7783 16.0713 11.4346 15.4355 11.4824 14.458ZM4.7627 2.5293C4.7627 2.13965 5.04297 1.86621 5.45996 1.86621H7.85938C8.27637 1.86621 8.56348 2.13965 8.56348 2.5293V3.48633H4.7627V2.5293ZM3.62793 15.0391C3.23828 15.0391 2.94434 14.7451 2.92383 14.3418L2.44531 4.51855H10.8604L10.4092 14.3418C10.3887 14.752 10.1016 15.0391 9.69141 15.0391H3.62793ZM8.69336 13.8428C8.91895 13.8428 9.08301 13.6582 9.08984 13.3984L9.29492 6.22754C9.30176 5.97461 9.13086 5.7832 8.89844 5.7832C8.68652 5.7832 8.50879 5.98145 8.50195 6.22754L8.29688 13.3916C8.29004 13.6445 8.46094 13.8428 8.69336 13.8428ZM4.63965 13.8428C4.87207 13.8428 5.04297 13.6445 5.03613 13.3916L4.82422 6.22754C4.81738 5.98145 4.63965 5.7832 4.42773 5.7832C4.19531 5.7832 4.02441 5.97461 4.03125 6.22754L4.23633 13.3984C4.24316 13.6582 4.40723 13.8428 4.63965 13.8428ZM6.66309 13.8428C6.88867 13.8428 7.08008 13.6445 7.08008 13.3984V6.22754C7.08008 5.98145 6.88867 5.7832 6.66309 5.7832C6.44434 5.7832 6.25293 5.98145 6.25293 6.22754V13.3984C6.25293 13.6445 6.44434 13.8428 6.66309 13.8428Z" fill="#A3A3A3"/>
                      </svg>
                  </button>
                  <div class="cart__price">${item.price} ₽</div>
              </div>
          </div>
      </div>`;
      this.cartElem.insertAdjacentHTML('afterBegin', elem);
    }
  }
  changeSum() {
    let sum = 0;
    this.cart.forEach(item => {
      sum += item.price;
    })
    if (sum > 0) {
      this.cartButton.style.fontWeight = '700';
      this.cartButton.innerHTML = `${sum} ₽`;
    } else {
      this.cartButton.style.fontWeight = '400';
      this.cartButton.innerHTML = `Корзина`;
    }
  }

  deleteProduct() {
    const cartRemoveButtons = document.querySelectorAll(this.cartRemoveSelector);
    cartRemoveButtons.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.cart.splice(i, 1);
        this.addProduct();
        this.deleteProduct();
        this.changeSum();
      });
    });
  }
  init() {
    this.getProductInfo();
    this.showCart();
  }
}
