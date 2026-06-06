const PASSWORD = "100426";

let enteredPin = "";

function addNumber(num){

if(enteredPin.length >= 6) return;

enteredPin += num;

updateDisplay();
}

function removeNumber(){

enteredPin = enteredPin.slice(0,-1);

updateDisplay();
}

function updateDisplay(){

let dots = "";

for(let i=0;i<enteredPin.length;i++){
dots += "● ";
}

for(let i=enteredPin.length;i<6;i++){
dots += "○ ";
}

document.getElementById("display").innerHTML = dots;
}

function checkPassword(){

    if(enteredPin === PASSWORD){

        nextPage(2);

    }else{

        document.getElementById("error").innerHTML =
        "Wrong password";

        enteredPin = "";

        updateDisplay();
    }
}

function showStory(){

    nextPage(4);

}

function nextPage(page){

    document.querySelectorAll(".page")
    .forEach(p=>{
        p.classList.remove("active");
    });

    document.getElementById("page"+page)
    .classList.add("active");

    if(page===6){
        startTyping();
    }
    
    if(page===7){
        const lines = document.querySelectorAll("#page7 .fade-line");
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add("appear");
            }, index * 800); 
        });
    }
}

const reasons = [
"You make me feel loved.",
"You always make me smile.",
"You make ordinary days special.",
"You understand me.",
"You make me feel safe.",
"You support me.",
"You are my favorite person.",
"You make my world brighter.",
"You choose us every day.",
"And because you're simply you."
];

let currentReason = 0;

document.getElementById("reasonText")
.innerHTML = reasons[0];

function nextReason(){

currentReason++;

if(currentReason >= reasons.length){
currentReason = 0;
}

document.getElementById("reasonText")
.innerHTML = reasons[currentReason];
}

const letter = `Dear Love,

Happy Mensiversary

Thank you for every laugh, every conversation, and every memory we've shared together. You make my days brighter than you probably realize, and being with you has become one of the best parts of my life.

Thank you for staying, understanding me, and choosing us every day. I hope we continue creating beautiful memories together and growing side by side.

I love you so much.`;

function startTyping(){

const target =
document.getElementById("typedText");

target.innerHTML="";

let i=0;

const typing = setInterval(()=>{

target.innerHTML += letter.charAt(i);

i++;

if(i>=letter.length){
clearInterval(typing);
}

},40);

}

function triggerHeartRain() {

    const heartSymbols = ["♥", "💕", "💖", "🌸"];
    
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const heart = document.createElement("span");

            heart.classList.add("floating-heart");
            
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            heart.style.left = Math.random() * 100 + "vw";
        
            heart.style.fontSize = Math.random() * 20 + 20 + "px";
            
            heart.style.animationDuration = Math.random() * 2 + 2 + "s";
            
            const randomX = (Math.random() * 150 - 75) + "px";
            heart.style.setProperty('--randomX', randomX);
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 80); 
    }
}