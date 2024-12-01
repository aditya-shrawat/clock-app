
{

let hrs = document.getElementById("hours") ;
let min = document.getElementById("minitus") ;
let sec = document.getElementById("seconds") ;

let date = document.getElementById("date") ;
let month = document.getElementById("month") ;
let year = document.getElementById("year") ;

let statusT = document.getElementById("status") ;  // am-pm

// just setting live clock
const updateClock = ()=>{
    setInterval(()=>{
        let currentData = new Date() ;
    
        let newHr = currentData.getHours();
        let newMin = currentData.getMinutes();
        let newSec = currentData.getSeconds();
    
        let newStatus = newHr >= 12 ? 'pm' : 'am';
        statusT.innerHTML = newStatus ;
    
        newHr = newHr % 12 ;
    
        hrs.innerHTML = (newHr<10)? '0'+newHr : newHr ;
        min.innerHTML = (newMin<10)? '0'+newMin : newMin ;
        sec.innerHTML = (newSec<10)? '0'+newSec : newSec ;
    
        let newDate = currentData.getDate();
        let newMonth = currentData.getMonth()+1;
        let newYear = currentData.getFullYear();
    
        date.innerHTML = (newDate<10)? '0'+newDate : newDate ;
        month.innerHTML = (newMonth<10)? '0'+newMonth : newMonth ;
        year.innerHTML = newYear ;
    
    },1000);
}


updateClock() ;

}





























