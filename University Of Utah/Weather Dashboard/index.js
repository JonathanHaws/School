
function getWeatherFor(city,root,apikey){
    
    root.empty(); // clear div then dynamically generate new HTML below 

    // first fetch is for converting city to geo cordinates (lon, lat) second fetch retrives current weather, third retrives forecast (5 days, 3 Hour Increments)
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apikey).then((cities)=>cities.json()).then(function(cities){ 
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+cities[0].lat+"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((weather)=>weather.json()).then(function(weather){     
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+cities[0].lat +"&lon="+cities[0].lon+"&units=imperial&appid="+apikey).then((forecast)=>forecast.json()) .then(function(forecast){ 

            //console.log(weather); // data retrived from fetch
            //console.log(forecast);  
               
            var history = JSON.parse(localStorage.getItem("history")); // search history
            if (history == null) { history = { searches:[] }; } // if no search history exists create json base
            history.searches.splice(0,0,weather.name); // insert new city at start of search historys
            if (history.searches.length > 5){ history.searches.length = 5;} // limit array to have 5 entries at the max
            history.searches = new Set(history.searches); history.searches = Array.from(history.searches) // converting array to set datatype and the back to array removes duplicates
            localStorage.setItem("history",JSON.stringify(history));
            var searches = $("<section>").appendTo(root); // generate search history html
            searches.css({"border-radius":"6px 6px 0px 0px"});
            for(var i=0;i<history.searches.length;i++){   
                $("<button>").html(history.searches[i]).appendTo(searches).on("click",function(){ getWeatherFor($(this).text(),root,apikey)});
            }

            var cityname = $("<section>").appendTo(root); // current weather html
            cityname.css({"border-radius":"0px","background-color":"var(--color1)"});
            $("<h2>").text(weather.name).css({color:"var(--color2)"}).appendTo(cityname); 
            var current = $("<section>",{style: "border-radius:0px"}).appendTo(root);  
            $("<img>").attr("src","http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png").appendTo(current); 
            $("<h3>").text("Date: " + new Date().toLocaleDateString()).appendTo(current); 
            $("<h3>").text("Temprature: " + weather.main.temp + "°").appendTo(current); 
            $("<h3>").text("Wind Speed: " + weather.wind.speed + " MPH").appendTo(current); 
            $("<h3>").text("Humidity: " + weather.main.humidity + "%").appendTo(current);

            function createDay$(day){ // forecast html
                var div = $("<div>",{style: "background-color: var(--color2); padding:10px; border-radius:6px"});
                $("<img>").attr("src","http://openweathermap.org/img/wn/"+forecast.list[day].weather[0].icon+"@2x.png").appendTo(div); 
                $("<h3>").text(forecast.list[day].dt_txt.substr(5,6)).appendTo(div); 
                $("<h3>").text(forecast.list[day].main.temp + "°").appendTo(div); 
                $("<h3>").text(Math.trunc(forecast.list[day].wind.speed) + " MPH").appendTo(div); 
                $("<h3>").text(forecast.list[day].main.humidity + "%").appendTo(div); 
                return div;
            }
            var upcoming = $("<section>",{ width:"100px",style:"display:flex; justify-content:space-evenly; padding:10px 0px 10px 0px;"}).appendTo(root); 
            upcoming.css({"border-radius":"0px 0px 6px 6px","background-image":"linear-gradient(to top, var(--color4), var(--color1)"});
            createDay$(4).appendTo(upcoming);
            createDay$(12).appendTo(upcoming);
            createDay$(20).appendTo(upcoming);
            createDay$(28).appendTo(upcoming);
            createDay$(36).appendTo(upcoming);   

    })})}) // fetches are nested so code doesn't excecute until they are all complete
}

// load last city in local storage or load default city
var defaultcity = JSON.parse(localStorage.getItem("history"))
if (defaultcity==null) { defaultcity = "Salt Lake City"; } else { defaultcity = defaultcity.searches[0];}
getWeatherFor(defaultcity,$("#dynamic"),"b02be164d047cfbed86694527d1d3a92");

// search bar functionality
$("button").on("click",function() {
    getWeatherFor($("input").val(),$("#dynamic"),"b02be164d047cfbed86694527d1d3a92");
    console.log($("input").val());
  });
