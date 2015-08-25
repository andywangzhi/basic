jQuery(document).ready(
		function() {

			$('.page-container form').submit(function() {
				var loginId = $(this).find('.loginId').val();
				var password = $(this).find('.password').val();
				if (loginId == '') {
					$(this).find('.error').fadeOut('fast', function() {
						$(this).css('top', '27px');
					});
					$(this).find('.error').fadeIn('fast', function() {
						$(this).parent().find('.loginId').focus();
					});
					return false;
				}
				if (password == '') {
					$(this).find('.error').fadeOut('fast', function() {
						$(this).css('top', '96px');
					});
					$(this).find('.error').fadeIn('fast', function() {
						$(this).parent().find('.password').focus();
					});
					return false;
				}
			});

			$('.page-container form .loginId, .page-container form .password')
					.keyup(function() {
						$(this).parent().find('.error').fadeOut('fast');
					});

		});
