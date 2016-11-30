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
            //Variable that holds the box clicked
            var clickedBox = $(this);

            //If marked or locked, prevent click event
            if(clickedBox.hasClass('locked') || (ttt.checkWinner())){
                return;
            }
            //If not valid move and there are less than 9 turns played, display error message
            else if(clickedBox.hasClass('clicked') && ttt.turnsPlayed < 9){
                ttt.changeMessageDisplay('Pick a different box!');
                ttt.displayMessage.addClass('error');
                ttt.showAvailableMoves(tableBoxes);

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
            else {
                //If pieces !set yet, show error
                if(ttt.player1.piece === ''){
                    ttt.displayMessage.addClass('error');
                }
                //If valid move and still valid turn
                else if (ttt.verifyMove(clickedBox) && ttt.turnsPlayed <= 9){
                    ttt.displayMessage.removeClass('error');
                    ttt.changeMessageDisplay('Make your move!')
                    ttt.setBox(clickedBox);

                    //If tied
                    if (ttt.turnsPlayed === 9 && !ttt.checkWinner()) {
                        ttt.showTie();
                        ttt.reset(ttt);
                    }
                    //If Winner
                    else if (ttt.checkWinner()){
                        ttt.showWinner();
                        ttt.reset(ttt);
                    }
                    //Vaild move
                    else
                        ttt.setNextTurn();
                }
            }
        });
    })
}(jQuery));