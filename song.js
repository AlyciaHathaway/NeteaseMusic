$(function() {

	let id = parseInt(location.search.match(/\bid=([^&]*)/)[1]);

	// 通过 url 的 id 来匹配songs.json的用户点击的歌曲 URL
	$.get('./songs.json').then(function(response) {
		let songs = response;
		let song = songs.filter((s)=> {
			return s.id === id;
		})[0]
		let {url, name, lyric} = song;
		console.log(url, name, lyric);

		initPlayer.call(undefined, url);
		initText(name, lyric);
	})

	// 初始化音乐播放
	function initPlayer(url) {
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
	}

	// 初始化标题、歌词
	function initText(name, lyric) {
		$('.song-description > h1').text(name);

		if (lyric === '') {
			let $lyric = $('.lyric');
			let $p = $('<p/>');
			$p.text('暂无歌词').appendTo($lyric);
		}else {
			parseLyric.call(undefined, lyric);
		}
	}

	// 解析歌词
	function parseLyric(lyric) {
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
	}

});