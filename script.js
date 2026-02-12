let revealIndex = 0;
let totalSteps = 5;
let likeCount = 0;
let answeredCount = 0;
let musicStarted = false;

// Function to start music and original logic after clicking the entry button
function initExperience() {
    document.getElementById("startOverlay").style.display = "none";
    const music = document.getElementById("bgMusic");
    if (music && !musicStarted) {
        music.volume = 0.4;
        music.play();
        musicStarted = true;
    }
    // Start your original intro logic
    setTimeout(autoRevealSteps, 1000);
    createFloatingHearts();
}

document.addEventListener("DOMContentLoaded", () => {
    // Original Love Meter logic
    const loveMeter = document.getElementById("loveMeter");
    if (loveMeter) {
        loveMeter.addEventListener("input", (e) => {
            const val = e.target.value;
            document.getElementById("loveValue").innerText = val;
            const emoji = document.getElementById("loveEmoji");
            if (val <= 25) emoji.innerText = "😢";
            else if (val <= 50) emoji.innerText = "😕";
            else if (val <= 75) emoji.innerText = "😊";
            else emoji.innerText = "😍";
        });
    }

    // Original Marriage Form logic
    const form = document.getElementById("marriageForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            romanticBurst("💖");
            alert("Your answers are saved in our story 💕");
        });
    }
});

function autoRevealSteps() {
    const steps = document.querySelectorAll("#stepContainer .step-item");
    if (revealIndex < steps.length) {
        steps[revealIndex].classList.add("show");
        revealIndex++;
        let percent = Math.floor((revealIndex / totalSteps) * 100);
        document.getElementById("progressBar").style.width = percent + "%";
        document.getElementById("progressText").innerText = "Understanding Level: " + percent + "%";
        setTimeout(autoRevealSteps, 1000);
    }
}

function handleReaction(button, liked) {
    // Block progression if she selects No (💔)
    if (!liked) {
        alert("Only if you select ❤️ we will go forward... 💖");
        return;
    }

    const parent = button.parentElement;
    if (parent.classList.contains("answered")) return;

    parent.classList.add("answered");
    parent.querySelectorAll("button").forEach(btn => btn.style.opacity = "0.3");
    button.style.opacity = "1";

    likeCount++;
    answeredCount++;

    if (answeredCount === totalSteps) {
        document.getElementById("continueBtn").disabled = false;
        const summary = document.getElementById("likeSummary");
        summary.classList.remove("hidden");
        summary.innerHTML = `You liked <b>${likeCount}/${totalSteps}</b> things about me 💖`;
        // Hide warning sentence when finished
        document.getElementById("mustSelectMsg").style.display = "none";
    }
}

function startProcess() {
    document.getElementById("introSection").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
    showOnly("question1");
}

function showNext(num) { showOnly("question" + num); }

function showOnly(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function yesReaction(next) {
    romanticBurst("💖");
    setTimeout(() => showNext(next), 500);
}

function celebrate() {
    romanticBurst("💘");
    showOnly("celebration");
}

function goToMarriageForm() { showOnly("marriageFormSection"); }
function finalEnding() { showOnly("finalEnding"); }
function goToMedia() { showOnly("mediaSection"); }
function goToValentine() { showOnly("valentineSection"); }

function openMemory(imageSrc, message) {
    const modal = document.getElementById("memoryModal");
    const modalImg = document.getElementById("modalImage");
    const modalMsg = document.getElementById("modalMessage");
    modalImg.src = imageSrc;
    modalImg.style.objectFit = "contain"; 
    modalMsg.innerText = message;
    modal.classList.remove("hidden");
    romanticBurst("✨");
}

function closeMemoryModal(event) {
    if (!event || event.target.id === "memoryModal" || event.target.className === "close-modal") {
        document.getElementById("memoryModal").classList.add("hidden");
    }
}

function moveButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 20);
    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

function selectOption(card) {
    card.parentElement.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    romanticBurst("💖");
}

function createFloatingHearts() {
    const container = document.querySelector(".floating-elements");
    const symbols = ["💖", "💕", "🌸", "✨"];
    for (let i = 0; i < 20; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        h.style.left = Math.random() * 100 + "vw";
        h.style.animationDuration = (Math.random() * 3 + 3) + "s";
        h.style.fontSize = (Math.random() * 15 + 15) + "px";
        container.appendChild(h);
    }
}

function romanticBurst(symbol) {
    for (let i = 0; i < 10; i++) {
        const el = document.createElement("div");
        el.innerText = symbol;
        el.style.position = "fixed";
        el.style.left = Math.random() * 100 + "vw";
        el.style.top = Math.random() * 100 + "vh";
        el.style.fontSize = "2rem";
        el.style.zIndex = "1000";
        el.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(-100px)" }], 2000);
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    }
}

function valentineYes() {
    romanticBurst("💘");
    document.getElementById("valentineSection").innerHTML = `
        <h1 style="font-size: 2.5rem; color: #ff4757;">Perfect Choice! 💖</h1>
        <p style="font-size: 1.2rem;">You've made me the happiest person, Sonam.</p>
        <div style="font-size: 4rem; margin-top: 20px;">💍✨❤️</div>
    `;
}

function moveValentineNo() {
    moveButton(document.getElementById("valentineNoBtn"));
}
