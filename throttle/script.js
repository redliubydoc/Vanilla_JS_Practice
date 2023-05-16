function throttle(fn, delay) { 
    let wait;

    return function(...args) {

        if (wait) {
            return;
        }

        fn.call(this, ...args);
        wait = true;
        setTimeout(function() {wait = false;}, delay);
    };
}

const delay = 1000;
const button = document.querySelector("#btn");

button.addEventListener("click", throttle(function(event) {
    console.log("button clicked");
}, delay));