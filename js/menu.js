// js/menu-burger.js

document.addEventListener('DOMContentLoaded', () => {

  const toggleBtn = document.querySelector('.menu-toggle'); // botão <button>

  const nav = document.querySelector('nav#menu') || document.querySelector('nav');

  const closeBtn = document.querySelector('.close-menu');



  if (!toggleBtn || !nav) return; // segurança



  // overlay: usa a existente no HTML ou cria dinamicamente

  let overlay = document.querySelector('.nav-overlay');

  if (!overlay) {

    overlay = document.createElement('div');

    overlay.className = 'nav-overlay';

    overlay.setAttribute('aria-hidden', 'true');

    document.body.appendChild(overlay);

  }



  const DESKTOP_BREAKPOINT = 900;



  // utilitário: retorna elementos focáveis dentro do nav

  function getFocusableInside() {

    return Array.from(nav.querySelectorAll('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'))

      .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);

  }



  function openMenu() {

    nav.classList.add('active');

    toggleBtn.classList.add('active');

    toggleBtn.setAttribute('aria-expanded', 'true');

    overlay.classList.add('visible');

    overlay.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden'; // trava scroll do body



    // foco no primeiro elemento focável dentro do menu

    const focusable = getFocusableInside();

    if (focusable.length) focusable[0].focus();

  }



  function closeMenu() {

    nav.classList.remove('active');

    toggleBtn.classList.remove('active');

    toggleBtn.setAttribute('aria-expanded', 'false');

    overlay.classList.remove('visible');

    overlay.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    toggleBtn.focus(); // devolve foco ao botão

  }



  function toggleMenu() {

    if (nav.classList.contains('active')) closeMenu();

    else openMenu();

  }



  // clique no botão hambúrguer

  toggleBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    toggleMenu();

  });



  // clique no botão X dentro do menu (se existir)

  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); });



  // clique no overlay fecha

  overlay.addEventListener('click', closeMenu);



  // fecha ao clicar em qualquer link do menu (útil em mobile)

  nav.querySelectorAll('a[href]').forEach(a => {

    a.addEventListener('click', () => setTimeout(closeMenu, 100));

  });



  // clique fora do menu fecha (fallback)

  document.addEventListener('click', (event) => {

    const clickedInsideNav = nav.contains(event.target);

    const clickedToggle = toggleBtn.contains(event.target);

    const clickedOverlay = overlay.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && !clickedOverlay && nav.classList.contains('active')) {

      closeMenu();

    }

  });



  // fecha com Esc e implementa foco-trap (Tab / Shift+Tab)

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && nav.classList.contains('active')) {

      closeMenu();

      return;

    }



    if (e.key === 'Tab' && nav.classList.contains('active')) {

      const focusable = getFocusableInside();

      if (focusable.length === 0) {

        // sem elementos, evita que o Tab escape para o documento

        e.preventDefault();

        return;

      }

      const first = focusable[0];

      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {

        // Shift + Tab

        if (document.activeElement === first) {

          e.preventDefault();

          last.focus();

        }

      } else {

        // Tab

        if (document.activeElement === last) {

          e.preventDefault();

          first.focus();

        }

      }

    }

  });



  // fecha ao redimensionar para desktop

  window.addEventListener('resize', () => {

    if (window.innerWidth > DESKTOP_BREAKPOINT && nav.classList.contains('active')) {

      closeMenu();

    }

  });

});