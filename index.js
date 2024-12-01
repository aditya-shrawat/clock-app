

async function handleDynamicContent(clickedNavText){
    const dynamicMainContent = document.getElementById("dynamicMainContent") ;
    const existingScript = document.getElementById("dynamicScript");

    if (existingScript) {
        existingScript.remove(); // Remove any previously added script
    }
    try {
       
        if(clickedNavText === "Live Clock"){
            const response = await fetch("/liveClock/liveClock.html")
            const data = await response.text() ;

            dynamicMainContent.innerHTML = data;

            const script = document.createElement("script");
            script.id = "dynamicScript";
            script.src = "/liveClock/liveClock.js";
            script.onload = () => console.log("Script loaded successfully");
            script.onerror = ()=> console.log("error on loading dynamic script")
            document.body.appendChild(script);
        }
        else if(clickedNavText === "Timer"){
            const response = await fetch("/timer/timer.html")
            const data = await response.text() ;

            dynamicMainContent.innerHTML = data;

            const script = document.createElement("script");
            script.id = "dynamicScript";
            script.src = "/timer/timer.js";
            script.onload = () => console.log("Script loaded successfully");
            script.onerror = ()=> console.log("error on loading dynamic script")
            document.body.appendChild(script);
        }
        else if(clickedNavText === "Alarm"){
            const response = await fetch("/alarm/alarm.html")
            const data = await response.text() ;

            dynamicMainContent.innerHTML = data;

            const script = document.createElement("script");
            script.id = "dynamicScript";
            script.src = "/alarm/alarm.js";
            script.onload = () => console.log("Script loaded successfully");
            script.onerror = ()=> console.log("error on loading dynamic script")
            document.body.appendChild(script);
        }
        else if(clickedNavText === "Stopwatch"){
            const response = await fetch("/stopWatch/stopWatch.html")
            const data = await response.text() ;

            dynamicMainContent.innerHTML = data;

            const script = document.createElement("script");
            script.id = "dynamicScript";
            script.src = "/stopWatch/stopWatch.js";
            script.onload = () => console.log("Script loaded successfully");
            script.onerror = ()=> console.log("error on loading dynamic script")
            document.body.appendChild(script);
        }
        
    } catch (error) {
        console.log("error = ",error)
    }
}


document.addEventListener("DOMContentLoaded", function() {
    handleDynamicContent("Live Clock") ;
    const navList = document.getElementsByClassName("nav-items-list")[0] ;
    const navItems = document.querySelectorAll(".nav-items") ;

    navItems.forEach(item => {
        item.addEventListener('click',(e)=>{
            navItems.forEach((nav) => nav.classList.remove("active"));

            const clickedItem = e.currentTarget;  // index of nav item
            const clickedNavText = clickedItem.textContent.trim();
            console.log("item clicked = ",clickedNavText)

            item.classList.add("active") ;
            handleDynamicContent(clickedNavText) ;
        }) 
    });
}); 


