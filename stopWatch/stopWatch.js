
{

let hours = document.getElementById("hours")
let minitus = document.getElementById("minitus")
let seconds = document.getElementById("seconds")
let miliSeconds = document.getElementById("miliSeconds") 

let startBtn = document.getElementById("startBtn") 
let markBtn = document.getElementById("markBtn") 
let restartBtn = document.getElementById("restartBtn") 

markBtn.disabled = true ;
restartBtn.disabled = true ;

markBtn.classList.add("disabled");   //initially disabled
restartBtn.classList.add("disabled");   //initially disabled


let startTime=null;    // store,s accurate the time when the stopWatch start,s
let count = 0;   // to count hrs,mint,sec,milisec 
let running = false;   // checks stop watch is running or not

// timestamp stores the time when the page get load 
function stopWatchFxn(timestamp) {
    if (!running) return; 

    if (!startTime) startTime = timestamp;

    const timePassed = timestamp - startTime;    // store's how many time passed since pageload
    count = timePassed;                   // update the count accuratly 

    let hrs = Math.floor((count / (1000 * 60 * 60)) % 24);
    let min = Math.floor((count / (1000 * 60)) % 60);
    let sec = Math.floor((count / 1000) % 60);
    let milli = Math.floor((count % 1000) / 10);

    updateDOM(hrs,min,sec,milli) ;

    requestAnimationFrame(stopWatchFxn);  //** 
}

// fxn to update time display
function updateDOM(hrs,min,sec,milli){
    hours.innerHTML = hrs < 10 ? "0" + hrs : hrs;
    minitus.innerHTML = min < 10 ? "0" + min : min;
    seconds.innerHTML = sec < 10 ? "0" + sec : sec;
    miliSeconds.innerHTML = milli < 10 ? "0" + milli : milli; 
}

function startStopwatch() {
    requestAnimationFrame(stopWatchFxn); 
}

let startStatus = true ;

startBtn.addEventListener('click',()=>{

    if(startStatus){
        running = true ;
    }
    else{
        running = false;
    }

    setStartBtn() ;
    startStopwatch();
})

function setStartBtn(){
    if(startStatus){
        startBtn.innerHTML = `<i class="fa-solid fa-pause"></i>` ;
        markBtn.classList.remove("disabled");
        restartBtn.classList.remove("disabled");
        markBtn.disabled = false ;
        restartBtn.disabled = false ;
        markBtn.classList.add("enabled");
        restartBtn.classList.add("enabled");
    }
    else{
        startBtn.innerHTML =`<i class="fa-solid fa-play"></i>`;
        markBtn.classList.remove("enabled");
        markBtn.classList.add("disabled");
        markBtn.disabled = true ;
    }
    startStatus = !startStatus;
}

restartBtn.addEventListener('click', resetFxn);

function resetFxn(){
    count =0 ;
    running = false;
    startTime = null ;

    updateDOM(0,0,0,0) ;

    startStatus = false;
    setStartBtn() ;

    markBtn.classList.remove("enabled");
    restartBtn.classList.remove("enabled");
    markBtn.classList.add("disabled");
    restartBtn.classList.add("disabled");
    markBtn.disabled = true ;
    restartBtn.disabled = true ;

    ulContainer.innerHTML = '';
    srNo = 0 ;
    contentHeroContainer.classList.remove("enableContent");
    contentHeroContainer.classList.add("disableContent");
}


// marking the time on clicking btn markBtn 

let contentHeroContainer = document.getElementsByClassName("markedTime-data-container-one")[0] ;
contentHeroContainer.classList.add("disableContent");

let ulContainer = document.getElementsByClassName("content-container")[0] ;
let prevHrs = 0, prevMin = 0, prevSec = 0, prevMilli =0 ;
let calc = false ;

let srNo = 0 ;

markBtn.addEventListener('click',markedDataFxn);

function markedDataFxn(){

    srNo++;
    if(srNo===1){
        contentHeroContainer.classList.remove("disableContent");
        contentHeroContainer.classList.add("enableContent");
    }

    let newLi = document.createElement('li') ;
    newLi.classList.add("containers-data");

    let srnDiv = document.createElement('div') ;
    srnDiv.classList.add("srnDiv") ;  // serial no div 
    srnDiv.innerHTML = srNo ;
    newLi.appendChild(srnDiv) ;

    let differenceDiv = document.createElement('div') ;
    differenceDiv.classList.add("diffDiv") ;  // time difference div 
    newLi.appendChild(differenceDiv) ;

    let currentDiv = document.createElement('div') ;
    currentDiv.classList.add("currDiv") ;   // current time div
    newLi.appendChild(currentDiv) ;

    ulContainer.prepend(newLi) ;

    let hrs = parseInt(hours.innerHTML);
    let min = parseInt(minitus.innerHTML);
    let sec = parseInt(seconds.innerHTML);
    let milli = parseInt(miliSeconds.innerHTML);

    calculateDifference(hrs, min, sec, milli, currentDiv, differenceDiv);
}



function calculateDifference(hrs, min, sec, milli, currentDiv, differenceDiv){
    newHr = hrs - prevHrs ;
    newMinit = min - prevMin ;
    newSec = sec - prevSec ;
    newMilli = milli - prevMilli ;

    if (newMilli < 0) {
        newMilli += 100;
        newSec--;
    }

    if (newSec < 0) {
        newSec += 60;
        newMinit--;
    }

    if (newMinit < 0) {
        newMinit += 60;
        newHr--;
    }

    if (newHr < 0) {
        newHr = 0;
    }

    currentDiv.innerHTML = `${hrs < 10 ? "0" + hrs : hrs} : ${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec} : ${milli < 10 ? "0" + milli : milli}`;

    differenceDiv.innerHTML = `${newHr < 10 ? "0" + newHr : newHr} : ${newMinit < 10 ? "0" + newMinit : newMinit} : ${newSec < 10 ? "0" + newSec : newSec} : ${newMilli < 10 ? "0" + newMilli : newMilli}`;

    prevHrs = hrs;
    prevMin = min;
    prevSec = sec;
    prevMilli = milli;
}

}

















