/*
 * code match returns
 * sample code
 * (シンプル版)
 */
jQuery(function($) {

	/*
	 * ページトップボタン
	 */
	$(window).scroll(function() {
		// 150px 以上スクロールしているかどうか
		if ($(window).scrollTop() > 150) {
			$('#page-top').stop().fadeIn(300);
		}
		else {
			$('#page-top').stop().fadeOut(300);
		}
	});

	// ページ内リンク クリック時のスクロール処理
	$('a[href^=#]').click(function() {
		var href = $(this).attr('href');
		var positionTop = 0;
		if ($(href).length > 0) {
			positionTop = $(href).position().top;
		}

		$('body').animate({
			scrollTop: positionTop
		}, {
			duration: 400,
			easing: 'swing'
		});
		return false;
	});


	/*
	 * ヘッダナビ
	 */
	$(window).scroll(function() {
		// 150px 以上スクロールしているかどうか
		if ($(window).scrollTop() > 150) {
			if (! $('#header').hasClass('fix')) {
				// ヘッダナビを fixed にして、フェードインさせる
				$('#header')
					.addClass('fix')
					.css('opacity', 0)
					.fadeTo(300, 1);
			}
		}
		else {
			$('#header').removeClass('fix');
		}
	});


	/*
	 * パララックス
	 */
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var x1, x2, y;

		// slide2 (簡易パララックス)
		y = scrollTop / 2;
		$('#slide2').css({
			backgroundPosition: "center " + -y + "px"
		});

		// slide4
		// (#slide4の位置-ウィンドウの高さ) から (ページ一番下-ウィンドウの高さ) の間で
		// background-position が 0% 〜 100% になるよう、調整
		x1 = $(document).height() - $(window).height();
		x2 = $('#slide4').position().top - $(window).height();
		y = (scrollTop - x1) / (x2 - x1) * 100;

		$('#slide4').css({
			backgroundPosition: "center " + y + "%"
		});
	});


	/*
	 * ドロワーメニュー
	 */
	// ボタンクリック時
	$('.drawer-button a').click(function() {
		$('body').addClass('drawer-open');

		// ドロワーをアニメーション表示
		$('.wrapper, .drawer-body').animate({
			right: 240
		}, {
			duration: 200
		});

		// オーバーレイをフェードイン
		$('.drawer-overlay').fadeIn();
		return false;
	});

	// オーバーレイのクリック時
	$('.drawer-overlay').click(function() {
		// ドロワーを隠す
		$('.wrapper, .drawer-body').animate({
			right: 0
		}, {
			duration: 200,
			// アニメーション終了時
			complete: function() {
				$('body').removeClass('drawer-open');
			}
		});

		// オーバーレイを隠す
		$('.drawer-overlay').fadeOut();
		return false;
	});
});
