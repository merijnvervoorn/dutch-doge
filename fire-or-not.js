// Thanks https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp
const questions = [
    {
        question: "Intern",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionA"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    },

    {
        question: "CEO",
        optionA: "Fire",
        optionB: "Don't Fire",
        optionC: "Half Salary",
        optionD: "Promote",
        correctOption: "optionB"
    }
]

let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    const currentQuestion = questions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = questions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber < questions.length) {
            //displays next question as long as index number isn't greater than or equal to the number of questions
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number is greater than or equal to the number of questions
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / questions.length) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
