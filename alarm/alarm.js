
{

let addTimer = document.getElementById("add-newAlarm");
let modalDiv = document.getElementsByClassName("outerContainer")[0];
let cancelBtn = document.getElementById("cancleAlarm");
let heroContainer = document.getElementsByClassName("alarm-outer-hero-container")[0];


addTimer.addEventListener('click', () => {
    modalDiv.style.display = "flex"; 
});

cancelBtn.addEventListener('click', () => {
    modalDiv.style.display = "none"; 
    
    //  cancling selected days
    cancleSelectedDays();
});

window.addEventListener('click',function(event){
    if(event.target === modalDiv ){
        modalDiv.style.display = "none";
    }
})



//  setting scroller to select time

let hr_upBtn = document.getElementById("hour-up-scroller") ;
let mini_upBtn = document.getElementById("mini-up-scroller") ;

let hr_downBtn = document.getElementById("hour-down-scroller") ;
let mini_downBtn = document.getElementById("mini-down-scroller") ;

let hr_span = document.getElementById("hrSpan") ;
let mini_span = document.getElementById("miniSpan") ;

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
}


let inputBar = document.getElementById("heading-input") ;

let saveBtn = document.getElementById("saveAlarm") ;
let alarmMainContainer = document.getElementsByClassName("alarm-inner-main-container")[0]

let rDayArr = [] ;  // storing repetation days
let alarms = [] ;   // to store different alarms content


// if there is not alarm then this shows up and if alarm is added then this get removed
var TrackHeroContainer =  undefined;
function checkThereIsAlarm(){
    if(alarms.length===0){
        let HeroContainer = document.createElement("div") ;
        HeroContainer.classList.add("HeroContainer") ;
        HeroContainer.innerHTML = `<div class="innerContainer" >
                <h1><i class="fa-regular fa-hourglass"></i></h1>
                <h1>You dont have any alarms.</h1>
                <h3>Select "+" below to add a alarm.</h3>
            </div>`
                
        alarmMainContainer.appendChild(HeroContainer) ;
        TrackHeroContainer = document.getElementsByClassName("HeroContainer")[0]
    }
    else{
        if(TrackHeroContainer!==undefined){
            TrackHeroContainer.remove() ;
        }
    }
}
checkThereIsAlarm()


//  updating the input bar for new alarm
inputBar.value = `Alarm (${alarms.length +1})` ;

saveBtn.addEventListener('click',save1Fxn)

function save1Fxn(){
    // count++ ;

    let alarm = {
        time: {
            hours: hr,
            minutes: mini,
        },
        days: [...rDayArr],  // copy the weekdays when we have to repeate the alarm
        label: inputBar.value,  // Save alarm heading 
        yess: true
    };

    alarms.push(alarm);
    // console.log('Alarms:', alarms);


    createNewAlarmConten(alarm) ;
    
    cancleSelectedDays();

    // closing the popup window
    closePopup();
    checkThereIsAlarm()   // checking that there is any alaram or not 
}


function createNewAlarmConten(alarm){

    let alarmContent = document.createElement('div') ;
    alarmContent.classList.add("alarm-content-div-container") ;

    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    span2.innerHTML = ":" ;
    span1.innerHTML = (alarm.time.hours < 10) ? '0' + alarm.time.hours : alarm.time.hours;
    span3.innerHTML = (alarm.time.minutes < 10) ? '0' + alarm.time.minutes : alarm.time.minutes;

    let alarmTimeDiv = document.createElement('div') ;
    alarmTimeDiv.classList.add("alarmTime-div") ;

    alarmTimeDiv.appendChild(span1) ;
    alarmTimeDiv.appendChild(span2) ;
    alarmTimeDiv.appendChild(span3) ;

    alarmContent.appendChild(alarmTimeDiv)

    //  delte icon
    let deleteBtn = document.createElement('i') ;
    deleteBtn.classList.add("fa-regular","fa-trash-can") ;
    deleteBtn.classList.add("deleteBtn") ;
    // alarmContent.appendChild(di) ;

    const alarmIndex = alarms.length - 1; // finding index of the added alarm
    deleteBtn.setAttribute('data-index', alarmIndex);

    alarmContent.appendChild(deleteBtn);

    //  remanig time text 
    let remaningTime = document.createElement('div') ;
    remaningTime.classList.add("remaning-t-div") ;

    let timeText = document.createElement('span'); // span for remaining time text
    let di2 = document.createElement('i') ;    // bell icon 
    di2.classList.add("fa-solid","fa-bell") ;
    remaningTime.appendChild(timeText);

    const remaningTimeInterval = setInterval(()=>{  // interval so that remaning time update as time passes
            timeText.textContent = calculateRemainingTime(alarm.time.hours, alarm.time.minutes,alarms[alarmIndex])
        },1000);

    remaningTime.prepend(di2) ;   // using prepend so that bell icon show in front of remaning time 
    alarmContent.appendChild(remaningTime) ;   // adding it t alarmContent

    // delete button functionality for alarm (delete alarm and clear interval)
    deleteBtn.addEventListener('click', () => {
        const indexToRemove = deleteBtn.getAttribute('data-index');
        alarms.splice(indexToRemove, 1);
        alarmContent.remove();

        clearInterval(remaningTimeInterval);  // clear "remaningTimeInterval" interval 

        checkThereIsAlarm()   // checking that there is any alaram or not 
    });

    // setting heading
    let alarmHeading = document.createElement('h3') ;
    alarmHeading.classList.add("alarm-heading") ;
    alarmHeading.innerHTML = inputBar.value.trim()!=="" ? inputBar.value : `Alarm (${alarms.length})` ; // heading according to user input or default 

    //  updating the input bar for new alarm
    inputBar.value = `Alarm (${alarms.length +1})` ;

    alarmContent.appendChild(alarmHeading) ;

    // creating days list on which alarm will get repeat

    let daysContainer2 = document.createElement('div') ;
    daysContainer2.classList.add("days-container2") ;

    const daysList = ["Su","M","Tu","We","Th","Fri","Sa"] ;

    daysList.forEach((days,index)=>{
        const dayD = document.createElement('div') ;
        dayD.classList.add("days1") ;
        dayD.innerHTML = daysList[index] ;

        if(rDayArr.find(function(ele){return ele===index;})!==undefined ){
            dayD.classList.add("active") ;
        }

        daysContainer2.appendChild(dayD) ;
    });

    alarmContent.appendChild(daysContainer2) ;

    // adding alarm content to the screen
    alarmMainContainer.appendChild(alarmContent) ;


}

function closePopup(){
    window.addEventListener('click',function(event){
        if(event.target === saveBtn ){
            modalDiv.style.display = "none";
        }
    })
}


//  fxn to calcuate remaining time 
function calculateRemainingTime(hr, mini,alarm) {
    let currentTime = new Date();
    let alarmTime = new Date();

    alarmTime.setHours(hr);
    alarmTime.setMinutes(mini);

    // Calculating the difference between alarmTime and current time
    let timeDiff = alarmTime - currentTime;

    // If the time difference is negative, it means the alarm is set for the next day
    if (timeDiff < 0) {
        timeDiff += 24 * 60 * 60 * 1000;  // Add one day in milliseconds
    }

    if(timeDiff==0){
        
        if(alarm.yess!==false){
            alarm.yess = false ;
            playAlarm() ;
            showPopup(alarm);
        }
        
    }

    // Calculate hours and minutes left
    let hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft}h ${minutesLeft}m`;
}

let alarmAudio = new Audio("/alarmAudio/alarmAudio.mp3");
//  fxn to play the alarm
function playAlarm() {
    alarmAudio.play(); // Play the alarm audio
}


//  showing alarm snooze - close popup
function showPopup(alarm){
    const popupContainer = document.createElement('div')
    popupContainer.classList.add("alarm-popup-div-container") ;

    const popupHeading = document.createElement('h3')
    popupHeading.classList.add("alarm-heading-popup") ;
    popupHeading.innerHTML = alarm.label ;
    popupContainer.appendChild(popupHeading) ;

    const alarmTimePopup = document.createElement('div')
    alarmTimePopup.classList.add("alarmTime-popup-div") ;

    let spanP1 = document.createElement('span');
    let spanP2 = document.createElement('span');
    let spanP3 = document.createElement('span');

    spanP2.innerHTML = ":" ;
    spanP1.innerHTML = (alarm.time.hours < 10) ? '0' + alarm.time.hours : alarm.time.hours;
    spanP3.innerHTML = (alarm.time.minutes < 10) ? '0' + alarm.time.minutes : alarm.time.minutes;

    alarmTimePopup.appendChild(spanP1) ;
    alarmTimePopup.appendChild(spanP2) ;
    alarmTimePopup.appendChild(spanP3) ;

    popupContainer.appendChild(alarmTimePopup) ;

    const snoozeText = document.createElement('h3');
    snoozeText.classList.add("snooze-text") ;
    snoozeText.innerHTML = "Snooze"
    popupContainer.appendChild(snoozeText) ;

    const snoozeSelect = document.createElement('select') ;
    snoozeSelect.classList.add("snooze_Select") ;

    const Option10 = document.createElement('option') ;
    Option10.value = "10 minutes";
    Option10.innerHTML = "10 minutes" ;
    snoozeSelect.appendChild(Option10) ;

    const Option15 = document.createElement('option') ;
    Option15.innerHTML = "15 minutes" ;
    Option15.value = "15 minutes";
    snoozeSelect.appendChild(Option15) ;

    const Option20 = document.createElement('option') ;
    Option20.innerHTML = "20 minutes" ;
    Option20.value = "20 minutes";
    snoozeSelect.appendChild(Option20) ;

    popupContainer.appendChild(snoozeSelect) ;


    const popupButtons = document.createElement('div') ;
    popupButtons.classList.add("alarm-popup-buttons-container") ;

    const snoozeBtn = document.createElement('button') ;
    snoozeBtn.innerHTML = "Snooze"
    snoozeBtn.classList.add("buttons") ;
    popupButtons.appendChild(snoozeBtn) ;

    const dismissBtn = document.createElement('button') ;
    dismissBtn.innerHTML = "Dismiss"
    dismissBtn.classList.add("buttons") ;
    popupButtons.appendChild(dismissBtn) ;
    dismissBtn.addEventListener('click',()=>{
        popupContainer.remove();
        alarmAudio.pause(); // Stop the alarm sound
    })

    snoozeBtn.addEventListener('click', () => {
        const snoozeTime = parseInt(snoozeSelect.value);   //selected snooze duration
        alarm.time.minutes = alarm.time.minutes + snoozeTime
        alarm.yess= true ;

        // if minutes exceed 59
        if (alarm.time.minutes >= 60) {
            alarm.time.hours += Math.floor(alarm.time.minutes  / 60);
            alarm.time.minutes = alarm.time.minutes % 60;
        }
        popupContainer.remove();
        alarmAudio.pause(); // Stop the alarm sound
    })

    popupContainer.appendChild(popupButtons) ;

    heroContainer.appendChild(popupContainer);
}


let days = document.querySelectorAll('.daysL') ;
const repeatBtn = document.getElementById("repeatbtn") ;

saveSelectedDays() ;

function saveSelectedDays(){
    let reapationStatus = false ;

    days.forEach((day,index) => {
        day.onclick = function(){
            day.classList.toggle("active");
            // console.log(index) ;
            if(day.classList.contains('active')){
                rDayArr.push(index) ;
            }
            //  removing the day if it removed by the user
            else if(day.classList.contains('active')!== true && rDayArr.find(function(ele){return ele===index;})!==undefined ){
                const idx = rDayArr.indexOf(index) ;
                if(idx!==-1){
                    rDayArr.splice(idx, 1);
                }
            }
            if(rDayArr.length){
                repeatBtn.checked  = true ;
                reapationStatus = true ;
            }
            else{
                repeatBtn.checked  = false ;
                reapationStatus = false ;
            } 
        }
    });


    //  removing active class from the days  when the checkbox is uncheck
    repeatBtn.addEventListener('change',()=>{
        if (!repeatBtn.checked) {
            cancleSelectedDays();
        }
    } );
}


function cancleSelectedDays() {
    days.forEach(day => {
        day.classList.remove("active");
    });
    rDayArr = [] ;  
    repeatBtn.checked  = false ;
}


}









































