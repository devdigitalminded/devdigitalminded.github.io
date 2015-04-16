// Polyfills:
// - classList

(function (w) {
  var body = document.getElementsByTagName('body')[0];
  var modalButton = document.getElementById('modal-copyright-btn');
  var modal = document.getElementById('modal-copyright');
  var modalDialog = document.querySelector('.modal-dialog');
  var modalBackdrop = modal.querySelector('.modal-backdrop');
  var modalClose = modal.querySelectorAll('.js-modal-legal-close');

  function toggleLegalModal (e) {
    e && e.preventDefault();

    if (modal.classList.contains('in')) {
      // Remove 'modal-open' to restore body's scroll
      body.classList.remove('modal-open');
      // Manage the modal hiding
      modal.classList.remove('in');
      modalBackdrop.remove('in');

      setTimeout(function (argument) {
        modal.style.display = 'none';
        modalBackdrop.style.display = 'none';
      }, 500);

    } else {
      // Add class to kill the body's scroll
      body.classList.add('modal-open');
      // Manage the modal showing
      modal.style.display = 'block';
      modalBackdrop.style.display = 'block';
      modalBackdrop.style.height = parseFloat(modalDialog.offsetHeight + 60) + 'px';
      modal.classList.add('in');
      modalBackdrop.classList.add('in');
    }
  }

  // Toggle modal from footer button
  modalButton.addEventListener('click', toggleLegalModal, false);

  // Toggle the modal on click on the backdrop
  modalBackdrop.addEventListener('click', toggleLegalModal, false);

  // Toggle modal from modal's close buttons
  [].forEach.call(modalClose, function (el) {
    el.addEventListener('click', toggleLegalModal, false);
  });

})(window);
