window.onload = function() {
    var audio = document.getElementById('music');
    audio.pause(); //打开页面时不播放音乐，
}

function play() {
    var audio = document.getElementById('music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0; //音乐从头播放
    }
}