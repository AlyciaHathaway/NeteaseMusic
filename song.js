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
	audio.src = 'http://dl.stream.qqmusic.qq.com/C400001pTnkI06GIsr.m4a?vkey=6AD20A0BBE5B1AB3A8DEBB445B0B8FCE93D451F0F4581594371BF0AFC566F0FF9431B2846E9CBD7FBA33292488C3D9CDDFA7EBCCA79FCE34&guid=2580314012&uin=0&fromtag=66';
	audio.oncanplay = function() {
		audio.play();
		$('.disc-container').addClass('playing');
	}
});