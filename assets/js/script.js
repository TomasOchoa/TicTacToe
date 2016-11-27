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

function TicTacToe() {
    //---------- Properties ----------
    this.playerTurn = 1;                    //Default is first player
    this.turnsPlayed = 0;                   //Number of turns played
    this.winningCombo = [];
    this.player1 = new Player();            //Player1
    this.player2 = new Player();            //Player2
    this.displayMessage = $('#message');    //Message div
    this.displayTurn = $('#turn');          //Turn div
    //---------- Methods----------
    this.changeMessageDisplay = function (newHtml) {
        var msgHtml = '<h4>'+newHtml+'</h4>';
        this.displayMessage.html(msgHtml);
    }
    this.changeTurnDisplay = function(turn){
        this.displayTurn.html(turn);
    }
    this.verifyMove = function (clickedBox) {
        return !(clickedBox.hasClass('cross') || clickedBox.hasClass('circle'));
    }
    this.setBox = function (boxClicked) {
        var location = boxClicked.attr('id');

        //If player 1
        if(this.playerTurn === 1){
            this.player1.piece === 'x' ? boxClicked.addClass('cross') : boxClicked.addClass('circle');
            this.player1.playerMoves.push(location);
            this.changeTurnDisplay(2);
        }
        //If player 2
        if(this.playerTurn === 2){
            this.player2.piece === 'x' ? boxClicked.addClass('cross') : boxClicked.addClass('circle');
            this.player2.playerMoves.push(location);
            this.changeTurnDisplay(1);
        }
        return;
    }
    this.checkWinner = function () {
        //Array of moves made from the current player
        var playerMoves = (this.playerTurn === 1 ? this.player1.playerMoves : this.player2.playerMoves);

        // if((playerMoves.includes('00') && playerMoves.includes('01') && playerMoves.includes('02')) ||  //Row Wise 0
        //    (playerMoves.includes('10') && playerMoves.includes('11') && playerMoves.includes('12')) ||  //Row Wise 1
        //    (playerMoves.includes('20') && playerMoves.includes('21') && playerMoves.includes('22')) ||  //Row Wise 2
        //    (playerMoves.includes('00') && playerMoves.includes('10') && playerMoves.includes('20')) ||  //Col Wise 0
        //    (playerMoves.includes('01') && playerMoves.includes('11') && playerMoves.includes('21')) ||  //Col Wise 1
        //    (playerMoves.includes('02') && playerMoves.includes('12') && playerMoves.includes('22')) ||  //Col Wise 2
        //    (playerMoves.includes('00') && playerMoves.includes('11') && playerMoves.includes('22')) ||  //Top Right to Bottom Left
        //    (playerMoves.includes('02') && playerMoves.includes('11') && playerMoves.includes('20'))     //Top Left to Bottom Right
        // )
        //Row Wise 0
        if((playerMoves.includes('00') && playerMoves.includes('01') && playerMoves.includes('02'))){
            this.winningCombo = ['00','01','02'];
            return true;
        }
        //Row Wise 1
        if((playerMoves.includes('10') && playerMoves.includes('11') && playerMoves.includes('12'))){
            this.winningCombo = ['10','11','12'];
            return true;
        }
        //Row Wise 2
        if((playerMoves.includes('20') && playerMoves.includes('21') && playerMoves.includes('22'))){
            this.winningCombo = ['20','21','22'];
            return true;
        }
        //Col Wise 0
        if((playerMoves.includes('00') && playerMoves.includes('10') && playerMoves.includes('20'))){
            this.winningCombo = ['00','10','20'];
            return true;
        }
        //Col Wise 1
        if((playerMoves.includes('01') && playerMoves.includes('11') && playerMoves.includes('21'))){
            this.winningCombo = ['01','11','21'];
            return true;
        }
        //Col Wise 2
        if((playerMoves.includes('02') && playerMoves.includes('12') && playerMoves.includes('22'))){
            this.winningCombo = ['02','12','22'];
            return true;
        }
        //Diagonal 1
        if((playerMoves.includes('00') && playerMoves.includes('11') && playerMoves.includes('22'))){
            this.winningCombo = ['00','11','22'];
            return true;
        }
        //Diagonal 2
        if((playerMoves.includes('02') && playerMoves.includes('11') && playerMoves.includes('20'))){
            this.winningCombo = ['02','11','20'];
            return true;
        }
        return false;
    };
    this.setNextTurn = function () {
        this.playerTurn = (this.playerTurn === 1 ? 2 : 1);
    }
    this.showWinner = function () {
        //Change message in jumbotron
        // console.log('Player',this.playerTurn,'wins!');
        for(var id of this.winningCombo){
            //Highlight winning row
            var searchID = '#'+id;
            if($(searchID).hasClass('cross')){
                $(searchID).removeClass('cross');
                $(searchID).addClass('crossWin');
            }
            else if($(searchID).hasClass('circle')){
                $(searchID).removeClass('circle');
                $(searchID).addClass('circleWin');
            }
        }
    }
    this.showTie = function () {

    }
}

function Player() {
    this.piece = '';
    this.playerMoves = [];
}