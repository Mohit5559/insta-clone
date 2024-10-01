function videoPlayer(event, id){
    let video = document.getElementById('video' + id);
    let juice = document.getElementById('orange-juice' + id);
    let btn = document.getElementById('play-pause' + id);
    
    if(video.paused){
        btn.className = "pause";
        video.play();
    }else{
        btn.className = "play";
        video.pause();
    }

    video.addEventListener('timeupdate', function(){
        let juicePos = video.currentTime / video.duration;
        juice.style.width = juicePos * 100 + "%";
        if(video.ended){
            btn.className = "play";
        }
    });
}
