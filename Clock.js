let timeFormatTag= document.getElementById('time_format');
let currentTimeTag= document.querySelector('h1');
let setBtn= document.getElementById('set');
let cancelBtn= document.getElementById('cancel');
let alarmFormat= document.getElementById('alarm_time_format');
let alarmList= document.getElementsByClassName('alarm_list');
let alarmsArray=[];
var sound = new Audio("./morning_alarm.mp3");
		    sound.loop = true;

// display clock
document.addEventListener('DOMContentLoaded',()=>{
    alarmList[0].firstElementChild.style.visibility='hidden';
    showTime();
    setInterval(showTime, 1000);
});

function showTime(){
    let date= new Date();
    let hours= date.getHours();
    let minutes= date.getMinutes();
    let seconds= date.getSeconds();
    //console.log(`hours: ${hours} minutes:${minutes} seconds:${seconds}`);
    //timeFormatTag.textContent='PM';
    if(hours> 12){
        hours= hours-12;
        timeFormatTag.textContent='PM';
    }
    
    if(hours<10){
        hours= '0'+hours;
    }
    if(minutes<10){
        minutes='0'+ minutes;
    }
    if(seconds<10){
        seconds='0'+ seconds;
    }
    currentTimeTag.textContent=`${hours}:${minutes}:${seconds}`;
    
}  

//setting alarm

setBtn.addEventListener('click', setAlarm);
cancelBtn.addEventListener('click', resetInput);

function setAlarm(){
    let inputText= document.querySelector('input');
    //adding alarm in the list and make alarm tag visible
    let divTag= document.createElement('div');
    divTag.classList.add('alarm_contents');
    let span= document.createElement('span');
    span.textContent= inputText.value+ " " + alarmFormat.value;
    alarmsArray.push(inputText.value+ "_" + alarmFormat.value);
    divTag.classList.add(inputText.value+ "_" + alarmFormat.value);
    let cancelBtn= document.createElement('button');
    cancelBtn.textContent='Cancel';
    cancelBtn.addEventListener('click', (event)=>{removeAlarm(event)});
    // <i class="fa-solid fa-bell" style="color: bisque;"></i>
    let bellIcon= document.createElement('i');
    bellIcon.classList.add('fa-solid');
    bellIcon.classList.add('fa-bell');
    bellIcon.style.color='bisque';
    bellIcon.style.visibility='hidden';
    divTag.appendChild(span);
    divTag.appendChild(bellIcon);
    divTag.appendChild(cancelBtn);
    alarmList[0].appendChild(divTag);
    alarmList[0].firstElementChild.style.visibility='visible';
    //console.log("Alarms array: "+ alarmsArray);
}

function resetInput(){
    document.querySelector('input').value="";
}

function removeAlarm(divTag){
    //console.log(divTag.target.parentNode.children[1]);

    if(divTag.target.parentNode.children[1].style.visibility==='visible'){
        //if bell icon visible then alarm is ringing
        //console.log('Alarm is ringing');
        sound.pause();
        alert("Alarm is stopped now....");
    }
    else{
        //console.log('Alarm is not ringing');
    }

    let alarmToRemove= divTag.target.parentNode.firstElementChild.textContent;
    alarmToRemove= alarmToRemove.toString().replace(" ", "_");
    //console.log(alarmToRemove);
    let newAlarmsArr=[];
    alarmsArray.forEach(a =>{
        if(a!==alarmToRemove){
            newAlarmsArr.push(a);
        }
    });
    alarmsArray= newAlarmsArr;
    //console.log(alarmsArray);

    divTag.target.parentNode.remove();

    
    let alarmList= document.getElementsByClassName('alarm_list');
    //console.log(alarmList[0].children.length);
    if(alarmList[0].children.length==1){
        alarmList[0].firstElementChild.style.visibility='hidden';
    }
    
    
}


//check for any alarm set
setInterval(checkAlarm, 1000);

function checkAlarm(){

    let currentTime= currentTimeTag.textContent+ "_"+ timeFormatTag.textContent;
    //console.log(currentTime);
    alarmsArray.forEach(a=>{
        if(a === currentTime){
            //console.log("Time matched");
            let alarmTag= document.getElementsByClassName(a);
            //console.log(alarmTag[0]);
            //console.log(alarmTag[0].children[1]);
            alarmTag[0].children[1].style.visibility='visible';
            alarmTag[0].children[2].style.backgroundColor= 'red';
            sound.play();

        }
    });
}