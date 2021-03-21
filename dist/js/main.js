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

});