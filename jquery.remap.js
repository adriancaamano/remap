;(function($) {
  $.fn.reMap = function() {
    var $w = $(window),
        item = this;

    function recalculate() {
      item.each(function() {
        var map = $(this);
        var image = $('img[usemap="#' + map.attr('name') + '"]');
        var image_base64 = new Image();
        var ratio_w, ratio_h;

        image_base64.src = image.attr('src');

        image_base64.onload = function() {
          ratio_w = image.width() / image_base64.width;
          ratio_h = image.height() / image_base64.height;

          map.find('area').each(function() {
            var coords = [];
            var old_coords = $(this).data('coords');

            if (typeof old_coords == 'undefined') {
              old_coords = $(this).attr('coords');
              $(this).data('coords', old_coords);
            }

            $.each(old_coords.split(','), function() {
              if(coords.length % 2 === 0) {
                coords.push( this * ratio_w );
              } else {
                coords.push( this * ratio_h );
              }
            });
            $(this).attr('coords', coords.join());
          });
        };
      });
    }

    $w.on('load resize', recalculate);
  };
})(window.jQuery || window.Zepto);
