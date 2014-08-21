(function ($) {

    $.fn.carousel = function (options) {
        var settings = $.extend({
            //Default settings
            infinity: true,
            showdots: false
        }, options);

        var slider = this.find('div.slide-selector'),
            items = slider.find('div.item'),
            len = items.length,
            current = 1,
            first = items.filter(':first'),
            last = items.filter(':last'),
            triggers = $('a.carousel-control');

        slider.css('left', '0');
        first.before(last.clone(true));
        last.after(first.clone(true));

        var itemsNew = slider.find('div.item');
        itemsNew.each(function (i) {
            if (i === 0) {
                $(itemsNew[i]).attr('data-slide', i).css('left', '-100%');
            }
            else {
                $(itemsNew[i]).attr('data-slide', i).css('left', ((i - 1) * 100).toString() + '%');
            }
        });

        triggers.on('click', function () {
            if (slider.is(':not(:animated)')) {
                if ($(this).hasClass('left')) {
                    var next = current > 1 ? current - 1 : len;
                    if (current == 1 && settings.infinity) {
                        slider.css({ 'left': (-100 * len) + '%' });
                    }
                    slider.attr('data-current-slide', next);
                    slider.animate({ "left": -1 * (next - 1) * 100 + '%' }, 1000, function () {
                        current = next;
                    });
                }
                else {
                    var next = len > current ? current + 1 : 1;
                    if (current == len && settings.infinity) {
                        slider.css({ 'left': (100 * 1) + '%' });
                    }
                    slider.attr('data-current-slide', next);
                    slider.animate({ "left": -1 * (next - 1) * 100 + '%' }, 1000, function () {
                        current = next;
                    });
                }
            }
        });

    };

} (jQuery));