function debounce(fn, delay) {
    let timeout;

    // this is the callback that will be passed as event handler
    return function(...args) {
        let context = this;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            fn.call(context, ...args);
        }, delay);
    };
}

const delay = 1000;

const performanceData = {
    keyupCount: 0,
    debounceCount: 0,
    searchString: ""
};

const inputCountry = document.querySelector("#input-country");
const dropdownCountry = document.querySelector("#dropdown-country");


function populateDropdown(countries) {

    // clear dropdown
    while (dropdownCountry.firstChild){
        dropdownCountry.removeChild(dropdownCountry.firstChild);
    }

    // populate dropdown
    for (let country of countries) {
      
        element = document.createElement("li");
        element.setAttribute("data-code", country.code);
        element.setAttribute("data-name", country.name);
        element.innerText = country.name;

        dropdownCountry.appendChild(element);
    }
}

function toggleDropdown() {
    inputCountry.toggleAttribute("readonly");
    dropdownCountry.toggleAttribute("hidden");
}

function predictiveSearch(searchString) {
    let result = [];

    for (let country of countries) {
        if (country.name.toLowerCase().startsWith(searchString.toLowerCase())) {
            result.push(country);
        }
    }
    return result;
}

function updatePerformanceData(reset) {

    const nKeyups = document.querySelector("#n-keyups");
    const nDebounce = document.querySelector("#n-debounce");
    const strDebounce = document.querySelector("#str-debounce");

    // reset
    if (reset) {
        performanceData.keyupCount = 0;
        performanceData.debounceCount = 0;
        performanceData.searchString = "";
    }

    nKeyups.innerText = performanceData.keyupCount;
    nDebounce.innerText = performanceData.debounceCount;
    strDebounce.value = performanceData.searchString;
}

/* keyups */ 
inputCountry.addEventListener("keyup", function(event) {
    console.log("keyup ::", event.target.value);
    ++performanceData.keyupCount;
    updatePerformanceData();
});

/* debounce */
inputCountry.addEventListener("keyup", debounce(function(event) {
    searchString = event.target.value.trim();

    if (searchString) {
        
        populateDropdown(predictiveSearch(searchString));

        performanceData.searchString = searchString;
        ++performanceData.debounceCount;
        updatePerformanceData();
    }
}, delay));

/* on clicking input field make it editable and show the dropdown */
inputCountry.addEventListener("click", function(event) {

    // reset
    event.target.value = "";

    populateDropdown(countries);
    toggleDropdown();

    updatePerformanceData(true);
});

/* on clicking any option in dropdown populate input field with it's value and close the dropdown */
dropdownCountry.addEventListener("click", function(event) {
    inputCountry.value = event.target.getAttribute("data-name");
    toggleDropdown();
});





