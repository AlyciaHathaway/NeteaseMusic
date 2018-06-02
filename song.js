$(function() {
	$.get('./lyric.json').then(function(object) {
		let {lyric} = object;
		let array = lyric.split('\n');
		let regex =	/^\[(.+)\](.*)$/;
		array = array.map(function(string) {
			let matches = string.match(regex);
			if (matches) {
				return {time: matches[1], words: matches[2]}
			}
		});

		let $lyric = $('.lyric');
		array.map(function(object) {
			if (!object) {return}
			let $p = $('<p/>');
			$p.attr('data-time', object.time).text(object.words);
			$p.appendTo($lyric.children('.lines'));
		})
	});

	let audio = document.createElement('audio');
	audio.src = 'http://fs.w.kugou.com/201806021510/914231c9b2490cdc2dd8726109687f50/G101/M0A/10/0F/pQ0DAFkQjNaAAMxXAF1wLMRlUAM318.mp3';
	audio.oncanplay = function() {
		audio.play();
		$('.disc-container').addClass('playing');
	}

	$('.icon-pause').on('click', function() {
		audio.pause();
		$('.disc-container').removeClass('playing');
	})
	$('.icon-play').on('click', function() {
		audio.play();
		$('.disc-container').addClass('playing');
	})
});