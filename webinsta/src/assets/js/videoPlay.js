function videoPlayer(event, id){
    let video = document.getElementById('video' + id);
    let juice = document.getElementById('orange-juice' + id);
    let btn = document.getElementById('play-pause' + id);
    let btnStop = document.querySelectorAll('.play-pause');
    let videos = document.querySelectorAll('.video');    

    for(let i = 0; i < videos.length; i++){                
        btnStop[i].classList.remove("pause");
        btnStop[i].classList.add("play");
        videos[i].pause();
    }
    
    event.target.classList.add("pause");
    event.target.classList.remove("play");
    // video.play();

    if(video.paused){
        event.target.classList.add("pause");
        event.target.classList.remove("play");
        video.play();
    }else{        
        event.target.classList.remove("pause");
        event.target.classList.add("play");
        video.pause();
    }

    video.addEventListener('timeupdate', function(){
        let juicePos = video.currentTime / video.duration;
        juice.style.width = juicePos * 100 + "%";
        if(video.ended){
            // btn.className = "play";
            btn.classList.remove("pause");
            btn.classList.add("play");
        }
    });
}
