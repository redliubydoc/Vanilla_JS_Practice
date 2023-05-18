function throttle(fn, delay) {
    let timer;
    let then;

    return function(...args) {
        const context = this;

        if (then) {
            clearTimeout(timer);

            timer = setTimeout(function() { // wait if required
                fn.call(context, ...args);
                then = Date.now();
            }, Math.max(0, delay - (Date.now() - then)));
        }
        else { // special case only very first time
            fn.call(context, ...args);
            then = Date.now();
        }
    } 
}

function debounce(fn, delay) {
    let timeout;

    // this is the callback that will be passed as event handler
    return function(...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            fn.call(context, ...args);
        }, delay);
    };
}

const input = document.querySelector("#item-1");
const item2 = document.querySelector("#item-2");
const item3 = document.querySelector("#item-3");
const item4 = document.querySelector("#item-4");
const delay = 1000;

input.addEventListener("keyup", function(event) {
    item2.innerText = `Keyups E : ${event.target.value}`;
});

input.addEventListener("keyup", debounce(function(event) {
    item3.innerText = `Debounce : ${event.target.value}`;
}, delay));

input.addEventListener("keyup", throttle(function(event) {
    item4.innerText = `Throttle : ${event.target.value}`;
}, delay));
