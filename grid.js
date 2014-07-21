var _,$,$$;

window.onload = function () {
    initialize_();
    initialize$();
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
        //[w,x,y,z] = getCoordinates(input);
        w = getCoordinates(input)[0];
        x = getCoordinates(input)[1];
        y = getCoordinates(input)[2];
        z = getCoordinates(input)[3];
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

function checkAll() {
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    _[w][x][y][z][1] = false;
                    _[w][x][y][z][2] = false;
                    _[w][x][y][z][3] = false;
                }
            }
        }
    }
    checkAllRows();
    checkAllCols();
    checkAllBoxes();
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

function checkAllRows() {
    for (var w = 0; w < 3; w++) {
        for (var y = 0; y < 3; y++) {
            var nums = [];
            for (var x = 0; x < 3; x++) {
                for (var z = 0; z < 3; z++) {
                    var val = _[w][x][y][z][0].value;
                    if (x > nums[val] > 0 && val != "") {
                        for (x = 0; x < 3; x++) {
                            for (z = 0; z < 3; z++) {
                                _[w][x][y][z][1] = true;
                            }
                        }
                    } else {
                        nums[val] = x;
                    }
                }
            }
        }
    }
}

function checkAllCols() {
    for (var x = 0; x < 3; x++) {
        for (var z = 0; z < 3; z++) {
            var nums = [];
            for (var w = 0; w < 3; w++) {
                for (var y = 0; y < 3; y++) {
                    var val = _[w][x][y][z][0].value;
                    if (w > nums[val] > 0 && val != "") {
                        for (w = 0; w < 3; w++) {
                            for (y = 0; y < 3; y++) {
                                _[w][x][y][z][2] = true;
                            }
                        }
                    } else {
                        nums[val] = w;
                    }
                }
            }
        }
    }
}

function checkAllBoxes() {
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            var nums = [];
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    var val = _[w][x][y][z][0].value;
                    if (nums[val] > 0 && val != "") {
                        for (y = 0; y < 3; y++) {
                            for (z = 0; z < 3; z++) {
                                _[w][x][y][z][3] = true;
                            }
                        }   
                    } else {
                        nums[val] = 1;
                    }
                }   
            }
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
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    if (_[w][x][y][z][0].style.backgroundColor == "rgb(205, 155, 155)") {
                        alert("No solution.");
                        return;
                    }
                }
            }
        }
    }
    initialize$$();
    if (!solver()) {
        alert("No possible solution.");
    }
}

function solver() {
    var col = $$.right;
    if (col == $$) {
        return true;
    }
    if (col.down == col) {
        return false;
    }
    remove(col);
    for (var cnode = col.down; cnode != col; cnode = cnode.down) {
        for (var rnode = cnode.right; rnode != cnode; rnode = rnode.right) {
            remove(rnode.head);
        }
        if (solver()==true) {
            var w = cnode.row/243|0;
            var x = (cnode.row/81|0)%3;
            var y = (cnode.row/27|0)%3;
            var z = (cnode.row/9 |0)%3;
            var val = cnode.row % 9 + 1;
            _[w][x][y][z][0].value = val;
            return true;
        }
        for (var rnode = cnode.left; rnode != cnode; rnode = rnode.left) {
            reinstate(rnode.head);
        }
    }
    reinstate(col);
    return false;
}

function remove(col) {
    col.left.right = col.right;
    col.right.left = col.left;
    for (var cnode = col.down; cnode != col; cnode = cnode.down) {    
        for (var rnode = cnode.right; rnode != cnode; rnode = rnode.right) {
            rnode.up.down = rnode.down;
            rnode.down.up = rnode.up;
        }
    }
}

function reinstate(col) {
    for (var cnode = col.up; cnode != col; cnode = cnode.up) {
        for (var rnode = cnode.left; rnode != cnode; rnode = rnode.left) {
            rnode.down.up = rnode;
            rnode.up.down = rnode;
        }
    }
    col.right.left = col;
    col.left.right = col
}

function initialize$() {
    $ = new Array(); 
    var r = 0;
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    for (var val = 0; val < 9; val++) {
                        var row = [];
                        for (var i = 0; i < 81; i++) { // value in cell
                            row[i] = i == 27*w+9*x+3*y+z;
                        }
                        for (var i = 0; i < 81; i++) {
                            row[i+81] = (val == i%9 && 3*w+y == π(i,9));
                        }
                        for (var i = 0; i < 81; i++) { // value in col
                            row[i+162] = (val == i%9 && 3*x+z == π(i,9));
                        }
                        for (var i = 0; i < 81; i++) { // value in box
                            row[i+243] = (val == i%9 && 3*w+x == π(i,9));
                        }
                        $[r] = row;
                        r++;
                    }
                }
            }
        }
    }
}

function initialize$$() {
    var rows = [];
    var cols = [];
    for (var i = 0; i < 324; i++) {
        cols[i] = [{col: i, header: "IM A HEADER"}];
    }
    for (var r = 0; r < 729; r++) {
        rows[r] = [];
        for (var c = 0; c < 324; c++) {
            if ($[r][c] == true) {
                var node = {
                    row: r,
                    col: c,
                    head: cols[c][0]
                };
                rows[r].push(node);
                cols[c].push(node);
            }
        }
    }
    for (var c = 0, ncols = cols.length; c < ncols; c++) { 
        var nrows = cols[c].length;
        for (var r = 0; r < nrows; r++) {
            cols[c][r]['up'] = cols[c][((r-1)%nrows+nrows)%nrows];
            cols[c][r]['down'] = cols[c][(r+1)%nrows];
        }
    }
    for (var r = 0; r < rows.length; r++) {
        var ncols = rows[r].length;
        for (var c = 0; c < ncols; c++) {
            rows[r][c]['left'] = rows[r][((c-1)%ncols+ncols)%ncols];
            rows[r][c]['right'] = rows[r][(c+1)%ncols];
        }
    }
    $$ = {row: 0, col: -1};
    cols.push([$$]);
    var n = cols.length;
    for (var c = 0; c < n; c++) {
        cols[c][0]['left'] = cols[((c-1)%n+n)%n][0];
        cols[c][0]['right'] = cols[(c+1)%n][0];
    }
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    var val = _[w][x][y][z][0].value;
                    if (val != "") {
                        val = parseInt(val);
                        var r = (27*w+9*x+3*y+z)*9 + val - 1;
                        var startnode = rows[r][0];
                        for (var rnode = startnode.right; rnode != startnode; rnode = rnode.right) {
                            remove(rnode.head);
                        }   
                        remove(rnode.head);
                    }
                }
            }
        }
    }
}

function clearAll() {
    for (var w = 0; w < 3; w++) {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    _[w][x][y][z][0].value = "";
                }
            }
        }
    }
    checkAll();
}
