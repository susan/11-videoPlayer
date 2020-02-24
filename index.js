
document.addEventListener("DOMContentLoaded", () => {
 
  const videoPlayerTag = document.querySelector(".viewer");  
  
  const playButtonTag = document.querySelector(".toggle");
  const skipButtonTags = document.querySelectorAll("[data-skip]")
  
  const player = document.querySelector(".player")
  const rangeTags = document.querySelectorAll("input")
  
  const progress=document.querySelector(".progress")
  const progressBarTag=document.querySelector(".progress__filled")
  
//functions
  const playVideo = () => {
    if (videoPlayerTag.paused) {
      videoPlayerTag.play();
    }
    else {
       videoPlayerTag.pause();
    }
  }

  const toggleButtonText = () => {
  const content = videoPlayerTag.paused ?  "►" : "❚ ❚";
  playButtonTag.innerText = content;
  }


   const skip = (e) => {
     //videoPlayerTag.pause();
     let skipValue = (e.target.dataset.skip);
     videoPlayerTag.currentTime+= parseFloat(skipValue);
   }

  


const handleRangeUpdate = e => {
  let name = e.target.name
  videoPlayerTag[name] = e.target.value 
}

const handleProgress = () => {
  const percent = (videoPlayerTag.currentTime/videoPlayerTag.duration) *100;
  progressBarTag.style.flexBasis= `${percent}%`;
}

 
const scrub = (e) => {
  let progress = e.offsetX/progressBarTag.offsetWidth;
  const scrubTime = progress * videoPlayerTag.duration;
  console.log(scrubTime)
  videoPlayerTag.currentTime=scrubTime;
}


//event listeners
  videoPlayerTag.addEventListener("click", playVideo)
  videoPlayerTag.addEventListener("play", toggleButtonText)
  videoPlayerTag.addEventListener("pause", toggleButtonText)
  videoPlayerTag.addEventListener("timeupdate", handleProgress)
  

  playButtonTag.addEventListener("click", playVideo)

  skipButtonTags.forEach(button => button.addEventListener("click", skip))
  
  rangeTags.forEach(slider=> {
    slider.addEventListener("change", handleRangeUpdate)
  })

  let mouseDown= false;
  
  progressBarTag.addEventListener("mousemove", (e) => mouseDown && scrub(e));

  progressBarTag.addEventListener("mousedown", () => mouseDown = true);
  progressBarTag.addEventListener("mouseup", () => mouseDown = false);

  progressBarTag.addEventListener("click", scrub);
  //playbackRateTag.addEventListener("change", changeRate)
  //volumeBarTag.addEventListener("change", changeVolume)
})