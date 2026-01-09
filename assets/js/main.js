document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.header-utils-burger');
  const menu = document.querySelector('.header-menu');
  const menuClose = document.querySelector('.header-nav-close');

  if (!burger || !menu) return;

  burger.addEventListener('click', function () {
    menu.classList.toggle('is-open'); // class you want to add/remove
  });

  if(menuClose){
      menuClose.addEventListener('click', function () {
        menu.classList.toggle('is-open'); // class you want to add/remove
    });
   }
});
