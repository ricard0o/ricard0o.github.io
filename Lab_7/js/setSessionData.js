const main = document.getElementById("main");

function getBusRoute() {
  let busRoute = document.getElementById("busroute").value; // Your code here

  if ((typeof busRoute !== "undefined") & (busRoute !== "")) {
    let busRouteURL = "https://api.umd.io/v0/bus/routes/" + busRoute; // Your code here
    console.log(busRouteURL);

    fetch(busRouteURL)
      .then((response) => {
        return response.json();
      })
      .then((route) => {
        // YOUR CODE HERE
        sessionStorage.setItem("title", route.title);   
        sessionStorage.setItem("latMax", route.lat_max); 
        sessionStorage.setItem("latMin", route.lat_min);
        sessionStorage.setItem("lonMax", route.lon_max);
        sessionStorage.setItem("lonMin", route.lon_min);
      })
      .catch((err) => {
        console.log(err);
        main.innerHTML = "Invalid bus route";
      });
  } else {
    main.innerHTML = "No value provided";
    sessionStorage.setItem("title", "Nothing Set");
    sessionStorage.setItem("latMax", "Nothing set"); 
    sessionStorage.setItem("latMin", "Nothing set");
    sessionStorage.setItem("lonMax", "Nothing set");
    sessionStorage.setItem("lonMin", "Nothing set");
  }
}
