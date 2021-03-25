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

      function fixedHeader() {
        const menu = document.querySelector('.header__menu'),
              link = document.querySelector('.header__link');

        let lastPos = 0;

        window.addEventListener('scroll', () => {
          if (pageYOffset > 300) {
            menu.classList.add('header__menu_active');
            link.classList.add('header__link_active');
          } else if (pageYOffset === 0) {
            menu.classList.remove('header__menu_acitve');
            link.classList.remove('header__link_active');
          }
        })
      }
      fixedHeader();

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
