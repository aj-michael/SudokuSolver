var _,$,$$;

window.onload = function () {
    initialize_();

};


function initialize_() {
    var outrow, outcol, inrow, incol;
    var xp = "//input[@maxlength='1']";
    var r = document.evaluate(xp,document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
    _ = new Array();
    for (outrow = 0; outrow < 3; outrow++) {
        _[outrow] = new Array();
        for (outcol = 0; outcol < 3; outcol++) {
            _[outrow][outcol] = new Array();
            for (inrow = 0; inrow < 3; inrow++) {
                _[outrow][outcol][inrow] = new Array();
                for (incol = 0; incol < 3; incol++) {
                    _[outrow][outcol][inrow][incol] = new Array();
                    var cell = r.iterateNext();
                    cell.value = "";
                    _[outrow][outcol][inrow][incol][0] = cell;
                    _[outrow][outcol][inrow][incol][1] = false;
                    _[outrow][outcol][inrow][incol][2] = false;
                    _[outrow][outcol][inrow][incol][3] = false;
                }
            }
        }
    }        
}

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
            _[w][ಠ_ಠ(x-!z,3)][y][ಠ_ಠ(z-1,3)][0].focus();
        } else if (keycode == 38) {
            _[ಠ_ಠ(w-!y,3)][x][ಠ_ಠ(y-1,3)][z][0].focus();
        } else if (keycode == 39) {
            _[w][(x+π(z,2))%3][y][(z+1)%3][0].focus();
        } else if (keycode == 40) {
            _[(w+π(y,2))%3][x][(y+1)%3][z][0].focus();
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
                    var temp = _[w][x][y][z];
                    if(temp[1] || temp[2] || temp[3]) {
                        _[w][x][y][z][0].style.backgroundColor = "#CD9B9B";
                    } else {
                        _[w][x][y][z][0].style.backgroundColor = "#D3D3D3";
                    }
                }
            }
        }
    }
}

function checkRow([w,x,y,z]) {
    var nums = [];
    var a, b;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = _[w][a][y][b][0].value;
            if (a > nums[val] > 0 && val != "") {
                for (x = 0; x < 3; x++) {
                    for (z = 0; z < 3; z++) {
                        _[w][x][y][z][1] = true;
                    }
                }
                return;
            } else {
                nums[val] = a;
            }
        }
    }
    for (x = 0; x < 3; x++) {
        for (z = 0; z < 3; z++) {
            _[w][x][y][z][1] = false;
        }
    }
}

function checkCol([w,x,y,z]) {
    var nums = []; 
    var a, b;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = _[a][x][b][z][0].value;
            if (a > nums[val] > 0 && val != "") {
                for (w = 0; w < 3; w++) {
                    for (y = 0; y < 3; y++) {
                        _[w][x][y][z][2] = true;
                    }
                }
                return;
            } else {
                nums[val] = a;
            }
        }
    }
    for (w = 0; w < 3; w++) {
        for (y = 0; y < 3; y++) {
            _[w][x][y][z][2] = false;
        }
    }
}

function checkBox([w,x,y,z]) {
    var nums = [];
    var a, b;
    for (a = 0; a < 3; a++) {
        for (b = 0; b < 3; b++) {
            var val = _[w][x][a][b][0].value;
            if (nums[val] == 1 && val != "") {    
                for (y = 0; y < 3; y++) {
                    for (z = 0; z < 3; z++) {
                        _[w][x][y][z][3] = true;
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
            _[w][x][y][z][3] = false;
        }
    }
}

function getCoordinates(input) {
    var w,x,y,z;
    for (var i = 0; i < 81; i++) {
        w=π(i,27);x=π(i,9)%3;y=π(i,3)%3;z=i%3;
        if (_[w][x][y][z][0] == input) {
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

function solve() {
    console.log("Let's get down to business");
    initialize$();


}

var $$;     // row validity

function initialize$() {
    $ = new Array(); 
    $$ = new Array();
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {                    
                    for (var r = 0; r < 9; r++) {
                        $.push(arr);
                    }
                    var val = _[w][x][y][z][0].value;
                    console.log(val);
                    var arr = [];
                    for (var c = 729; c--;) arr.push(0);
                    if (val == "") {
                        for (var r = 0; r < 9; r++) {
                            $.push(arr);
                        }
                    } else {
                        $.push(arr);
                    }
                }
            }
        }
    }
}

function printIt() {
    var outrow, outcol, inrow, incol;
    for (outrow = 0; outrow < 3; outrow++) {
        for (inrow = 0; inrow < 3; inrow++) {
            var s = "|";
            for (outcol = 0; outcol < 3; outcol++) {
                for (incol = 0; incol < 3; incol++) {
                    var v = _[outrow][outcol][inrow][incol][0].value;
                    if (v == "") v = "-";
                    s = s + v;
                }
                s = s + "|";
            }
            console.log(s);
        }
    }
}
