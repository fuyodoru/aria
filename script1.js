const terminal =
document.getElementById("terminal");

function sleep(ms){
return new Promise(resolve =>
setTimeout(resolve,ms));
}

/* ---------- STARS ---------- */

(function createStars(){


const stars =
document.getElementById("stars");

for(let i=0;i<120;i++){

    const star =
    document.createElement("div");

    star.className = "star";

    star.style.left =
    Math.random()*100 + "%";

    star.style.top =
    Math.random()*100 + "%";

    star.style.animationDuration =
    (2 + Math.random()*5) + "s";

    stars.appendChild(star);
}


})();

/* ---------- AUDIO ---------- */

function startDrone(){


const ctx =
new (window.AudioContext ||
window.webkitAudioContext)();

const osc1 =
ctx.createOscillator();

const osc2 =
ctx.createOscillator();

const gain =
ctx.createGain();

osc1.type = "sine";
osc2.type = "sine";

osc1.frequency.value = 58;
osc2.frequency.value = 117;

gain.gain.value = 0.01;

osc1.connect(gain);
osc2.connect(gain);

gain.connect(ctx.destination);

osc1.start();
osc2.start();


}

document.addEventListener(
"keydown",
()=>{
if(window.audioStarted) return;


startDrone();
window.audioStarted = true;


},
{once:true}
);

/* ---------- TERMINAL ---------- */

function scrollToBottom(){


window.scrollTo({
    top:document.body.scrollHeight,
    behavior:"smooth"
});


}

async function type(text,speed=25){


for(const char of text){

    terminal.innerHTML += char;

    await sleep(speed);
}

terminal.innerHTML += "\n";

scrollToBottom();


}

function corrupt(text){


const symbols =
"!@#$%^&*?";

const index =
Math.floor(
    Math.random()*text.length
);

return (
    text.slice(0,index) +
    symbols[
        Math.floor(
        Math.random()*symbols.length
        )
    ] +
    text.slice(index+1)
);


}

async function boot(){


await sleep(1200);

await type("SIGNAL ACQUIRED");

await sleep(900);

await type(
"RECONSTRUCTION PROTOCOL INITIATED"
);

await sleep(1500);

terminal.innerHTML +=
`<div class="archive-title glitch"
data-text="ARCHIVE 17">
ARCHIVE 17
</div>`;

scrollToBottom();

await sleep(1500);

await type(
"Access request received."
);

await sleep(700);

await type(
corrupt(
"Verifying credentials..."
)
);

await sleep(1000);

await type(
"Verifying credentials..."
);

await sleep(600);

await type(
"Credentials not found."
);

await sleep(1000);

await type("");
await type(
"Proceed anyway? [Y/N]"
);

waitForY();

}

function waitForY() {

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";
    terminal.appendChild(cursor);

    const button = document.createElement("button");
    button.textContent = "[ Y ]";
    button.className = "terminal-button";

    terminal.appendChild(document.createElement("br"));
    terminal.appendChild(button);

    function proceed() {

        cursor.remove();
        button.remove();

        document.removeEventListener(
            "keydown",
            keyboardListener
        );

        continueBoot();
    }

    function keyboardListener(e) {

        if (e.key.toLowerCase() === "y") {
            proceed();
        }

    }

    document.addEventListener(
        "keydown",
        keyboardListener
    );

    button.addEventListener(
        "click",
        proceed
    );

}

async function continueBoot(){

terminal.innerHTML += "Y\n";

await sleep(3500);

await type(
"Request accepted."
);

await type(
"Archive contains incomplete records."
);

await sleep(1000);

await type(
"Some conclusions may be unreliable."
);

await sleep(1200);

await type("");
await type(
"Subject classification status:"
);

await sleep(600);

await type(
"UNRESOLVED"
);

await sleep(1800);

await type("");
await type(
"Recovering fragments..."
);

await sleep(800);

await type(
"Searching observations..."
);

await sleep(800);

await type(
"Reconstructing subject..."
);

await sleep(1000);

await type(
"Classification impossible."
);

await sleep(1500);

await type(
"Continuing anyway."
);

await sleep(1500);

await type(
"Opening records..."
);

await sleep(2500);

document.body.style.opacity = "0";

await sleep(2000);

window.location.href = "public_record.html";


}

boot();
