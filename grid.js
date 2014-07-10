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
                    cells[outrow][outcol][inrow][incol] = new Array();
                    var cell = r.iterateNext();
                    cell.value = "";
                    cells[outrow][outcol][inrow][incol][0] = cell;
                    cells[outrow][outcol][inrow][incol][1] = false;
                    cells[outrow][outcol][inrow][incol][2] = false;
                    cells[outrow][outcol][inrow][incol][3] = false;
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
            cells[w][ಠ_ಠ(x-!z,3)][y][ಠ_ಠ(z-1,3)][0].focus();
        } else if (keycode == 38) {
            cells[ಠ_ಠ(w-!y,3)][x][ಠ_ಠ(y-1,3)][z][0].focus();
        } else if (keycode == 39) {
            cells[w][(x+π(z,2))%3][y][(z+1)%3][0].focus();
        } else if (keycode == 40) {
            cells[(w+π(y,2))%3][x][(y+1)%3][z][0].focus();
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
    paint();
}

function paint() {
    var w,x,y,z;
    for (w = 0; w < 3; w++) {
        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                for (z = 0; z < 3; z++) {
                    var temp = cells[w][x][y][z];
                    if(temp[1] || temp[2] || temp[3]) {
                        cells[w][x][y][z][0].style.backgroundColor = "#CD9B9B";
                    } else {
                        cells[w][x][y][z][0].style.backgroundColor = "#D3D3D3";
                    }
                }
            }
        }
    }
}

function checkRow([w,x,y,z]) {
    var nums = [];
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = cells[w][a][y][b][0].value;
            if (nums[val] == 1 && val != "") {
                for (x = 0; x < 3; x++) {
                    for (z = 0; z < 3; z++) {
                        cells[w][x][y][z][1] = true;
                    }
                }
                return;
            } else {
                nums[val] = 1;
            }
        }
    }
    for (x = 0; x < 3; x++) {
        for (z = 0; z < 3; z++) {
            cells[w][x][y][z][1] = false;
        }
    }
}

function checkCol([w,x,y,z]) {
    var nums = []; 
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = cells[a][x][b][z][0].value;
            if (nums[val] == 1 && val != "") {
                for (w = 0; w < 3; w++) {
                    for (y = 0; y < 3; y++) {
                        cells[w][x][y][z][2] = true;
                    }
                }
                return;
            } else {
                nums[val] = 1;
            }
        }
    }
    for (w = 0; w < 3; w++) {
        for (y = 0; y < 3; y++) {
            cells[w][x][y][z][2] = false;
        }
    }
}

function checkBox([w,x,y,z]) {
    var nums = [];
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = cells[w][x][a][b][0].value;
            if (nums[val] == 1 && val != "") {    
                for (y = 0; y < 3; y++) {
                    for (z = 0; z < 3; z++) {
                        cells[w][x][y][z][3] = true;
                    }
                }
                return;
            } else {
                nums[val] = 1;
            }
        }
    }
    for (y = 0; y < 3; y++) {
        for (z = 0; z < 3; z++) {
            cells[w][x][y][z][3] = false;
        }
    }
}

function getCoordinates(input) {
    var w,x,y,z;
    for (var i = 0; i < 81; i++) {
        w=π(i,27);x=π(i,9)%3;y=π(i,3)%3;z=i%3;
        if (cells[w][x][y][z][0] == input) {
            break;
        }
    }
    return [w,x,y,z];
}


function π(x,y) {
    return x/y|0;
}

function ಠ_ಠ(x,y) {
    return ((x%y)+y)%y;
}
