/**
 * Class: TicTacToe
 * @constructor
 */
function TicTacToe() {
    //----------------------------------------
    //               Properties
    //----------------------------------------
    //Selector Properties
    this.displayMessage = $('#message');    //Selector for message div
    this.displayTurn = $('#turn');          //Selector for display turn span
    this.playerDisplay = $('h4');           //Selector for h4 element
    this.choiceX  = $('button#x');          //Selector for 'x' choice
    this.choiceO  = $('button#o');          //Selector for 'o' choice
    this.tableBoxes  = $('td');             //Selector for all table
    //Object Properties
    this.player1 = new Player();            //Player1
    this.player2 = new Player();            //Player2
    //Variable properties
    this.playerTurn = 1;                    //Default is first player
    this.turnsPlayed = 0;                   //Number of turns played
    this.winningCombo = [];                 //Holds winning elements to highlight later

    //----------------------------------------
    //               Methods
    //----------------------------------------
    this.changeMessageDisplay = function (newHtml) {
        var msgHtml = '<h2>'+newHtml+'</h2>';
        this.displayMessage.html(msgHtml);
    }
    this.changeTurnDisplay = function(turn){
        this.displayTurn.html(turn);        //Update turn
    }
    this.changeTurnDisplayColor = function(){
        var playerDisplay = $('h4');            //Selector for h4 element
        var xJumbotronColor = 'rgba(239, 218, 218, 1)';
        var oJumbotronColor = 'rgba(46, 160, 191, 0.3)';

        //Remove any previous player color display class
        if(playerDisplay.hasClass('playerX'))
            playerDisplay.removeClass('playerX');

        else if(playerDisplay.hasClass('playerO')) {
            playerDisplay.removeClass('playerO');
        }

        //Decide what color
        if(this.playerTurn === 1 ){
            this.player1.piece === 'x' ? playerDisplay.addClass('playerX') : playerDisplay.addClass('playerO');
            this.player1.piece === 'x' ? $('div#jumbotron').css('background-color',xJumbotronColor) : $('div#jumbotron').css('background-color',oJumbotronColor);
        }

        if(this.playerTurn === 2 ){
            this.player2.piece === 'x' ? playerDisplay.addClass('playerX') : playerDisplay.addClass('playerO');
            this.player2.piece === 'x' ? $('div#jumbotron').css('background-color',xJumbotronColor) : $('div#jumbotron').css('background-color',oJumbotronColor);
        }

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
    this.hideAvailableMoves = function () {
        var availableMoves = $('td.available');
        availableMoves.css('background-color','rgba(0,0,0,0)');
    }
    this.reset = function (currGame) {
        //Selector Variables
        var jumbotron = $('#jumbotron');                            //Selector for the jumbotron
        var resetBtn  = $('<button id="reset">Reset</button>');     //Variable that holds html to be added

        jumbotron.append(resetBtn);                                 //Add the button to the jumbotron
        resetBtn.show();
        this.hideAvailableMoves();

        //Reset Listener
        $('#reset').click(function () {
            //Refresh the page (Lazy Way)
            // location.reload();

            //Remove reset button
            resetBtn.remove();

            //Remove prior display player color classes
            if($('div.turn').hasClass('playerX'))
                $('div.turn').removeClass('playerX');
            else if($('div.turn').hasClass('playerO'))
                $('div.turn').removeClass('playerO');

            //SHow hidden display elements
            $('button').show();

            //Reset the gameboard
            var allBoxes = $('td');
            for(let each of allBoxes){
                var boxID = '#'+each.id;
                if(!$(boxID).hasClass('available'))
                    $(boxID).addClass('available');
                if($(boxID).hasClass('clicked'))
                    $(boxID).removeClass('clicked');
                if($(boxID).hasClass('locked'))
                    $(boxID).removeClass('locked');
                if($(boxID).hasClass('cross'))
                    $(boxID).removeClass('cross');
                if($(boxID).hasClass('circle'))
                    $(boxID).removeClass('circle');
                if($(boxID).hasClass('crossWin'))
                    $(boxID).removeClass('crossWin');
                if($(boxID).hasClass('circleWin'))
                    $(boxID).removeClass('circleWin');
            }

            //Reset all the properties
            currGame.turnsPlayed = 0;
            currGame.winningCombo = [];
            currGame.player1 = new Player();
            currGame.player2 = new Player();
            //Remove previous display classes
            if(currGame.displayMessage.hasClass('win'))
                currGame.displayMessage.removeClass('win');
            if(currGame.displayMessage.hasClass('tie'))
                currGame.displayMessage.removeClass('tie');
            if(currGame.displayMessage.hasClass('error'))
                currGame.displayMessage.removeClass('error');
            //Reset display
            currGame.changeMessageDisplay('Start New Game! Choose your piece.');
            currGame.changeTurnDisplay(currGame.playerTurn);
            jumbotron.css('background-color','#eee');

        });
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
        boxClicked.toggleClass('available');
        boxClicked.addClass('clicked');         //Mark box as 'clicked'
        this.turnsPlayed++;                     //Increment turnsPlayed
        return;
    }
    this.setNextTurn = function () {
        this.playerTurn = (this.playerTurn === 1 ? 2 : 1);
    }
    this.showAvailableMoves = function (gameBoxes) {
        //Get all available boxes
        var availableMoves = $('td.available');
        var highlightColor = 'rgba(239, 232, 0, 0.5)';
        availableMoves.css('background-color',highlightColor);
    }
    this.showTie = function () {
        //Change message in jumbotron
        this.displayMessage.addClass('tie');
        this.changeMessageDisplay('Tie Game!');
        $('div#jumbotron').css('background-color','rgba(181, 167, 65, 0.3)');
        $('div.turn').hide();
    }
    this.showWinner = function () {
        //Hide the turn and change message in jumbotron
        $('div.turn').hide();
        this.displayMessage.addClass('win');
        this.changeMessageDisplay('Player '+this.playerTurn+' wins!');

        //Highlight winning elements
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

        //Lock remaining elements with class 'locked'
        var gameBoxes = $('td');
        for(let each of gameBoxes){
            //Setup the id to search
            var searchBox = '#'+each.id;

            //If not marked clicked, mark as locked to prevent further click events
            if(!each.className.includes('clicked'))
                $(searchBox).addClass('locked');
        }
    }
    this.verifyMove = function (clickedBox) {
        return !(clickedBox.hasClass('clicked') && this.turnsPlayed <= 9);
    }
}