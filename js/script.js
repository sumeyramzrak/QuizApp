const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quit_btn = info_box.querySelector(".buttons .quit");
const restart_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

quit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

restart_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQue(0);
    queCount(1);
    startTimer(15);
}

let que_count = 0;
let que_num = 1;
let counter;
let timeMax = 15;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
    window.location.reload();
}

restart_quiz.onclick = () => {

    result_box.classList.remove("activeResult");
    que_count = 0;
    que_num = 1;
    timeMax = 15;
    userScore = 0;
    showQue(que_count);
    queCount(que_num);
    startTimer(timeMax);
    next_btn.style.display = "none";
    quiz_box.classList.add("activeQuiz");
    
}

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQue(que_count);
        queCount(que_num);
        clearInterval(counter);
        startTimer(timeMax);
        next_btn.style.display = "none";


    } else {
     
        showResultBox();
    }
}

function showQue(index) {
    const que_text = document.querySelector(".questions");

    let que_tag = '<span>' + questions[index].num + " ) " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function queCount(index) {
    const bottom_que_count = quiz_box.querySelector(".total_que");
    let bottom_que_count_tag = '<span><p>' + que_num + '</p><p>of</p><p>' + questions.length + '</p><p>Questions</p></span>';
    bottom_que_count.innerHTML = bottom_que_count_tag;
}

let tick = '<div class="icon"><i class="fas fa-check"></i></div>';
let cross = '<div class="icon"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore++;
        answer.classList.add("correct");
        console.log("correct");
        answer.insertAdjacentHTML("beforeend", tick);
    }
    else {
        answer.classList.add("incorrect");
        console.log("wrong");
        answer.insertAdjacentHTML("beforeend", cross);

        for (let i = 0; i < allOptions.length; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option.correct");
                answer.insertAdjacentHTML("beforeend", tick);
            }
        }

    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            next_btn.style.display = "block";
        }
    }
}

function showResultBox() {
  
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span><p>You got only</p> <p>' + userScore + '</p><p> out of </p><p>' + questions.length + '</p></span>'
    scoreText.innerHTML = scoreTag;

}