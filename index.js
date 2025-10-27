
const Sec_0 = document.querySelector('.Sec-0');
const Sec_1 = document.querySelector('.Sec-1');
const Sec_2 = document.querySelector('.Sec-2');
const Sec_3 = document.querySelector('.Sec-3');
const Sec_Access = document.querySelector('.Sec-access');
const Sec_1_rep = document.querySelector('.Sec-1-rep');
const Not_Found = document.querySelector('.Not-Found');
const Search_Bar = document.querySelector('#Search-Bar');
const access_btn = document.querySelector('.access-btn');
let Loaded1 = false;
let Loaded2 = false;
let fetched = null;

async function fetchUserWeather() {
  Loaded1 = false;
  Sec_1.classList.remove("hidden");
  Sec_2.classList.add("hidden");

   if(Loaded1 == false){
Sec_0.classList.remove("hidden")
Sec_1.classList.add("hidden");
}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

     
      const Response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d0763e27bb9d4b61851fa606d164c86`
      );
  
      const R1 = await Response1.json();
      fetched = R1;
      UpdateData(R1 , Sec_1);
      Loaded1 = true;
      if(Loaded1 == true){
    Sec_1.classList.remove("hidden")
   Sec_0.classList.add("hidden");
       }
    },
    (error) => {
      console.error("Geolocation failed:", error);
    });
  } else {
    console.error("Geolocation not supported in this browser.");
  }
    
}







async function fetchUserWeather2() {
 Loaded2 =false;
 Not_Found.classList.add("hidden");
     if(Loaded2 == false){
Sec_3.classList.remove("hidden")
Sec_1_rep.classList.add("hidden");
}
try{

  let cityName = Search_Bar.value;
   const Response3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7d0763e27bb9d4b61851fa606d164c86`)
   const R3 = await Response3.json();
   
   UpdateData(R3 , Sec_1_rep);
   Loaded2 =true;
     if(Loaded2 == true){
Sec_3.classList.add("hidden")
// Sec_1_rep.classList.add("hidden");
}
  Sec_1_rep.classList.remove("hidden");
  Search_Bar.value = null;
}
catch(err){
  Loaded2 =true;
       if(Loaded2 == true){
Sec_3.classList.add("hidden")
// Sec_1_rep.classList.add("hidden");
}
 Not_Found.classList.remove("hidden");
Sec_1_rep.classList.add("hidden");
}
}




function UpdateData(object1 , section ){
const City_Name = section.querySelector('.City-Name');
const Main_Weather = section.querySelector('.Main-Weather');
const Temperature = section.querySelector('.Temp');
const Humidity = section.querySelector('.Humidity');
const Clouds = section.querySelector('.Clouds');
const Windspeed = section.querySelector('.Windspeed');
const Flag = section.querySelector('.Flag');
const Weather_Image = section.querySelector('.Weather-Info-Image');


const countryCode = object1.sys.country;  
Flag.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
City_Name.textContent = `${object1.name}`;

 const iconCode = object1.weather[0].icon;
  Weather_Image.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;  

const weatherMain = object1.weather[0].main;
Main_Weather.textContent = `${weatherMain}`;

const tempK = object1.main.temp; 
const tempC = (tempK - 273.15).toFixed(1);
Temperature.textContent = `${tempC} °C`;

const windSpeed = object1.wind.speed;     
const humidity = object1.main.humidity;   
const cloud = object1.clouds.all;         

Humidity.textContent= `${humidity}%`;
Clouds.textContent = `${cloud}%`;
Windspeed.textContent= `${windSpeed}m/s`;


}


fetchUserWeather();

const btn_1 = document.querySelector('.btn-1');
const btn_2 = document.querySelector('.btn-2');
const btn_3 = document.querySelector('.Search-btn');


btn_2.addEventListener('click' , function(){
  btn_2.classList.add("bg-[#00000056]");
    btn_1.classList.remove("bg-[#00000056]" );
   Sec_0.classList.add("hidden");
   Sec_1.classList.add("hidden");
   Sec_2.classList.remove("hidden");
   Sec_1_rep.classList.add("hidden");
   Not_Found.classList.add("hidden");
});
btn_3.addEventListener('click' , fetchUserWeather2);
Search_Bar.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        btn_3.click();        
    }
});

btn_1.addEventListener('click' , fetchUserWeather);
btn_1.addEventListener('click' , function(){
 btn_2.classList.remove("bg-[#00000056]" );
    btn_1.classList.add("bg-[#00000056]" );
});




