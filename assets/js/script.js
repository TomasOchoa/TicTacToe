/**
 * Created by Tom's Desktop on 11/25/2016.
 */
"use strict";

$(function () {
    var ttt = new TicTacToe();
    ttt.changeMessageDisplay('Pick your piece!');      //Prompt for p1 piece

    //---------- Click Listeners ----------
    //Button Listener
    $('button').click(function () {
        var cross = "url('assets/images/cross.png')";      //'X' image
        var circle = "url('assets/images/circle.png')";    //'O' image

        if($(this).html() == 'X'){
            ttt.player1.piece = cross;
            ttt.player2.piece = circle;
        }
        else if($(this).html() == 'O'){
            ttt.player1.piece = circle;
            ttt.player2.piece = cross;
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
        //Else do move
        else{
            var location = clickedBox[0].id;
            ttt.verifyMove(location);
            if(ttt.playerTurn == 1){
                ttt.setBox(clickedBox,ttt.player1.piece);
                ttt.changeTurnDisplay(2);
                return ttt.playerTurn = 2;
            }
            if(ttt.playerTurn == 2){
                ttt.setBox(clickedBox,ttt.player2.piece);
                ttt.changeTurnDisplay(1);
                return ttt.playerTurn = 1;
            }
        }
    });
    
    
    
}(jQuery));

function TicTacToe() {
    //Player Properties
    this.playerTurn = 1;                                //Default is first player
    this.player1 = new Player();                        //Player1
    this.player2 = new Player();                        //Player2

    //Display Properties
    this.displayMessage = $('#message');
    this.displayTurn = $('#turn');
    this.changeMessageDisplay = function (newHtml) {
        var msgHtml = '<h4>'+newHtml+'</h4>';
        this.displayMessage.html(msgHtml);
    }
    this.changeTurnDisplay = function(turn){
        this.displayTurn.html(turn);
    }

    //Methods
    this.verifyMove = function (location) {
        console.log(location);

    }
    this.setBox = function (boxClicked,playerPiece) {
        boxClicked.css('background-image',playerPiece);
    }
}

function Player() {
    this.piece = '';
    this.playerMoves = [];
}