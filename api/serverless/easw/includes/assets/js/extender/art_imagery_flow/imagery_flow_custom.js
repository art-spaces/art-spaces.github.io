 /*
 *
 * Theme functions
 * Initialize all scripts and adds custom js
 *
 * Version 1.2
 */
( function( $ ) {
    "use strict";

    jQuery(window).on('load', function(){
    ///////////////////////////////

        /////////////////////////////////
        // Sticky Sidebar
        /////////////////////////////////
        jQuery('.sidebar-sticky').stick_in_parent({parent: '.wrap-fullwidth', spacer: '.sidebar-wrapper-sticky', recalc_every: 1});
        jQuery('#single-share').stick_in_parent({parent: '.single-content, .single-fw-bg'});
        jQuery('.single-like-box').stick_in_parent({parent: '.single-content, .single-fw-bg'});
        jQuery('.sidebar-sticky')
        .on('sticky_kit:bottom', function(e) {
            jQuery(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function(e) {
            jQuery(this).parent().css('position', 'relative');
        })

        /////////////////////////////////
        // Slider Featured Articles
        /////////////////////////////////
        jQuery('.featured-posts').hide().css({'left' : "0px"}).fadeIn(1000); // fade effect for images.
        jQuery('.featured-posts').owlCarousel({
            loop: true,
            center: false,
            autoWidth: true,
            autoplay: false,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>']
        })  
        // Slider Nav
        jQuery('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY>0) {
                owl.trigger('next.owl');
            } else {
                owl.trigger('prev.owl');
            }
            e.preventDefault();
        }); 

        /////////////////////////////////
        // Hover Effect
        /////////////////////////////////
        jQuery(".hover").mouseleave(
            function () {
              jQuery(this).removeClass("hover");
            }
        ); 

        /////////////////////////////////
        // Masonry 
        /////////////////////////////////
        var $container = jQuery( '#infinite-articles' );
        $container.imagesLoaded( function(){
            $container.masonry( {
                itemSelector        : '.ms-item, .big-style',
                transitionDuration  : '0.5s',
                isOriginLeft: true,
            } );
        } );

        // Infinite scroll
        jQuery("ul.modern-grid").hide().css({'left' : "0px"}).fadeIn(3000); // fade effect for images.
        jQuery(".defaultpag").hide().css({'left' : "0px"}).fadeIn(3500); // fade effect for images.
        var $container = jQuery( '#infinite-articles' );
        $container.infinitescroll( {
                loading : {
                    msg         : null,
                    finishedMsg : '<span><i class="fa fa-check"></i> Completed </span>',
                    msgText     : '<span><i class="fa fa-spinner fa-spin"></i> Loading </span>',
                },
                navSelector     : '#nav-below',
                nextSelector    : '#nav-below a',
                itemSelector    : '.ms-item',
                },
                // trigger Masonry as a callback
                function( newElements ) {
                    // hide new items while they are loading
                    var $newElems = jQuery( newElements ).css( { opacity: 0 } );
                    // ensure that images load before adding to masonry layout
                    $newElems.imagesLoaded( function(){
                        // Slider
                        // show elems now they're ready
                        $(".sidebar").stick_in_parent({recalc_every: 1}); // infinite scroll + sticky
                        $newElems.animate( { opacity: 1 } );
                        $container.masonry( 'appended', $newElems, true );
                } );
        } ); 

        /////////////////////////////////
        // Go to TOP
        /////////////////////////////////
        // hide #back-top first
        jQuery("#back-top").hide();
        // fade in #back-top
        jQuery(function () {
            jQuery(window).scroll(function () {
                if (jQuery(this).scrollTop() > 100) {
                    jQuery('#back-top').fadeIn();
                } else {
                    jQuery('#back-top').fadeOut();
                }
            });

            // scroll body to 0px on click
            jQuery('#back-top a').on('click', function () {
                jQuery('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        }); 

        topmobileScroll(
            function (direction) {
                try {
                    if (direction === 'down') {
                        document.querySelector('.back_top').classList.add('mini_ui_hidden');
                        document.querySelector('.pagination').classList.add('mini_ui_hidden');
                    } else {
                        document.querySelector('.back_top').classList.remove('mini_ui_hidden');
                        document.querySelector('.pagination').classList.remove('mini_ui_hidden');
                    }
                } catch (err) {
                }
            }
        );
        function topmobileScroll(fn) {
            var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                fn = fn || function () {
                };
            window.addEventListener("scroll", function () {
                var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta === 0) return false;
                fn(delta > 0 ? "down" : "up");
                beforeScrollTop = afterScrollTop;
            }, false);
        };

    } );
} )( jQuery );