var allData = [];
var total = 0;
var correctOption = 0;

var totalQuestions = 0, correctAnswers = 0;

function init() {
    $('#capital-quiz-container')[0].style.display = "none";
    getData();
}

init();

function getData() {
    try {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
            success: function (res) {
                allData = res;
                total = allData.length;
                // console.log(allData[0]);
            }
        });
    }
    catch (err) {
        alert('API not available right now');
    }
}

function setNextCapitalQuestion() {
    ++totalQuestions;
    $("#total-count")[0].innerText = totalQuestions;

    var random = Math.floor(Math.random() * total) + 1;
    $("#country-name")[0].innerText = allData[random]["name"];
    $("#country-logo")[0].src = allData[random]["flag"];

    setTimeout(() => {
        $("#country-name").fadeIn(500);
        $("#country-logo").fadeIn(500);
    }, 500);

    var r1 = random;
    while (r1 === random) {
        r1 = Math.floor(Math.random() * total) + 1;
    }
    var r2 = r1;
    while (r2 === random || r2 === r1) {
        r2 = Math.floor(Math.random() * total) + 1;
    }
    var r3 = r2;
    while (r3 === random || r3 === r1 || r3 === r2) {
        r3 = Math.floor(Math.random() * total) + 1;
    }

    correctOption = Math.floor(Math.random() * 4) + 1;

    $("#capital-" + correctOption)[0].innerText = allData[random]["capital"];

    var otherOptions = [1, 2, 3, 4];
    otherOptions.splice(correctOption - 1, 1);

    $("#capital-" + otherOptions[0])[0].innerText = allData[r1]["capital"];
    $("#capital-" + otherOptions[1])[0].innerText = allData[r2]["capital"];
    $("#capital-" + otherOptions[2])[0].innerText = allData[r3]["capital"];
}


function handleOptionClick(e) {
    var clickedOption = e.target.id;
    clickedOption = clickedOption.substring(clickedOption.lastIndexOf('-') + 1);

    $("#capital-" + correctOption)[0].style.background = "lightgreen";

    // number, string comparison
    if (clickedOption == correctOption) {
        ++correctAnswers;
        $("#correct-count")[0].innerText = correctAnswers;
    } else {
        $("#capital-" + clickedOption)[0].style.background = "#f2bbbb"
    }

    $("#options-div").addClass("disable-div");

    if (totalQuestions >= 5) {
        $("#score-label")[0].innerText = "Final Score:"
        $("#restart-btn")[0].style.display = "block";

        return;
    }

    setTimeout(() => {

        $("#capital-" + correctOption)[0].style.background = "white";
        $("#capital-" + clickedOption)[0].style.background = "white";

        $("#country-name").fadeOut();
        $("#country-logo").fadeOut();
        $(".row").fadeOut();

        $(".row").fadeIn(500);

        setTimeout(() => {
            setNextCapitalQuestion();
            $("#options-div").removeClass("disable-div");
        }, 500);


    }, 1000);
}


$("#home-btn").click(() => {
    $("#quiz-type")[0].style.display = "flex";
    $('#capital-quiz-container')[0].style.display = "none";
})

$(".quiz-btn").click(() => {
    $("#quiz-type")[0].style.display = "none";
})

$("#capital-btn").click(() => {
    resetQuiz();
    $('#capital-quiz-container')[0].style.display = "block";
    $("#restart-btn")[0].style.display = "none";
})

$(".c-option-btn").click((e) => {
    handleOptionClick(e);
})

$("#restart-btn").click(() => {
    resetQuiz();
})

function resetQuiz() {
    totalQuestions = 0;
    correctAnswers = 0;
    setNextCapitalQuestion();

    $("#capital-1")[0].style.background = "white";
    $("#capital-2")[0].style.background = "white";
    $("#capital-3")[0].style.background = "white";
    $("#capital-4")[0].style.background = "white";

    $("#options-div").removeClass("disable-div");

    $("#total-count")[0].innerText = totalQuestions;
    $("#correct-count")[0].innerText = correctAnswers;
}
