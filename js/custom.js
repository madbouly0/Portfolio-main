// JavaScript Document

// Preloader — use modern .on('load') instead of deprecated .load()
$(window).on('load', function () {
    "use strict";
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });
});

$(document).ready(function () {
    "use strict";

    // AOS — init first so animated elements are never stuck invisible
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');
                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);
        return false;
    });

    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });

    // Parallax — wrapped in try/catch so it never blocks other init
    try {
        $(window).stellar();
    } catch (e) {
        console.warn('Stellar.js init skipped:', e);
    }

    // Contact form validation
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: { required: true, minlength: 2 },
                email: { required: true },
                phone: { required: false },
                message: { required: true }
            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "Your name must be at least 2 characters"
                },
                email: { required: "This field is required" },
                message: { required: "This field is required" }
            }
        });
    });

});
