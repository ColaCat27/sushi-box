window.addEventListener('DOMContentLoaded', () => {
    
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        autoplay: true,
        pagination: {
          el: '.slider__dotts',
          clickable: true,
        }
      });

      // Фиксируем хедер
      function fixedHeader() {
        const menu = document.querySelector('.header__menu'),
              link = document.querySelector('.header__link'),
              header = document.querySelector('.header'),
              filter = document.querySelector('.header__filter');

        let lastPos = 0;

        window.addEventListener('scroll', () => {
          if (pageYOffset < lastPos && pageYOffset < 200) {
            if (pageYOffset < 800) {
              filter.classList.remove('header__filter_active');
            }
            menu.classList.remove('header__menu_active');
            link.classList.remove('header__link_active');
            header.classList.remove('header_active');
          } else if (pageYOffset > lastPos && pageYOffset > 200) {
            if (pageYOffset > 800) {
              filter.classList.add('header__filter_active');
            }
            menu.classList.add('header__menu_active');
            if (header.classList.contains('header_active')) {
              header.classList.remove('header_active');
            }
          } else if (pageYOffset < lastPos) {
            menu.classList.remove('header__menu_active');
            header.classList.add('header_active');
          }
          lastPos = pageYOffset;
        })
      }
      fixedHeader();

      // Фиксируем фильтр
      function fixedFilter() {
        const btn = document.querySelector('.header__filter'),
              filter = document.querySelector('.filter'),
              menu = document.querySelector('.header__menu'),
              header = document.querySelector('.header'),
              slider = document.querySelector('.slider');
    
       
        let headerHeight = header.clientHeight;
        let menuHeight = menu.clientHeight;
        let filterHeight = filter.clientHeight;
        
        window.addEventListener('scroll', () => {
            filter.classList.remove('filter_active');
            document.querySelectorAll('.filter__divider').forEach(item => {
              item.remove();
            })
        });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (header.classList.contains('header_active')) {
              if (!filter.classList.contains('filter_active')) {
                filterAdd(headerHeight, 5);
              } else {
                filterRemove();
              }

            }
            if (menu.classList.contains('header__menu_active')) {
              if (!filter.classList.contains('filter_active')) {
                filterAdd(menuHeight, -12);
              } else {
                filterRemove();
              }
            }
        });

        function filterAdd(elemHeight,addPx) {
          filter.classList.add('filter_active');
          filter.style.top = `${elemHeight - addPx}px`;

          const div = document.createElement('div');
          div.style.height = filterHeight + 'px';
          div.classList.add('filter__divider');
          slider.insertAdjacentElement('afterend', div);
        }

        function filterRemove() {
          filter.classList.remove('filter_active');
          filter.style.top = `${0}px`;

          document.querySelectorAll('.filter__divider').forEach(item => {
            item.remove();
          })
        }
      }

      fixedFilter();

      //Показ корзины

      function cart() {
        const cartBtn = document.querySelector('.header__cart'),
              modal = document.querySelector('.cart'),
              menu = document.querySelector('.header__menu'),
              header = document.querySelector('.header');
        
        const menuHeight = menu.clientHeight;
        const headerHeight = header.clientHeight;
        const cartSize = Number(window.getComputedStyle(modal).width.replace(/px/, ''));
        const cartButtonSize = Number(window.getComputedStyle(cartBtn).width.replace(/px/, ''));

        window.addEventListener('scroll', () => {
          modal.classList.remove('cart_active');
        });

        cartBtn.addEventListener('click', () => {
          if (header.classList.contains('header_active')) {
            modal.style.top = `${headerHeight + 15}px`;
          }
          if (menu.classList.contains('header__menu_active')) {
            modal.style.top = `${menuHeight + 36}px`;
          }
          if (!header.classList.contains('header_active') && !menu.classList.contains('header__menu_active')) {
              modal.style.top = `${headerHeight + 15}px`;
          }
          let coord = cartBtn.getBoundingClientRect();
          modal.classList.toggle('cart_active');
          modal.style.left = `${coord.left - (cartSize - cartButtonSize)}px`;
        });
      }
      cart();

      // Добавление товара в корзину

  class Cart {
    constructor(cartSelector, cardButtonSelector, cardNameSelector, cardImgSelector, cardPriceSelector, cartButtonSelector) {
      this.cart = [];
      this.product = {};
      this.cartSelector = cartSelector;
      this.cardButtonSelector = cardButtonSelector;
      this.cardNameSelector = cardNameSelector;
      this.cardImgSelector = cardImgSelector;
      this.cardPriceSelector = cardPriceSelector;
      this.cartButtonSelector = cartButtonSelector;
    }

    addProduct() {
      const buttons = document.querySelectorAll(this.cardButtonSelector);
      const cartWrapp = document.querySelector(this.cartSelector);

      buttons.forEach((item, i) => {
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

        cartWrapp.innerHTML = '';
        this.cart.forEach(item => {
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
            cartWrapp.insertAdjacentHTML('afterBegin', elem);
        });
      });
    });
  }
}

const elem = new Cart('.cart', '.card__button', '.card__name', '.card__img img', '.card__price', '.header__cart');
elem.addProduct();
elem.showProduct();


    //Тестовый ховер скрипт для карточек, пока что не определился как лучше выполнить этот эффект.
    // function cardHover() {
    //   const cards = document.querySelectorAll('.card__wrapper'),
    //         wrapp = document.querySelectorAll('.card__inner-wrapper'),
    //         weight = document.querySelectorAll('.card__weight'),
    //         counts = document.querySelectorAll('.card__counts'),
    //         button = document.querySelectorAll('.card__button');

    //         cards.forEach((item, i) => {
    //           item.addEventListener('mouseenter', () => {
    //             wrapp[i].classList.add('card__inner-wrapper_active');
    //             const arr = [weight[i], counts[i], button[i]];
    //             toggleHiddenClass(arr, true);
    //             opacityToggle(arr, true)
    //           });
    //         });

    //         cards.forEach((item, i) => {
    //           item.addEventListener('mouseleave', () => {
    //             wrapp[i].classList.remove('card__inner-wrapper_active');
    //             const arr = [weight[i], counts[i], button[i]];
    //             toggleHiddenClass(arr, false);
    //             opacityToggle(arr, false)
    //           })
    //         })

    //         function toggleHiddenClass(elems, off) {
    //           if(off) {
    //             elems.forEach(item => {
    //               item.classList.remove('hidden');
    //             });
    //           } else {
    //             elems.forEach(item => {
    //               item.classList.add('hidden');
    //             });
    //           }

    //         }

    //         function opacityToggle(array, off) {
    //           if(off) {
    //             array.forEach(item => {
    //               setTimeout(() => {
    //                 item.style.opacity = '1';
    //               }, 20)
    //             });
    //           } else {
    //             array.forEach(item => {
    //               setTimeout(() => {
    //                 item.style.opacity = '0';
    //               }, 20)
    //             });
    //           }
    //         };
    // }
    // cardHover();
});
