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

    // const popup = () => {
    //   const modal = document.querySelector('.popup'),
    //   close = document.querySelector('.popup__close'),
    //   card = document.querySelector('.card');

    //   card.addEventListener('click', () => {
    //     modal.classList.add('popup_active');
    //     document.body.overflow = "hidden";
    //   })

    //   close.addEventListener('click', () => {
    //     modal.classList.remove('popup_active');
    //     document.body.overflow = "";
    //   });
    // }
    // popup();
});
