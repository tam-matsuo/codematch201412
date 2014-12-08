/*
 * code match returns
 * sample code
 */
jQuery(function($) {

	var positions = {};

	/*
	 * スクロール時の処理
	 */
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();

		// 150px 以上スクロールしているかどうか
		if (scrollTop > 150) {
			// ページトップを表示
			$('#page-top').stop().fadeIn(300);

			// ヘッダナビを fixed にして、フェードインさせる
			if (! $('#header').hasClass('fix')) {
				$('#header')
					.addClass('fix')
					.css('opacity', 0)
					.fadeTo(300, 1);
			}
		}
		else {
			// ページトップを非表示
			$('#page-top').stop().fadeOut(300);

			// ヘッダナビを非表示
			$('#header').removeClass('fix');
		}

		// スクロールのたびにパララックス処理を実行
		parallax(scrollTop);
	});


	/*
	 * ページ内リンク クリック時のスクロール処理
	 */
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
	 * ドロワーメニュー
	 */
	// ボタンクリック時
	$('.drawer-button a').click(function() {
		// ドロワーをアニメーション表示
		$('body').addClass('drawer-open');
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


	/*
	 * パララックス設定処理
	 * (ロード時と、ウィンドウリサイズのたびに呼び出される)
	 */
	function resetParallax() {
		// パララックス開始・終了位置を計算しておく
		positions = {
			slide2From: $('#slide3').position().top,
			slide2To: $('#slide2').position().top - $(window).height(),
			slide4From: $(document).height() - $(window).height(),
			slide4To: $('#slide4').position().top - $(window).height()
		};

		// パララックス実行
		parallax($(window).scrollTop());
	}


	/*
	 * パララックス実行
	 */
	function parallax(scrollTop) {
		// スクロール位置と x1, x2 からパーセンテージを算出
		function calcPosition(scrollTop, x1, x2) {
			var y;
			y = Math.round((scrollTop - x1) / (x2 - x1) * 100);

			// 結果は 0〜100 の範囲内に収める
			return Math.max(0, Math.min(100, y));
		}

		// slide2
		var y;
		y = calcPosition(scrollTop, positions.slide2From, positions.slide2To);
		$('#slide2').css({
			backgroundPosition: "center " + y + "%"
		});

		// slide4
		y = calcPosition(scrollTop, positions.slide4From, positions.slide4To);
		$('#slide4').css({
			backgroundPosition: "center " + y + "%"
		});
	}


	/*
	 * ウィンドウリサイズ時にパララックス処理を再実行
	 */
	$(window).resize(function() {
		resetParallax();
	});


	/*
	 * ページのロード時にパララックス処理を実行
	 */
	resetParallax();
});
