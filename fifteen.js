"use strict";

window.onload = function() {
    var shuffle = document.getElementById("shufflebutton");

    var puzzlecontainer = document.getElementById("puzzlearea");
    var divs = puzzlecontainer.getElementsByTagName("div");

    var emptyTile = {
        y: 300,
        x: 300
    };


    run(divs, emptyTile, shuffle);

};


function show(tilearray) {
    for (var x = 0; x < tilearray.length; x++) {
        while (x < 4) {
            var y = (100 * (x));
            var z = (0);
            tilearray[x].style.left = y + "px";
            tilearray[x].style.top = z + "px";
            tilearray[x].style.backgroundPosition = -x*100+'px '+'0px';
            break;
        }
    }
    for (var x = 0; x < tilearray.length; x++) {
        while (x >= 4 && x < 8) {
            var y = (100 * (x - 4));
            var z = (100);
            tilearray[x].style.left = y + "px";
            tilearray[x].style.top = z + "px";
            tilearray[x].style.backgroundPosition = -(x-4)*100+'px '+'-100px';
            break;
        }
    }
    for (var x = 0; x < tilearray.length; x++) {
        while (x >= 8 && x < 12) {
            var y = (100 * (x - 8));
            var z = (100 * 2);
            tilearray[x].style.left = y + "px";
            tilearray[x].style.top = z + "px";
            tilearray[x].style.backgroundPosition = -(x-8)*100+'px '+'-200px';
            break;
        }
    }
    for (var x = 0; x < tilearray.length; x++) {
        if (x >= 12 && x < 16) {
            var y = (100 * (x - 12));
            var z = (100 * 3);
            tilearray[x].style.left = y + "px";
            tilearray[x].style.top = z + "px";
          	tilearray[x].style.backgroundPosition = -(x-12)*100+'px '+'-300px';
            
        }
    }

}



function move(emptyTile, div) {
    var xval = emptyTile.x;
    var yval = emptyTile.y;
    emptyTile.x = parseInt(div.style.left);
    emptyTile.y = parseInt(div.style.top);
    div.style.left = xval + "px";
    div.style.top = yval + "px";
}



function run(tilearray, emptyTile, shuffle) {

    show(tilearray);

    for (var x = 0; x < tilearray.length; x++) {
        tilearray[x].addClassName("puzzlepiece");
        tilearray[x].style.backgroundImage = "url('background.jpg')";


        tilearray[x].onmouseover = function() {
            if ((parseInt(this.style.top) == emptyTile.y) &&
                Math.abs(parseInt(this.style.left) - emptyTile.x) == 100 ||
                Math.abs(parseInt(this.style.top) - emptyTile.y) == 100 &&
                (parseInt(this.style.left) == emptyTile.x)) {
                this.addClassName("movablepiece");
            }
        };


        tilearray[x].onmousedown = function() {
            if (this.className == "puzzlepiece movablepiece") {
                if ((parseInt(this.style.top) == emptyTile.y) &&
                    (Math.abs(parseInt(this.style.left) - emptyTile.x) == 100)) {
                    move(emptyTile, this);

                } else if (Math.abs(parseInt(this.style.top) - emptyTile.y) <= 100 &&
                    (parseInt(this.style.left) == emptyTile.x)) {
                    move(emptyTile, this);
                }
            }
        };


        tilearray[x].onmouseout = function() {
            this.className = "puzzlepiece";
        };
    }


    shuffle.onmousedown = function() {
    	var scrambleamt=150;
    	var max=tilearray.length;
    	var min=1;
        for (var x = 0; x < scrambleamt; x++) {
            var index = Math.floor(Math.random() * (max - min)+min);
            move(emptyTile, tilearray[index]);
        var alerted = localStorage.getItem('alerted') || '';
        if (alerted != 'yes') {
       	alert("Shuffled! :)");
        localStorage.setItem('alerted','yes');
        }
           
            
       }
        
    };

}