(function($, Drupal) {
  Drupal.behaviors.carousels = {
    attach: function(context, settings) {
      const slickSettings = {
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: false,
        mobileFirst: true,
        variableHeight: true,
        infinite: true
      };

      const sliderElements = '.field--name-field-project-images';
      $(context).find(sliderElements).once('carousels').each(function(index) {
        let $thisSlider = $(this);
        $thisSlider.slick(slickSettings);

        $(this).append('<div class="button-wrapper" id="button-wrapper-' + index + '"></div>');
        let $slick_buttons = $(this).find('.slick-arrow, .slick-dots');
        $('#button-wrapper-' + index).append($slick_buttons);

        let $dots = $(this).find('.slick-dots li').length;
        $(this).find('.slick-dots').first().attr('id', 'slick-dots-' + index);
        $('#button-wrapper-' + index).append('<div class="counter"><span id="dots-' + index + '">1</span> of ' + $dots + '</div>');

        $(this).find('.slick-arrow').on('click', function() {
          let $li_index = $('#slick-dots-' + index).find('.slick-active').index();
          $('#dots-' + index).text($li_index + 1);
        });
      });
    }
  };
})(jQuery, Drupal);
