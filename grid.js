var cells;

window.onload = function () {
    var count = 1;
    var outrow, outcol, inrow, incol;
    var xp = "//input[@maxlength='1']";
    var r = document.evaluate(xp,document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
    cells = new Array();
    for (outrow = 0; outrow < 3; outrow++) {
        cells[outrow] = new Array();
        for (outcol = 0; outcol < 3; outcol++) {
            cells[outrow][outcol] = new Array();
            for (inrow = 0; inrow < 3; inrow++) {
                cells[outrow][outcol][inrow] = new Array();
                for (incol = 0; incol < 3; incol++) {
                    var cell = r.iterateNext();
                    cell.value = "";
//                    cell.conflict = [false, false, false];  // Row, Col, Box
                    cells[outrow][outcol][inrow][incol] = cell;
                    count = count + 1;
                }
            }
        }
    }        
};

function clearField(e,input) {
    var keycode = e.which || e.keyCode;
    if (e.shiftKey) {
        e.preventDefault();
    } else if (keycode == 8 || keycode == 46 || (48 < keycode && keycode < 58)) {
        input.value = "";
        setTimeout(function() {checkValid(input);});
    } else if (36 < keycode && keycode < 41) {
        var w,x,y,z;
        [w,x,y,z] = getCoordinates(input);
        if (keycode == 37) {
            cells[w][ಠ_ಠ(x-!z,3)][y][ಠ_ಠ(z-1,3)].focus();
        } else if (keycode == 38) {
            cells[ಠ_ಠ(w-!y,3)][x][ಠ_ಠ(y-1,3)][z].focus();
        } else if (keycode == 39) {
            cells[w][(x+π(z,2))%3][y][(z+1)%3].focus();
        } else if (keycode == 40) {
            cells[(w+π(y,2))%3][x][(y+1)%3][z].focus();
        }
    } else {
        e.preventDefault();
    }
}

function checkValid(input) {
    var coords = getCoordinates(input);
    checkRow(coords);
    checkCol(coords);
    checkBox(coords);
    //checkRowConflicts(coords);
    //checkColConflicts(coords);
    //checkBoxConflicts(coords);
}

function checkRow([w,x,y,z]) {
    var val = cells[w][x][y][z].value;
    if (val == "") return;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            if ((a != x || b != z) && cells[w][a][y][b].value == val) {
                for (x = 0; x < 3; x++) {
                    for (z = 0; z < 3; z++) {
                        cells[w][x][y][z].style.backgroundColor = "#CD9B9B";
                       // cells[w][x][y][z].conflicts[0] = true;
                    }
                }
                return;
            }
        }
    }
}

function checkCol([w,x,y,z]) {
    var val = cells[w][x][y][z].value;
    if (val == "") return;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            if ((a != w || b != y) && cells[a][x][b][z].value == val) {
                for (w = 0; w < 3; w++) {
                    for (y = 0; y < 3; y++) {
                        cells[w][x][y][z].style.backgroundColor = "#CD9B9B";
                        //cells[w][x][y][z].conflicts[1] = true;
                    }
                }
                return;
            }
        }
    }
}

function checkBox([w,x,y,z]) {
    var val = cells[w][x][y][z].value;
    if (val == "") return;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            if ((a != y || b != z) && cells[w][x][a][b].value == val) {
                for (y = 0; y < 3; y++) {
                    for (z = 0; z < 3; z++) {
                        cells[w][x][y][z].style.backgroundColor = "#CD9B9B";
                        //cells[w][x][y][z].conflicts[2] = true;
                    }
                }
                return;
            }
        }
    }


}

function getCoordinates(input) {
    var w,x,y,z;
    for (var i = 0; i < 81; i++) {
        w=π(i,27);x=π(i,9)%3;y=π(i,3)%3;z=i%3;
        if (cells[w][x][y][z] == input) {
            break;
        }
    }
    return [w,x,y,z];
}

funct

function π(x,y) {
    return x/y|0;
}

function ಠ_ಠ(x,y) {
    return ((x%y)+y)%y;
}
