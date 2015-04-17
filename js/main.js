// Polyfills:
// - classList

(function (w) {

  /**
   * Smooth scrolling
   *
   */

  var navLinks = document.getElementsByClassName('navbar-link');

  function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  function elmYPosition(eID) {
    console.log('eID: ', eID);
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    } return y;
  }

  function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for ( var i=startY; i<stopY; i+=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
    return false;
  }

  // Attach the event on the link of the navbar
  [].forEach.call(navLinks, function (el) {
    el.addEventListener('click', function (ev) {
      ev.preventDefault();
      smoothScroll(ev.target.href.split('#')[1]);
    }, false);
  });

  /**
   * Offers slider
   *
   */
  // Offers
  var diagnoEl = document.getElementsByClassName('dm-offer-diagno');
  var stratEl = document.getElementsByClassName('dm-offer-strat');
  var transfoEl = document.getElementsByClassName('dm-offer-transfo');
  var mentorEl = document.getElementsByClassName('dm-offer-mentor');

  // Details
  var diagnoDetailEl = document.getElementsByClassName('offer-detail-diagno');
  var stratDetailEl = document.getElementsByClassName('offer-detail-strat');
  var transfoDetailEl = document.getElementsByClassName('offer-detail-transfo');
  var mentorDetailEl = document.getElementsByClassName('offer-detail-mentor');

  function switchArrow(el) {
    // Hide the current container...
    var currentArrowPosition = document.querySelector('.js-offer-btn.in');
    if (currentArrowPosition !== null) {
      currentArrowPosition.classList.remove('in');
    }
    el.classList.add('in');
  }

  function switchDetail(el) {
    // Hide the current container...
    var currentContainer = document.querySelector('.container.in');
    if (currentContainer !== null) {
      currentContainer.classList.remove('in');
    }
    // ... and show the diagnostic one
    el.classList.add('in');
  }

  diagnoEl[0].addEventListener('click', function (ev) {
    ev.preventDefault();

    switchDetail(diagnoDetailEl[0]);

    switchArrow(this);
  }, false);

  stratEl[0].addEventListener('click', function (ev) {
    ev.preventDefault();

    switchDetail(stratDetailEl[0]);

    switchArrow(this);
  }, false);

  transfoEl[0].addEventListener('click', function (ev) {
    ev.preventDefault();

    switchDetail(transfoDetailEl[0]);

    switchArrow(this);
  }, false);

  mentorEl[0].addEventListener('click', function (ev) {
    ev.preventDefault();

    switchDetail(mentorDetailEl[0]);

    switchArrow(this);
  }, false);

})(window);
