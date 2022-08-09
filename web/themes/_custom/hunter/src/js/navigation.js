(function($, Drupal) {
  Drupal.behaviors.navigation = {
    attach: function(context, settings) {
      // Header
      let $header = $('header');

      const $html = $('html', context);
      const $body = $('body', context);

      // Mobile menu toggle variables
      const $mobile_menu_toggle = $('#js-nav-toggle', context);

      // Mega menu toggle variables
      let $primary_menu = $('.region-primary-menu .menu--main', context);

      function focusTrap(element) {
        let $tabbable = element.find('button, a').filter(':visible');
        let $first_tabbable = $tabbable.first();
        let $last_tabbable = $tabbable.last();

        // Set focus on first input
        $first_tabbable.focus();

        // Redirect last tab to first input
        $last_tabbable.on('keydown', function(e) {
          if ((e.which === 9 && !e.shiftKey)) {
            e.preventDefault();
            $first_tabbable.focus();
          }
        });

        // Redirect first shift+tab to last input
        $first_tabbable.on('keydown', function(e) {
          if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            $last_tabbable.focus();
          }
        });
      }

      // Mobile Nav toggle
      $mobile_menu_toggle.once('navigation-mobile').on('click', function() {
        // Menu toggle logic
        $(this).toggleClass('nav-open');
        if ($(this).hasClass('nav-open')) {
          setTimeout(function() {
            focusTrap($header);
          }, 350);
        }
        $html.toggleClass('no-scroll');
        $body.toggleClass('no-scroll');
        $header.toggleClass('header-fixed');
        $('.dropdown-open').addClass('dropdown-close');

        // Close any open sub menus after nav drawer is closed
        $primary_menu.slideToggle(300, function() {
          if (!$(this).hasClass('nav-open')) {
            $('.dropdown-close').removeClass('dropdown-open');
          }
        });
      });
    }
  };
})(jQuery, Drupal);
