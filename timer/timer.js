
{

let addTimer = document.getElementById("add-newTimer");
let modalDiv = document.getElementsByClassName("outerContainer")[0];
let cancelBtn = document.getElementById("cancleTimer");


addTimer.addEventListener('click', () => {
    modalDiv.style.display = "flex";  
});


cancelBtn.addEventListener('click', () => {
    modalDiv.style.display = "none"; 
});

window.addEventListener('click',function(event){
    if(event.target === modalDiv ){
        modalDiv.style.display = "none";
    }
})


//  setting scroller  to select time
let hr_upBtn = document.getElementById("hour-up-scroller") ;
let mini_upBtn = document.getElementById("mini-up-scroller") ;
let sec_upBtn = document.getElementById("sec-up-scroller") ;

let hr_downBtn = document.getElementById("hour-down-scroller") ;
let mini_downBtn = document.getElementById("mini-down-scroller") ;
let sec_downBtn = document.getElementById("sec-down-scroller") ;

let hr_span = document.getElementById("hrSpan") ;
let mini_span = document.getElementById("miniSpan") ;
let sec_span = document.getElementById("secSpan") ;

let hr = 0 , mini = 0 , sec = 0 ;


hr_upBtn.addEventListener('click',()=>{
    timerFxn('hrs','up');
})
hr_downBtn.addEventListener('click',()=>{
    timerFxn('hrs','down');
})

mini_upBtn.addEventListener('click',()=>{
    timerFxn('minis','up');
})
mini_downBtn.addEventListener('click',()=>{
    timerFxn('minis','down');
})

sec_upBtn.addEventListener('click',()=>{
    timerFxn('secs','up');
})
sec_downBtn.addEventListener('click',()=>{
    timerFxn('secs','down');
})

function timerFxn(para,direction){
    if(para==='hrs'){
        if(direction==='up'){
            if(hr===23){
                hr=0 ;
            }
            else{
                hr++ ;
            }
        }
        else if(direction==='down'){
            if(hr===0){
                hr=23 ;
            }
            else{
                hr--;
            }
        }
        // console.log(hr) ;
        hr_span.innerHTML = hr<10 ? '0' + hr : hr ;
    }

    else if(para==='minis'){
        if(direction==='up'){
            if(mini===59){
                mini=0 ;
            }
            else{
                mini++ ;
            }
        }
        else if(direction==='down'){
            if(mini===0){
                mini=59 ;
            }
            else{
                mini--;
            }
        }
        // console.log(mini) ;
        mini_span.innerHTML = mini<10 ? '0' + mini : mini ;
    }

    else if(para==='secs'){
        if(direction==='up'){
            if(sec===59){
                sec=0 ;
            }
            else{
                sec++ ;
            }
        }
        else if(direction==='down'){
            if(sec===0){
                sec=59 ;
            }
            else{
                sec--;
            }
        }
        // console.log(mini) ;
        sec_span.innerHTML = sec<10 ? '0' + sec : sec ;
    }
}


let inputBar = document.getElementById("heading-input") ;

let saveBtn = document.getElementById("saveTimer") ;
let timerMainContainer = document.getElementsByClassName("timer-inner-main-container")[0]

let timers = [] ;   // to store different timers content


// if there is not alarm then this shows up and if alarm is added then this get removed
var TrackHeroContainer =  undefined;
function checkThereIsTimer(){
    if(timers.length===0){
        let HeroContainer = document.createElement("div") ;
        HeroContainer.classList.add("HeroContainer") ;
        HeroContainer.innerHTML = `<div class="innerContainer" >
                <h1><i class="fa-regular fa-hourglass"></i></h1>
                <h1>You dont have any timers.</h1>
                <h3>Select "+" below to add a timer.</h3>
            </div>`
                
        timerMainContainer.appendChild(HeroContainer) ;
        TrackHeroContainer = document.getElementsByClassName("HeroContainer")[0]
    }
    else{
        if(TrackHeroContainer!==undefined){
            TrackHeroContainer.remove() ;
        }
    }
}
checkThereIsTimer()


//  updating the input bar for new alarm
inputBar.value = `Timer (${timers.length +1})` ;  // initial default heading

saveBtn.addEventListener('click',save1Fxn)

function save1Fxn(){
    // count++ ;
    let timer = {
        time: {
            hours: hr,
            minutes: mini,
            second: sec,
        },
        label: inputBar.value,  // Save timer heading 
        // yess: true
    };
    timers.push(timer);
    // console.log('timers:', timers);

    createNewTimerConten(timer) ;

    // closing the popup window
    closePopup();
    checkThereIsTimer() // checking is there is any timer or not
}

// just creating another timer 
function createNewTimerConten(timer){

    let timerContent = document.createElement('div') ;
    timerContent.classList.add("timer-content-div-container") ;

    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let span4 = document.createElement('span');
    let span5 = document.createElement('span');   //  :)

    span2.innerHTML = ":" ;
    span4.innerHTML = ":" ;
    span1.innerHTML = (timer.time.hours < 10) ? '0' + timer.time.hours : timer.time.hours;
    span3.innerHTML = (timer.time.minutes < 10) ? '0' + timer.time.minutes : timer.time.minutes;
    span5.innerHTML = (timer.time.second < 10) ? '0' + timer.time.second : timer.time.second;
    
    const alarmTimeDiv = document.createElement('div') ;
    alarmTimeDiv.classList.add("timerTime-div") ;

    alarmTimeDiv.appendChild(span1) ;    
    alarmTimeDiv.appendChild(span2) ;
    alarmTimeDiv.appendChild(span3) ;
    alarmTimeDiv.appendChild(span4) ;
    alarmTimeDiv.appendChild(span5) ;     // :)

    const circularProgress = document.createElement('div') ;
    circularProgress.classList.add("circular-progress") ;

    const innerCircle = document.createElement('div') ;
    innerCircle.classList.add("inner-circle") ;

    circularProgress.appendChild(innerCircle)
    circularProgress.appendChild(alarmTimeDiv)
    timerContent.appendChild(circularProgress)

    //  delte icon
    let deleteBtn = document.createElement('i') ;
    deleteBtn.classList.add("fa-regular","fa-trash-can") ;
    deleteBtn.classList.add("deleteBtn") ;

    const timerIndex = timers.length - 1; // finding index of the added timer
    deleteBtn.setAttribute('data-index', timerIndex);

    timerContent.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        const indexToRemove = deleteBtn.getAttribute('data-index');
        timers.splice(indexToRemove, 1);
        timerContent.remove();

        checkThereIsTimer()  // checking that there is any timer or not
    });

    // setting heading
    const timerHeading = document.createElement('h3') ;
    timerHeading.classList.add("timer-heading") ;
    timerHeading.innerHTML = inputBar.value.trim()!=="" ? inputBar.value : `Timer (${timers.length})` ;// heading according to user input or default 

    //  updating the input bar for new timer
    inputBar.value = `Timer (${timers.length +1})` ;

    timerContent.appendChild(timerHeading) ;

    //  creating and adding save and restart button's 
    const timerButtonContainer = document.createElement('div') ;
    timerButtonContainer.classList.add("timer-button-container") ;

    // start btn 
    const startBtn = document.createElement('button') ;
    startBtn.classList.add("timer-btns","startBtn") ;
    startBtn.innerHTML =`<i class="fa-solid fa-play"></i>`; // initial icon is play


    // restart btn 
    const restartBtn = document.createElement('button') ;
    restartBtn.classList.add("timer-btns","restartBtn") ;
    restartBtn.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i>`

    restartBtn.disabled = true ;
    restartBtn.classList.add("disabled"); // initially disabled

    timerButtonContainer.appendChild(startBtn) ;
    timerButtonContainer.appendChild(restartBtn) ;

    timerContent.appendChild(timerButtonContainer) ;

    // adding functionalty to start btn so the timer get start 
    startBtn.onclick = function(){
        startCountdown(startBtn,restartBtn,deleteBtn,circularProgress,span1,span3,span5,timerHeading.innerHTML) ;
    }

    // adding timer content to the screen
    timerMainContainer.appendChild(timerContent) ;
}


// fxn to closing the popup of creating new timer 
function closePopup(){
    window.addEventListener('click',function(event){
        if(event.target === saveBtn ){
            modalDiv.style.display = "none";
        }
    })
}


// fxn to  calculate time in seconds
function calculateTimeInSeconds(hours,minutes,seconds){
    return ((hours*60*60) + (minutes*60))+seconds ;
}

// function to start and render the timer 
function startCountdown(startBtn,restartBtn,deleteBtn,circularProgress, span1, span3, span5,TimerHeading) {
    
    let Timer = null; // declared Timer to contain interval 
    let isStart = true ; // timer is start or not
    const pauseIcon = `<i class="fa-solid fa-pause"></i>` ;
    const playIcon = `<i class="fa-solid fa-play"></i>` ; // icons of start btn

    // fxn to update the timer time
    const updateDisplay = () => {
        span1.innerHTML = hours < 10 ? '0' + hours : hours;
        span3.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        span5.innerHTML = seconds < 10 ? '0' + seconds : seconds;

        // console.log("hours =",hours," minutus =",minutes," seconds =",seconds) ;
    };

    // getting time set by user
    let hours = Number(span1.innerHTML);
    let minutes = Number(span3.innerHTML);
    let seconds = Number(span5.innerHTML);

    //(time entered by user) initial hours, minutes, and seconds for reset
    const initialHours = hours;
    const initialMinutes = minutes;
    const initialSeconds = seconds;

    const duration = calculateTimeInSeconds(hours, minutes, seconds);
    let currentValue = duration;
    let anglePerSecond = 360 / duration;

    // fxn containing the interval (Timer)
    const startTimer = () => {
        // when timer get start it will start from 1 sec less time 
        // for example if timer is for 5sec then it will run from 4-0sec (total 5sec)
        currentValue--;
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                hours = (hours<0)?0:hours ;  // not get -ve hours
            }
        }
        updateDisplay(); // displaying updated time immediately

        // interval called Timer
        Timer = setInterval(() => {
            // when time will show 0sec remaning on screen means 1 sec remaning so 
            // when there is 1 sec on screen and it get 0 after 1sec delay so the screen show 0sec means 1 sec is still left and 
            // it will take another 1sec delay and come back and then get terminated
            if (currentValue == 0) {
                clearInterval(Timer);
                updateDisplay();
                circularProgress.style.background = `conic-gradient(#E9ECEF 0deg, #E9ECEF 360deg)`;

                showPopup(isStart,startBtnFunctionality,circularProgress, span1, span3, span5, initialHours, initialMinutes, initialSeconds,TimerHeading);
                hours=initialHours;minutes=initialMinutes;seconds=initialSeconds;  //
                currentValue = duration ;   // reset currentValue and hours,minutes and seconds
                playTimer();
                return;
            }
            circularProgress.style.background = `conic-gradient(#4F8EF4 
            ${currentValue * anglePerSecond}deg, #E9ECEF 0deg)`;

            currentValue--;
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    hours = (hours<0)?0:hours ;  // do not set -ve hours
                }
            }
            updateDisplay();

        }, 1000);
    };

    function startBtnFunctionality  (){
        if(isStart){
            startTimer() // starting the timer ;

            startBtn.innerHTML = `${pauseIcon}` ; // changing the start btn icon to pause
            restartBtn.disabled = false ;
            restartBtn.classList.remove("disabled");
            restartBtn.classList.add("enabled");     // enabled restart btn
        }
        else{
            clearInterval(Timer) ;
            startBtn.innerHTML = `${playIcon}` ; // changing the start btn icon to pause
            restartBtn.disabled = true ;
            restartBtn.classList.remove("enabled");
            restartBtn.classList.add("disabled");     // disabled restart btn
        }

        isStart = !isStart ; // toggle isStart 
    }

    startBtnFunctionality() ; // initially start the timer and change btns 

    // event for start btn to pause and play the timer
    startBtn.onclick = ()=>{
        startBtnFunctionality() ; // changing the btn icon and changing the restart btn and functionlity
    }

    // Restart button logic
    restartBtn.onclick = () => {
        clearInterval(Timer); // Stop current interval
        // resetting the timer time
        hours = initialHours;
        minutes = initialMinutes;
        seconds = initialSeconds;
        currentValue = duration;
        anglePerSecond = 360 / duration;
        updateDisplay(); // update the time on screen
        circularProgress.style.background = `conic-gradient(#4F8EF4 360deg, #E9ECEF 0deg)`;
        startTimer(); // Restart the timer
    };

    // when the timer get delete 
    deleteBtn.onclick = ()=>{
        console.log("Timer is deleted ")
        clearInterval(Timer) //clear interval
    }
}


let timerAudio = new Audio("/alarmAudio/alarmAudio.mp3");
//  fxn to play the timer
function playTimer() {
    timerAudio.play(); // Play the timer audio
}

//  showing timer snooze - close popup
const timerheroContainer = document.getElementsByClassName("timer-outer-hero-containerr")[0];
function showPopup(isStart,startBtnFunctionality,circularProgress,span1, span3, span5,initialHours,initialMinutes,initialSeconds,TimerHeading){
    const popupContainer = document.createElement('div')
    popupContainer.classList.add("timer-popup-div-container") ;

    const popupHeading = document.createElement('h3')
    popupHeading.classList.add("timer-heading-popup") ;
    popupHeading.innerHTML = `${TimerHeading}` ;
    popupContainer.appendChild(popupHeading) ;

    const alarmTimePopup = document.createElement('div')
    alarmTimePopup.classList.add("timerTime-popup-div") ;

    let spanP1 = document.createElement('span');
    let spanP2 = document.createElement('span');
    let spanP3 = document.createElement('span');
    let spanP4 = document.createElement('span');
    let spanP5 = document.createElement('span');

    spanP2.innerHTML = ":" ;
    spanP4.innerHTML = ":" ;
    spanP1.innerHTML = (initialHours < 10) ? '0' + initialHours : initialHours;
    spanP3.innerHTML = (initialMinutes < 10) ? '0' + initialMinutes: initialMinutes;
    spanP5.innerHTML = (initialSeconds < 10) ? '0' + initialSeconds : initialSeconds;

    alarmTimePopup.appendChild(spanP1) ;
    alarmTimePopup.appendChild(spanP2) ;
    alarmTimePopup.appendChild(spanP3) ;
    alarmTimePopup.appendChild(spanP4) ;
    alarmTimePopup.appendChild(spanP5) ;

    popupContainer.appendChild(alarmTimePopup) ;


    const popupButtons = document.createElement('div') ;
    popupButtons.classList.add("popup-buttons-container") ;

    const dismissBtn = document.createElement('button') ;
    dismissBtn.innerHTML = "Dismiss"
    popupButtons.appendChild(dismissBtn) ;

    dismissBtn.addEventListener('click',()=>{
        timerAudio.pause(); // Stop the timer sound

        span1.innerHTML = initialHours < 10 ? '0' + initialHours : initialHours;
        span3.innerHTML = initialMinutes < 10 ? '0' + initialMinutes : initialMinutes;
        span5.innerHTML = initialSeconds < 10 ? '0' + initialSeconds : initialSeconds;  // reset timer display time

        circularProgress.style.background = `conic-gradient(#4F8EF4 360deg, #E9ECEF 0deg)`;

        isStart=false;// setting it false so the else condition will run in startBtnFunctionality() and timer get close
        startBtnFunctionality()

        popupContainer.remove();
    })
    popupContainer.appendChild(popupButtons) ;

    timerheroContainer.appendChild(popupContainer);  //poupup added to screeen
}


}































