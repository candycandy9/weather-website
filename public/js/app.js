console.log("Client side javascript file loaded");

const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const forecastData = document.getElementById('message-2');


messageOne.textContent = "Loading ....";
forecastData.textContent = " ";
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent = "Loading ....";
    forecastData.textContent = " ";
    fetch(`/weather?address=${searchText.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.placeName
                forecastData.textContent = data.forecast;
            }
        })
    })
})