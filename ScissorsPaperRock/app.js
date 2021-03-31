let playerScore = 0;
let computerScore = 0;
let playerScore_span = document.getElementById("player_score");
let computerScore_span = document.getElementById("computer_score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result");
const Rock_div = document.getElementById("Rock");
const Paper_div = document.getElementById("Paper");
const Scissors_div = document.getElementById("Scissors");

function getComputerChoice(){
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function win(playerChoice, computerChoice) {
    playerScore++;
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = playerChoice + " Player " + " beats " + computerChoice + " Computer "  + "<br>" + "Player Win";
}

function lose(playerChoice, computerChoice) {
    computerScore++;
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = computerChoice + " Computer " + " beats " + playerChoice + " Player " + "<br>" + "Computer Win";
}

function draw(playerChoice, computerChoice) {
    result_p.innerHTML = computerChoice + " equals " + playerChoice + "<br>" + "It is draw";
}

function game(playerChoice) {
    const computerChoice = getComputerChoice();
    switch (playerChoice + computerChoice) {
        case "RockScissors":
        case "PaperRock":
        case "ScissorsPaper":
            win(playerChoice, computerChoice);
            break;
        case "RockPaper":
        case "PaperScissors":
        case "ScissorsRock":
           lose(playerChoice, computerChoice);
            break;
        case "RockRock":
        case "PaperPaper":
        case "ScissorsScissors":
            draw(playerChoice, computerChoice);
            break;
    }
}

function main() {
    Rock_div.addEventListener('click', function() {
        game("Rock");
    })
    Paper_div.addEventListener('click', function() {
        game("Paper");
    })
    Scissors_div.addEventListener('click', function() {
        game("Scissors");
    })

}

main ();

