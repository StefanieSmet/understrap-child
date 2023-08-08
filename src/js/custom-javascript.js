(function($){

    if($('#grained_container').length){
        var grained_options = {
            'animate': true,
            'patternWidth': 400,
            'patternHeight': 400,
            'grainOpacity': 0.15,
            'grainDensity': 2,
            'grainWidth': 1,
            'grainHeight':1
        }
        grained('#grained_container', grained_options);
    }

    /*
		Cursor Effects
	*/
    var width = $(window).width();
	var height = $(window).height();

	if((width > 1199) && $('.cursor-follower').length) {
		$(window).on('mousemove', function(e){
			var x = e.pageX;
			var y = e.pageY;
			var newposX = x;
			var newposY = y;
			$('.cursor-follower').css('transform','translate3d('+newposX+'px,'+newposY+'px,0px)');
		});
		$('a').on({
			mouseenter: function (e) {
				cursor_over();
			},
			mouseleave: function (e) {
				cursor_out();
			}
		});
	}

	function cursor_over(){
		$(".cursor-follower-inner").stop().animate({width: 86, height: 86, opacity: 0.1, margin: '-43px 0 0 -43px'}, 500);
	}
	function cursor_out(){
		$(".cursor-follower-inner").stop().animate({width: 26, height: 26, opacity: 0.4, margin: '-13px 0 0 -13px'}, 500);
	}

    $('.js-menu-item').on('click',function(e){
        e.preventDefault();

        var source = $(this).data('source');

        $('.js-menu-item').removeClass('active');
        $(this).addClass('active');

        $('#js-content div').removeClass('active');
        $('#js-content div[data-target='+source+']').addClass('active');
    });

    $('#js-menu-toggle').on('click',function(e){
        $(this).toggleClass('open');

        $('.navigation').toggleClass('open');
    });


    $('body').on('click', '.navigation.open .js-menu-item', function() {
        $('#js-menu-toggle').removeClass('open');

        $('.navigation').removeClass('open');

    });

})(jQuery);