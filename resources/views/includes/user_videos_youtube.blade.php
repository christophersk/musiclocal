

@foreach ($videos as $key => $video)
    <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" id="ytplayer" type="text/html" src="https://www.youtube.com/embed/{{ $video }}?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0" allowfullscreen frameborder="0"/></iframe>
    </div>

@endforeach




<script>
    /*
     var tag = document.createElement('script');

     tag.src = "https://www.youtube.com/iframe_api";
     var firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


     var player;
     $_video = "<?php //echo $video->videoid; ?>";
     function onYouTubeIframeAPIReady() {
     player = new YT.Player($_video, {
     videoId: $_video,
     //list: 'PL42o1uVlfrQuS2DZX5bdyWVz2X1IA6qDD',
     //listType: 'playlist',
     playerVars: {
     'modestbranding': 1, 'rel': 0, 'showinfo': 0
     },
     events: {
     }
     });
     }
     */

</script>