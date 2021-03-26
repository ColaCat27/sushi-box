window.addEventListener('DOMContentLoaded', () => {
    
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
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
