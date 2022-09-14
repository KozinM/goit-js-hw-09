//library conection
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


//variables initialization for document elements and other purposes
const refs = {
    "dateInput": document.querySelector("#datetime-picker"),
    "startBtn" : document.querySelector("[data-start]"),
    "dataDays": document.querySelector("[data-days]"),
    "dataHours": document.querySelector("[data-hours]"),
    "dataMinutes": document.querySelector("[data-minutes]"),
    "dataSeconds": document.querySelector("[data-seconds]"),
    "flatOptions": {
    enableTime: true,
    time_24hr: true,

    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  }};

  //disabling start button
  refs.startBtn.disabled = true;

  //creating variable for timer
  let choosenTime;

  //console.log(addLeadingZero(4));

  //console.log(refs.startBtn);

  //creating flatpickr instance
  const flatpickrInstance = flatpickr(refs.dateInput, refs.flatOptions);
  flatpickrInstance.clear();
  flatpickrInstance.config.onClose.push(function (selectedDates) { 
    if (selectedDates[0]<=Date.now()) {return window.alert("Pick up date in the future!");}
        else {
          console.log("I'm here:"+(selectedDates[0]-Date.now()));
          choosenTime = selectedDates[0];
          refs.startBtn.disabled = false;
          
        }});
 
  refs.startBtn.addEventListener('click', clickOnStartBtnHandler);
        
  
  //creating timer object
  const timer = {
    intervalId: null,
    isActive: false,
  
    start() {
      if (this.isActive) {
        return;
      }
      const startPoint = choosenTime;
      this.isActive = true;
  
      
      const currentTime = Date.now();
      
      console.log("I've started"+"current time: "+ currentTime + "  start point: " + startPoint + "  and minus" + (startPoint-currentTime));

      while (currentTime<startPoint)
      {
        console.log("I'm doing things!!");
        textTimerUpdate(convertMs(currentTime-startPoint));
      }

      this.isActive = false;
        textTimerUpdate(convertMs(0));
        return;
    },
  };


  //defining handler for clicks on the start button
  
  function clickOnStartBtnHandler() {
      console.log("And here");
      timer.start();
  }



  //definition of the function for calculating a difference between dates in time
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  

  //defining function for time to be from 4 to 04
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  //defining function for text timer update
  function textTimerUpdate ({ days, hours, minutes, seconds }) {
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
  }



  //function convertMs examples
  //console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  //console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  //console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}