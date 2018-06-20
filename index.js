$(function() {
    $.get('./songs.json', function(response) {
        let items = response;
        items.forEach((i)=> {
            let $li = $(`
                <li>
                    <a href="./song.html?id=${i.id}">
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="icon icon-sq">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                            ${i.author} - ${i.album}
                        </p>
                        <svg class="icon icon-play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>
            `);

            $('#latestSongs').append($li);
        })

        $('#latestSongsLoading').remove();
    })
})

