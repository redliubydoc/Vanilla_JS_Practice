const inputSome = document.getElementById("input-some");
const txtNormal = document.getElementById("txt-normal");
const txtThrottle = document.getElementById("txt-throttle");
const txtDebounce = document.getElementById("txt-debounce");


const updateThrottle = throttle((text) => txtThrottle.innerText = text);
const updateDebounce = debounce((text) => txtDebounce.innerText = text, 1000);
const updateNormal = (text) => txtNormal.innerText = text;


inputSome.addEventListener("keyup", (e) => {
    
    updateNormal(e.target.value);

    updateThrottle(e.target.value);    

    updateDebounce(e.target.value);
});

/*  
    ** https://nimblewebdeveloper.com/blog/understand-event-throttling
    ** Throttling our event handler involves creating a function to wrap our event handler 
    ** and only allow it to be invoked once per some time period. 
    ** To achieve this we need our function to execute on both the leading and trailing edge of our throttle period
*/
 
function throttle(callback, delay = 1000) {

    let shouldWait = false;
    let waitingArgs = null;

    const timeoutFunc = () => {

        // if no process request came during the seeping period
        // then be awake till the next process request comes
        if (waitingArgs === null) {
            shouldWait = false; // i am awake
        }
        else { // otherwise process the latest process request in the sleeping priod and again go to sleep for the given delay

            callback(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay); // 
        }
    };

    return (...args) => {
        
        if (shouldWait) {  // sleeping

            waitingArgs = args; // remember process request => effectively the latest in the sleeping priod
            return;
        }

        callback(...args); // process
        shouldWait = true; // i am sleeping

        setTimeout(timeoutFunc, delay); // wake me up after given delay
    }
}

function debounce(callback, delay = 1000) {

    let timer = null;

    return (...args) => {

        // reset timer
        if (timer !== null) clearTimeout(timer);

        timer = setTimeout(() => callback(...args), delay);
    }
}
