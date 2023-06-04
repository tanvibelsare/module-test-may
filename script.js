const submitbtn=document.getElementById("submit")
const form=document.getElementById("search-form")
const api_key="kXhwEsK4CBJofveIigOJvJXCwuyM8nF52JNxAwO2"
 function getCurrentImageOfTheDay(){
     //getting current date 
    let currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate)
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        // Get the image URL from the API response
        const imageUrl = data.hdurl;
    
        // Update the image source in the ui
        const imageElement = document.getElementById('image');
        imageElement.src = imageUrl;
        //update explanation in ui
        document.getElementById("title").innerHTML=data.title
        document.getElementById("explanation").innerHTML=data.explanation
       
    })
}
getCurrentImageOfTheDay()
function getImageOfTheDay(date){
    console.log("hello")
    // document.getElementById("current-image-container").innerHTML=""
    const imageElement=document.getElementById("image");
    const explanation=document.getElementById("explanation");
    // imageElement=""
    // explanation=""
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        // Get the image URL from the API response
        const imageUrl = data.hdurl;
    
        // Update the image source in the UI
        const imageElement = document.getElementById('image');
        imageElement.src = imageUrl;
        document.getElementById("title").innerHTML=data.title
        explanation.innerHTML=data.explanation
        // localStorage.setItem("selectedDate", date);
        saveSearch(date)
        // Show the date in the search history
        var searchHistory = document.getElementById("search-history");
        var listItem = document.createElement("li");
        listItem.textContent = date;
        searchHistory.appendChild(listItem);
    })
}
// Event listener for the form submission
var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var selectedDate = document.getElementById("search-input").value;
  getImageOfTheDay(selectedDate);
});
function saveSearch(date){
    let dates=[];
    dates.push(date)
    localStorage.setItem("selectedDate", JSON.stringify(dates));

}