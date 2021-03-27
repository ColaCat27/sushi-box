import Cart from '../js/modules/cart.js';
import Card from '../js/modules/card.js';
import data from '../js/modules/data.js';

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
          } else if (pageYOffset > lastPos && pageYOffset > 30) {
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

      // Добавление товара в корзину


const card = new Card(data, '.showcase__wrapper_classic', '.showcase__wrapper_branded');
card.init();

const cart = new Cart('.cart', '.card__button', '.card__name', '.card__img img', '.card__price', '.header__cart', '.cart__remove', '.header', '.header__menu', '.card__buttons');
cart.init();


});
