document.getElementById('end-button').addEventListener('click', function() {
  setTimeout(function() {
    window.location.href = "archive.html";
  }, 6000);
  document.getElementById('audioClick').play();

const audioElement = document.getElementById("myAudio2");
fadeOutAudio(audioElement, 8000); 
document.querySelector('.content-container').innerHTML=
`
<div class="voice-between">
<div class="voice">
It is, after all, all about you. Isn’t it?
</div>
</div>
`
});




function fadeOutAudio(element, duration) {
  const initialVolume = element.volume;
  const interval = 50; // Adjust the interval for smoother or faster fading

  // Calculate the number of steps based on the duration and interval
  const numSteps = Math.floor(duration / interval);
  const stepSize = initialVolume / numSteps;

  let currentVolume = initialVolume;

  const fadeInterval = setInterval(function() {
    if (currentVolume > 0) {
      currentVolume -= stepSize;
      if (currentVolume < 0) {
        currentVolume = 0;
      }
      element.volume = currentVolume;
    } else {
      clearInterval(fadeInterval);
      element.pause(); // Pause or stop the audio after fading out
    }
  }, interval);
  console.log('no audio')
}


