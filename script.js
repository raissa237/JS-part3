class Question{
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choices){
        return this.answer === choices;
    }
}

let question = [
    new Question("What does HTML stand for?", ["Hyper Text Preprocessor","Hyper Text Markup Language","Hyper Text Multiple Language", "Hyper Tool Multi Language"], "Hyper Text Markup Language"),
    new Question("What does CSS stand for?", ["Common Style Sheet","Colorful Style Sheet","Computer Style Sheet", "Cascading Style Sheet"], "Cascading Style Sheet"),
    new Question("What does PHP stand for?", ["Hypertext Preprocessor","Hypertext Programming","Hypertext Preprogramming", "Hometext Preprocessor"], "Hypertext Preprocessor"),
    new Question("What does SQL stand for?", ["Stylish Question Language","Stylesheet Query Language","Statement Question Language", "Structured Query Language"], "Structured Query Language"),
    new Question("What does XML stand for?", [ "eXtensible Markup Language","eXecutable Multiple Language","eXTra Multi-Program Language", "eXamine Multiple Language"], "eXtensible Markup Language")
];

class Quiz {
    constructor(Questions){
        this.score = 0;
        this.Questions = Questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion(){
        return this.Questions[this.currentQuestionIndex];
    }
    guess(answer){
        if(this.getCurrentQuestion().isCorrectAnswer(answer)){
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded(){
        return this.currentQuestionIndex >= this.Questions.length;
    }
}

//les fonctions d'affichages
const display = {
    elementShown: function(id, text){
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function(){
        let endQuizHTML = document.createElement("h1");
        endQuizHTML.textContent = "QuizzzParty terminé !";
        endQuizHTML.innerHTML = '<br><h3>votre score est de : ${Quiz.score}/${Quiz.Question.length}</h3>';
        this.elementShown("Questions", endQuizHTML);
    },
    Question: function(){
        this.elementShown("Question", Quiz.getCurrentQuestion().text);
    },
    choices: function(){
        let choices = Quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function(){
                Quiz.guess(guess);
                QuizApp();
            }
        }
        for(let i=0; i<choices.length; i++){
            this.elementShown("choices"+1, choices[i]);
            guessHandler("guess"+i, choices[i]);
        }
    },
    progress: function(){
        let currentQuestionNumber = Quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question"+ currentQuestionNumber + "sur"+ Quiz.Question.length);
    }
}

//deroulement du jeu
QuizApp = ()  => {
    if(Quiz.hasEnded()){
        display.endQuiz();
    }
    else{
        display.Question();
        display.choices();
        display.progress();
    }
}

//le quiz
let Quiz = new Quiz(questions);
QuizApp();
Console.log(Quiz);