//library conection
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

//variables initialization for document elements and other purposes
const refs = {
    "dateInput": document.querySelector("#datetime-picker"),
    "flatOptions": {
    enableTime: true,
    time_24hr: true,

    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  }};

  //creating flatpickr instance
  const flatpickrInstance = flatpickr(refs.dateInput, refs.flatOptions);