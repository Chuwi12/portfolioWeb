// Se inyecta en línea y bloquea el render: fija el tema antes del primer pintado. Su hash va a la CSP.
(function () {
  var t;
  try {
    t = localStorage.getItem('theme');
  } catch (e) {}
  if (t !== 'light' && t !== 'dark') {
    t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = t;
})();
