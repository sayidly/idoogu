document.addEventListener('DOMContentLoaded', function() {
  /**
   * Popup links
   */
  var popups = document.querySelectorAll('.popup');

  for (var i = 0; i < popups.length; i++) {
    popups[i].addEventListener('click', function(event) {
      event.preventDefault()
      var url = this.getAttribute('href');
      this.removeAttribute('target');
      window.open(url, 'newwindow', 'width=500,height=360');
      return false;
    });
  }

  /**
   * Triggers
   */
  var triggers = document.querySelectorAll('.trigger');
  var triggerTimes = 0

  function showOverlay(overlay) {
    overlay.classList.add('active');
    document.body.classList.add('with-overlay');
    trackViewPage(overlay);
    return false;
  }

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function(event) {
      if (event.target.classList.contains('trigger-once')) {
        if (triggerTimes > 0) {
          return
        }
        triggerTimes = triggerTimes + 1
      }
      var target = document.getElementById(this.getAttribute('rel'));
      return showOverlay(target);
    });
  }

  /**
   * Overlays
   */

  // Closing elements
  var overlays = document.querySelectorAll('.overlay');

  for (var i = 0; i < overlays.length; i++) {
    overlays[i].addEventListener('click', function(event) {
      if ((event.target.classList.contains('close')) || (event.target.parentNode.classList.contains('close'))) {
        this.classList.remove('active');
        document.body.classList.remove('with-overlay');
      }
    });
  }

  // Close overlays & dialogs with escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      var overlays = document.querySelectorAll('.overlay');

      for (var i = 0; i < overlays.length; i++) {
        overlays[i].classList.remove('active');
      }

      document.body.classList.remove('with-overlay');
    }
  };
});
