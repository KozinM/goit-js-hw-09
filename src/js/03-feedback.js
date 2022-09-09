//importing library for throttle 
import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector(".feedback-form"),
    mail: document.querySelector("[type=email]"),
    message: document.querySelector("[name=message]"),
}

//initializing variable for saving form's data
let formData = {};

//initializing form in case of reload or something
formLoad();

//adding event listiner for input handling
refs.form.addEventListener('input', throttle(formInputHandler, 500));

//adding event listiner for submit handling
refs.form.addEventListener('submit', formSubmitHandler);



//defining function for form initializing
function formLoad()
{
    let fromStorageData = localStorage.getItem("feedback-form-state");
    if(fromStorageData) {
       fromStorageData = JSON.parse(fromStorageData);
       Object.entries(fromStorageData).forEach(([name,value])=>{
        formData[name]=value;
        refs.form.elements[name].value = value;});
    }
    /* console.log("form load: " + localStorage.getItem("feedback-form-state"));
    refs.mail.value = JSON.parse(localStorage.getItem("feedback-form-state")).email;
    refs.message.value = JSON.parse(localStorage.getItem("feedback-form-state")).message; */
    /* refs.mail.value = */
};

//defining input handler
function formInputHandler (event) {

    //console.log(event.target.name);

    formData[event.target.name] = event.target.value;

    const stringifiedData = JSON.stringify(formData);

    localStorage.setItem("feedback-form-state", stringifiedData);
}

//defining submit handler
function formSubmitHandler(event) {

    event.preventDefault();
    
    formData = {};

    console.log("output to console"+localStorage.getItem("feedback-form-state"));

    localStorage.removeItem("feedback-form-state");

    refs.form.reset();
    
}