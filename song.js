$(function() {

	let id = parseInt(location.search.match(/\bid=([^&]*)/)[1]);

	// 通过 url 的 id 来匹配songs.json的用户点击的歌曲 URL
	$.get('./songs.json').then(function(response) {
		let songs = response;
		let song = songs.filter((s)=> {
			return s.id === id;
		})[0]
		let {url} = song;
		console.log(url);

		let audio = document.createElement('audio');
		audio.src = url;
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
	})

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

});