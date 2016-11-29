"use strict";

$(function () {
    var ttt = new TicTacToe();
    ttt.changeMessageDisplay('Pick your piece!');      //Prompt for p1 piece

    //---------- Click Listeners ----------
    //Reset Listener
    $('#reset').click(function () {
        ttt.reset();
    });


    //Button Listener
    $('button').click(function () {
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
        $('button').hide();
    });

    //Box Listener
    $('td').click(function () {
        var clickedBox = $(this);
        //If pieces !set yet, show error
        if(ttt.player1.piece === ''){
            ttt.displayMessage.addClass('error');
        }
        else if(!ttt.verifyMove(clickedBox)){
            //Display error message
            ttt.changeMessageDisplay('Pick a different box!');
            ttt.displayMessage.addClass('error');
            //Highlight all available moves
            /* border: red solid; */
            // border: solid red 5px;
            // height: 100%;
            // width: 100%;
            // padding: initial;
            // margin: inherit;
        }
        else{
            ttt.changeMessageDisplay('Make your move!')
            ttt.displayMessage.removeClass('error');
            ttt.setBox(clickedBox);
            if(ttt.checkWinner()){
                ttt.showWinner();
            }
            else{
                ttt.setNextTurn();
            }
        }
    });
}(jQuery));