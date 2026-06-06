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
        document.getElementById("error").innerHTML = "Wrong password";
        enteredPin = "";
        updateDisplay();
    }
}

function showStory(){
    nextPage(4);
}

// --- FUNGSI NEXTPAGE DENGAN TRANSISI TIRAI & LOGIKA ENDING OTOMATIS ---
function nextPage(page){
    const curtain = document.getElementById("curtain-transition");
    
    if (curtain) {
        curtain.classList.add("active");
    }
    
    setTimeout(() => {
        
        document.querySelectorAll(".page").forEach(p=>{
            p.classList.remove("active");
        });

        document.getElementById("page"+page).classList.add("active");

        if(page===6){
            setTimeout(() => {
                startTyping();
            }, 600); 
        }
        
        // === LOGIKA BARU KHUSUS PAGE 7 (ENDING OTOMATIS) ===
        if(page===7){
            // 1. Langsung hujan bunga otomatis tanpa diklik!
            triggerFlowerRain(); 

            const thankSection = document.getElementById("thank-you-section");
            const happySection = document.getElementById("happy-mensive-section");
            const lines = document.querySelectorAll("#page7 .fade-line");

            // Semuanya di-reset dulu biar bersih
            if(thankSection) { thankSection.style.display = "block"; thankSection.classList.remove("fade-out"); }
            if(happySection) { happySection.style.display = "none"; happySection.classList.remove("fade-in"); }
            lines.forEach(line => line.classList.remove("appear"));

            // 2. Munculin kalimat "Thank you" satu per satu bergantian
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add("appear");
                }, index * 1500); // Muncul bergantian tiap 1.5 detik
            });

            // 3. Setelah semua kalimat "Thank you" beres, hilangkan lalu munculkan Happy Mensive
            setTimeout(() => {
                if(thankSection) {
                    thankSection.classList.add("fade-out"); // Efek memudar keluar
                    
                    setTimeout(() => {
                        thankSection.style.display = "none"; // Sembunyikan total
                        
                        if(happySection) {
                            happySection.style.display = "block"; // Tampilkan wadah mensive
                            const happyHeading = happySection.querySelector("h1");
                            if(happyHeading) happyHeading.classList.add("fade-in"); // Memudar masuk
                        }
                    }, 1500); // Nunggu efek pudar keluar selesai (1.5 detik)
                }
            }, (lines.length * 1500) + 1000); // Total waktu tunggu kalimat selesai
        }

        setTimeout(() => {
            if (curtain) {
                curtain.classList.remove("active");
            }
        }, 100); 

    }, 800); 
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

window.addEventListener('DOMContentLoaded', () => {
    const reasonElem = document.getElementById("reasonText");
    if (reasonElem) {
        reasonElem.innerHTML = reasons[0];
    }
});

function nextReason(){
    currentReason++;
    if(currentReason >= reasons.length){
        currentReason = 0;
    }
    document.getElementById("reasonText").innerHTML = reasons[currentReason];
}

const letter = `Dear Love,

Happy Mensiversary

Thank you for every laugh, every conversation, and every memory we've shared together. You make my days brighter than you probably realize, and being with you has become one of the best parts of my life.

Thank you for staying, understanding me, and choosing us every day. I hope we continue creating beautiful memories together and growing side by side.

I love you so much.`;

function startTyping(){
    const target = document.getElementById("typedText");
    if (!target) return;
    
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

// === FUNGSI HUJAN BUNGA OTOMATIS DI ENDING ===
function triggerFlowerRain() {
    const flowerSymbols = ["🌸", "💮", "🌸", "✨", "💕"];
    
    // Bikin 40 bunga bertebaran
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const flower = document.createElement("span");
            flower.classList.add("floating-flower");
            
            flower.innerHTML = flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];
            
            flower.style.left = Math.random() * 100 + "vw";
            flower.style.fontSize = Math.random() * 20 + 20 + "px";
            flower.style.animationDuration = Math.random() * 3 + 3 + "s"; // Durasi jatuh 3-6 detik
            
            const randomX = (Math.random() * 160 - 80) + "px";
            flower.style.setProperty('--randomX', randomX);
            
            document.body.appendChild(flower);
            
            setTimeout(() => {
                flower.remove();
            }, 6000);
        }, i * 150); // Jeda meluncur biar natural
    }
}