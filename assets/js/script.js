/**
 * Created by Tom's Desktop on 11/25/2016.
 */

"use strict";
var cross  = "url('assets/images/cross.png')";          //'X'
var circle = "url('assets/images/circle.png')";         //'O'
var turn = 1;

$(function () {
    $('td').click(function () {
        var clickedBox = $(this);
        if(turn === 1){
            clickedBox.css('background-image',cross).fadeIn("slow");
            return turn = 2;
        }
        if(turn === 2){
            clickedBox.css('background-image',circle).fadeIn("slow");
            return turn = 1;
        }

    });
}(jQuery));


function changeState(turn,clicked) {




}