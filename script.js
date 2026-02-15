function showTab(id){
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
showTab('home');

function setTheme(color){
    document.body.className = 'theme-' + color;
}

/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const letters = "01";
const fontSize = 16;
let drops = [];

function initMatrix(){
    drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
}
initMatrix();

function drawMatrix(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent');
    ctx.font = fontSize + "px monospace";

    drops.forEach((y,i)=>{
        const text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if(y * fontSize > canvas.height && Math.random() > 0.975){
            drops[i] = 0;
        }
        drops[i]++;
    });
}
setInterval(drawMatrix, 33);

/* QUIZ */
const quizData=[
{q:"Что такое фишинг?",a:["Мошенничество","Антивирус","Wi-Fi"],c:0},
{q:"Самый надёжный пароль?",a:["123456","qwerty","9T$kL!2z@R8"],c:2},
{q:"Что делает VPN?",a:["Шифрует трафик","Удаляет вирусы","Ускоряет ПК"],c:0},
{q:"Какая сеть опаснее?",a:["Домашняя","Открытая","Мобильная"],c:1},
{q:"Что такое 2FA?",a:["Доп. защита","Вирус","Браузер"],c:0},
{q:"Троян — это?",a:["Вирус","Антивирус","Игра"],c:0},
{q:"DDoS — это?",a:["Атака","VPN","Wi-Fi"],c:0},
{q:"Где нельзя вводить пароль?",a:["Свой сайт","Подозрительный","Приложение"],c:1},
{q:"Что защищает ПК?",a:["Антивирус","VPN","Wi-Fi"],c:0},
{q:"Что нельзя публиковать?",a:["Личные данные","Музыку","Фото"],c:0}
];

const quizBox=document.getElementById("quiz");

quizData.forEach((q,i)=>{
    let html=`<div class="question"><p>${i+1}. ${q.q}</p>`;
    q.a.forEach((a,j)=>{
        html+=`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`;
    });
    html+=`</div>`;
    quizBox.innerHTML+=html;
});

function checkQuiz(){
    let score=0;
    quizData.forEach((q,i)=>{
        const checked=document.querySelector(`input[name="q${i}"]:checked`);
        if(checked && Number(checked.value)===q.c) score++;
    });

    document.getElementById("quiz-result").innerHTML=
    `<h3>Результат: ${score}/${quizData.length}</h3>`;
}
/* ================= QUIZ ================= */
function checkQuiz() {
    let score = 0;
    document.querySelectorAll('input[type="radio"]:checked')
        .forEach(input => {
            score += Number(input.value);
        });

    let text;
    if (score >= 8) {
        text = "🔥 Отличный результат! Ты хорошо знаешь основы кибербезопасности.";
    } else if (score >= 4) {
        text = "👍 Хорошо! Есть небольшие пробелы, но ты на верном пути.";
    } else {
        text = "⚠ Тебе нужно почитать статью получше и повторить материал.";
    }

    document.getElementById('quiz-result').innerHTML =
        `<p>Твой результат: <b>${score}/10</b></p><p>${text}</p>`;
}
function checkQuiz() {
    let score = 0;
    quizData.forEach((q, i) => {
        const checked = document.querySelector(`input[name="q${i}"]:checked`);
        if (checked && Number(checked.value) === q.c) score++;
    });

    let text;
    if (score >= 8) {
        text = "🔥 Отличный результат! Ты хорошо знаешь основы кибербезопасности.";
    } else if (score >= 4) {
        text = "👍 Хорошо! Есть небольшие пробелы, но ты на верном пути.";
    } else {
        text = "⚠ Тебе нужно почитать статью получше и повторить материал.";
    }

    document.getElementById('quiz-result').innerHTML =
        `<p>Твой результат: <b>${score}/${quizData.length}</b></p><p>${text}</p>`;
}