const submitIP = document.querySelector("#submitIP");
const searchInput = document.querySelector(".searchInput");
// const searchButton = document.querySelector(".searchButton");

const ipView = document.querySelector("#ipView");
const ipLocation = document.querySelector("#ipLocation");
const ipTimeZone = document.querySelector("#ipTimeZone");
const ipISP = document.querySelector("#ipISP");

const map = document.querySelector('.map');



submitIP.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const ApiKey = 'at_EPJapjavmn5NfLSRa1CIjfIlaHFab';
    const ipAddress = searchInput.value;  // ie '109.206.63.255'

    fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${ApiKey}&ipAddress=${ipAddress}`)
    .then((res)=> res.json())
    .then((data) => {
        console.log(data);

        ipView.innerHTML = searchInput.value;
        ipLocation.innerHTML = data.location.city + ", " + data.location.country;
        ipTimeZone.innerHTML = data.location.timezone;
        ipISP.innerHTML = data.isp;

        sessionStorage.setItem("ipAddress", searchInput.value);
        sessionStorage.setItem("ipCountry", data.location.city + ", " + data.location.country);
        sessionStorage.setItem("ipTimeZone", data.location.timezone);
        sessionStorage.setItem("ipISP", data.isp);

        console.log(sessionStorage);

    })
    .catch((err)=> console.log(err.message));
    
})

window.onload = () => {
    const storedAddress = sessionStorage.getItem("ipAddress");
    const storedCountry = sessionStorage.getItem("ipCountry");
    const storedTimeZone = sessionStorage.getItem("ipTimeZone");
    const storedISP = sessionStorage.getItem("ipISP");

    ipView.innerHTML = storedAddress;
    ipLocation.innerHTML = storedCountry;
    ipTimeZone.innerHTML = storedTimeZone;
    ipISP.innerHTML = storedISP;
    
    if(ipLocation.innerHTML == ""){
        ipView.innerHTML = "192.212.174.101";
        ipLocation.innerHTML = "Brookyln, NY 10001";
        ipTimeZone.innerHTML = "UTC-05:00";
        ipISP.innerHTML = "SpaceX Starlink";
    }
}



