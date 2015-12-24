(function ($) {
    var options = {};

    jQuery.fn.rhEqualizer = function () {

        var self = this,
            defaults = {
                style: {
                    width: 10,
                    height: function () { return Math.random() * 250 + 70; },
                    marginRight: 2
                },
                active: true
            },
            methods = {
                toggleActive: function () {
                    if (arguments.length == 0) {
                        options.active = !options.active;
                    } else if (arguments[0] == 'start') {
                        options.active = true;
                    } else if (arguments[0] == 'stop') {
                        options.active = false;
                    }
                },
                style: function (what, value) {
                    options.style[what] = value;
                },
                setContainerPadding: function (value) {
                    self.css('padding', value);
                }
            };

        if (typeof arguments[0] == 'string') {
            methods[arguments[0]].apply(null, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof arguments[0] == 'object' || (arguments[0] === undefined && arguments.length == 0)) {
            if (typeof arguments[0] != 'object') {
                options = {};
            } else {
                options = arguments[0];
            }
            options = $.extend(defaults, options);

            methods['init'] = function (self) {
                console.log('rhEqualizer init method');

                var countSpan = Math.ceil($(window).width() / (options.style.width + options.style.marginRight));

                for (var i = 0; i < countSpan; i++) {
                    self.append('<div style="width: ' + options.style.width + 'px; margin: 0 ' + options.style.marginRight + 'px 0 0;"></div>');
                }

                function equalizer(bar) {
                    // Syntax: Math.random() * (max-min = range) + min;
                    // My bars will be at least 70px, and at most 170px tall
                    var height = options.style.height();
                    // Any timing would do the trick, mine is height times 7.5 to get a speedy yet bouncy vibe
                    var timing = height * 7.5;
                    // If you need to align them on a baseline, just remove this line and also the "marginTop: marg" from the "animate"
                    var marg = (170 - height) / 2;

                    if (options.active) {
                        bar.animate({
                            height: height,
                            marginTop: marg
                        }, timing, function () {
                            equalizer($(this));
                        });
                    } else {
                        bar.animate({
                            height: 2,
                            marginTop: 84
                        }, timing, function () {
                            equalizer($(this));
                        });
                    }
                }

// Action on play-pause buttons can be added here (should be a wholesome function rather than annonymous)
                self.find('> div').each(function (i) {
                    equalizer($(this));
                });
            };


            function _(self) {
                methods['init'](self);
                return self;
            }

            return _(this);
        }
    };
})(jQuery);