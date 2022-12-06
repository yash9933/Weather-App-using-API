let weather = {
    fetchWeatherLatLong: function(latitude,longitude){
        var apiUrl = "https://weatherdbi.herokuapp.com/data/weather/"+latitude+","+longitude;
        console.log(apiUrl)
        fetch(apiUrl)
        .then(res=>res.json())
        .then(data=>this.displayWeather(data))
    },
    fetchWeather: function (city){
            var apiUrl = "https://weatherdbi.herokuapp.com/data/weather/" + city;
            console.log(apiUrl)
            fetch(apiUrl)
            .then(res=>res.json())
            .then(data=>this.displayWeather(data))
    },
    displayWeather: function(data){
        if(data.status==="fail"){
            console.log(data.message)
            alert("Invalid Location, Please Try Again!")
        }else{
            const{region} = data;
            var{dayhour, precip, humidity, iconURL, comment} = data.currentConditions;
            var{c,f} = data.currentConditions.temp;
            const{km,mile} = data.currentConditions.wind;
            const{next_days} = data;
            var{day, iconURL} = data.next_days[0];
            var{day, iconURL} = data.next_days[1];
            var{day, iconURL} = data.next_days[2];
            var{day, iconURL} = data.next_days[3];
            var{day, iconURL} = data.next_days[4];
            var{day, iconURL} = data.next_days[5];
            var{day, iconURL} = data.next_days[6];
            var{day, iconURL} = data.next_days[7];
            var{c, f} = data.next_days[0].max_temp;
            
            console.log(region, precip, humidity, iconURL, dayhour, c,f, km, mile);
            document.querySelector('#imgg').src=iconURL
            document.querySelector('#cel').innerText=c
            document.querySelector('#far').innerText=" | "+f
            document.querySelector('#place').innerText=region
            document.querySelector('#dateTime').innerText=dayhour
            document.querySelector('#desc').innerText=comment
            document.querySelector('#wind').innerText="Wind: "+km+"km/h | "+mile+"m/h"
            document.querySelector('#precipitation').innerText="Precipitation: "+precip
            document.querySelector('#humidity').innerText="Humidity: "+humidity
            
            document.querySelector('#day1').innerText=next_days[0].day
            document.querySelector('#img1').src= next_days[0].iconURL
            document.querySelector('#day2').innerText=next_days[1].day
            document.querySelector('#img2').src= next_days[1].iconURL
            document.querySelector('#day3').innerText=next_days[2].day
            document.querySelector('#img3').src= next_days[2].iconURL
            document.querySelector('#day4').innerText=next_days[3].day
            document.querySelector('#img4').src= next_days[3].iconURL
            document.querySelector('#day5').innerText=next_days[4].day
            document.querySelector('#img5').src= next_days[4].iconURL
            document.querySelector('#day6').innerText=next_days[5].day
            document.querySelector('#img6').src= next_days[5].iconURL
            document.querySelector('#day7').innerText=next_days[6].day
            document.querySelector('#img7').src= next_days[6].iconURL
            document.querySelector('#day8').innerText=next_days[7].day
            document.querySelector('#img8').src= next_days[7].iconURL
        }
        },
        search: function(){
            this.fetchWeather(document.querySelector('#loc1').value)
    }
}

function geoFindMe() {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        weather.fetchWeatherLatLong(latitude, longitude)
        console.log(latitude, longitude);
    }
    
    function error() {
        console.log("Location not available");
    }
    
    if (!navigator.geolocation) {
        console.log("Location not available");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
window.onload= function(){    
    let input = document.getElementById("loc1")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("submit").click();
        }
    })
}