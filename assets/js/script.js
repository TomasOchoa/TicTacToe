"use strict";

$(function () {
    $(document).ready(function () {
        //Initialization
        var ttt = new TicTacToe();                                  //Instantiate TicTacToe Object
        ttt.changeMessageDisplay('Pick your piece!');               //Prompt for p1 piece
        $('div.turn').hide();

        //---------- Click Listeners ----------
        //Button Listeners
        ttt.choiceX.click(function () {
            // console.log(this);
            $('div.turn').show();
            if(ttt.playerTurn === 1){
                ttt.player1.piece = 'x';
                ttt.player2.piece = 'o';
            }
            else if(ttt.playerTurn === 2){
                ttt.player2.piece = 'x';
                ttt.player1.piece = 'o';
            }
            ttt.displayMessage.removeClass('error');
            ttt.changeMessageDisplay('Make your move!')
            ttt.changeTurnDisplayColor();
            ttt.choiceX.hide();
            ttt.choiceO.hide();
        });
        ttt.choiceO.click(function () {
            // console.log(this);
            $('div.turn').show();
            if(ttt.playerTurn === 1){
                ttt.player1.piece = 'o';
                ttt.player2.piece = 'x';
            }
            else if(ttt.playerTurn === 2){
                ttt.player2.piece = 'o';
                ttt.player1.piece = 'x';
            }
            ttt.displayMessage.removeClass('error');
            ttt.changeMessageDisplay('Make your move!')
            ttt.changeTurnDisplayColor();
            ttt.choiceX.hide();
            ttt.choiceO.hide();
        });

        //Box Listener
        ttt.tableBoxes.click(function () {
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
                ttt.showAvailableMoves();
            }
            else {
                //If pieces !set yet, show error
                if(ttt.player1.piece === ''){
                    ttt.displayMessage.addClass('error');
                }
                //If valid move and still valid turn
                else if (ttt.verifyMove(clickedBox) && ttt.turnsPlayed <= 9){
                    ttt.hideAvailableMoves();
                    ttt.displayMessage.removeClass('error');
                    ttt.changeMessageDisplay('Make your move!');
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
                    else{
                        ttt.setNextTurn();
                        ttt.changeTurnDisplayColor();
                    }

                }
            }
        });
    })
}(jQuery));