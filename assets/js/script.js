"use strict";

$(function () {
    $(document).ready(function () {
        //Initialization
        var allButtons  = $('button');                              //Selector for all buttons
        var tableBoxes  = $('td');                                  //Selector for all table
        var ttt = new TicTacToe();                                  //Instantiate TicTacToe Object

        ttt.changeMessageDisplay('Pick your piece!');               //Prompt for p1 piece

        //---------- Click Listeners ----------
        //Button Listener
        allButtons.click(function () {
            if($(this).html() == 'X'){
                ttt.player1.piece = 'x';
                ttt.player2.piece = 'o';
            }
            else if($(this).html() == 'O'){
                ttt.player1.piece = 'o';
                ttt.player2.piece = 'x';
            }
            ttt.displayMessage.removeClass('error');
            ttt.changeMessageDisplay('Make your move!')
            allButtons.hide();
        });

        //Box Listener
        tableBoxes.click(function () {
            var clickedBox = $(this);
            //Variable that holds the box clicked
            if(clickedBox.hasClass('clicked') || clickedBox.hasClass('locked')){
                return;
            }
            else {
                //If pieces !set yet, show error
                if(ttt.player1.piece === ''){
                    ttt.displayMessage.addClass('error');
                }
                //If not valid move and there are less than 9 turns played
                else if((!ttt.verifyMove(clickedBox)) && (ttt.turnsPlayed <= 9)){
                    //Display error message
                    ttt.changeMessageDisplay('Pick a different box!');
                    ttt.displayMessage.addClass('error');
                    /*
                     Highlight all available moves
                     border: red solid;
                     border: solid red 5px;
                     height: 100%;
                     width: 100%;
                     padding: initial;
                     margin: inherit;
                     */
                }
                //If valid move and still valid turn
                else if(ttt.verifyMove(clickedBox) && ttt.turnsPlayed <= 9){
                    ttt.displayMessage.removeClass('error');
                    ttt.changeMessageDisplay('Make your move!')
                    ttt.setBox(clickedBox);
                    if(ttt.checkWinner()){
                        ttt.showWinner();
                        ttt.reset(ttt);
                    }
                    else{
                        ttt.setNextTurn();
                    }
                }
            }
        });
    })
}(jQuery));