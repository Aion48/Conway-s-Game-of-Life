window.onload = function() {

    
var numberofboxes = readInt("Length of each side?");

var grid = new Grid(numberofboxes, numberofboxes);
grid.init(0);


var lifeOn = false;
function start(){
    setUp();
    mouseClickMethod(placeSquare);
    keyDownMethod(keyDown);
}
function keyDown(e){
    if(lifeOn == false){
        lifeOn = true;
        life();
        setTimer(life, 100);
    }
}
var time=0;
function life() {

    var copyGrid = new Grid(numberofboxes, numberofboxes);
    for(var gridx = 0; gridx < numberofboxes; gridx++){
        for(var gridy = 0; gridy < numberofboxes; gridy++){
            copyGrid.set(gridx,gridy,grid.get(gridx,gridy));
        }
    }

    for(var x = 0; x < numberofboxes; x++){
        for(var y = 0; y < numberofboxes; y++){
            var neihbors = getNeibhors(x,y);
            if(grid.get(x,y)==1){
                println(x+","+y+","+neihbors);
            }
                if(neihbors == 3 || (neihbors == 2 && grid.get(x,y) == 1)){
                    copyGrid.set(x,y,1);
                }
                if(neihbors <= 1){
                    copyGrid.set(x,y,0);
                }else if(neihbors >= 4){
                    copyGrid.set(x,y,0);
                }
            
        }
    }
  
    grid = copyGrid;
    for(var i = 0; i < numberofboxes; i++){
        for(var h = 0; h < numberofboxes; h++){
            if(copyGrid.get(h,i) == 1){
                eval("add(villager" + i + "_" + h + ")");  
            }else{
                eval("remove(villager" + i + "_" + h + ")");
            }
        }
    }
    
}
function getNeibhors(x,y) {
    var count = 0;
    if(y != 0 ){
        if(grid.get(x,y- 1) == 1){
            //println("k")
            count++;
        }
        if(x != 0 ){
            if(grid.get(x- 1,y- 1) == 1){
                count++;
            }
        }
        if(x != (numberofboxes- 1)){
            if(grid.get(x+ 1,y- 1) == 1){
                count++;
            }
        }
    }
    if(y != (numberofboxes- 1)){
        if(grid.get(x,y+ 1) == 1){
            count++;
        }
        if(x != 0 ){
            if(grid.get(x- 1,y+ 1) == 1){
                count++;
            }
        }
        if(x != (numberofboxes- 1)){
            if(grid.get(x+ 1,y+ 1) == 1){
                count++;
            }
        }
    }
    if(x != 0){
        if(grid.get(x- 1,y) == 1){
            count++;
        }
    }
    if(x != (numberofboxes- 1)){
        if(grid.get(x+ 1,y) == 1){
            count++;
        }
    }
    
    return count;
}
function  setUp(){
    
    for(var i = 0; i < numberofboxes; i++){
        var line = new Line(i * (getWidth()/numberofboxes),0,i * (getWidth()/numberofboxes),getHeight()-((80/480) * getWidth()));
        add(line);
    }
    for(var i = 0; i < numberofboxes + 1; i++){
        var line = new Line(0,i * ((getHeight()-((80/480) * getWidth()))/numberofboxes),getWidth(),i * ((getHeight()-((80/480) * getWidth()))/numberofboxes));
        add(line);
    }
    for(var i = 0; i < numberofboxes; i++){
        for(var h = 0; h < numberofboxes; h++){
           eval("window.box" + i + "_" + h + " = false;");   
        }
    }
    for(var i = 0; i < numberofboxes; i++){
        for(var h = 0; h < numberofboxes; h++){
           eval("window.villager" + i + "_" + h + " = new Rectangle((getWidth()/numberofboxes),(getWidth()/numberofboxes));");
            eval("villager" + i + "_" + h + ".setPosition(" + (i * (getWidth()/numberofboxes)) + "," + h * ((getHeight()-((80/480) * getWidth()))/numberofboxes) + ");")
        }
    }
    
}

function placeSquare(e){
    if(lifeOn == false){
        for(var i = 0; i < numberofboxes; i++){
            if(e.getX() >= (i * (getWidth()/numberofboxes)) && e.getX() <= ((i+ 1) * (getWidth()/numberofboxes)) ){
                for(var h = 0; h < numberofboxes; h++){
                    if(e.getY() >= h * ((getHeight()-((80/480) * getWidth()))/numberofboxes) && e.getY() <= (h+ 1) * ((getHeight()-((80/480) * getWidth()))/numberofboxes)){
                        var cubethere = eval("box" + i + "_" + h);
                        if(cubethere == false){
                            eval("grid.set(" + h + "," + i + ",1);")
                            eval("add(villager" + i + "_" + h + ")");  
                            eval("box" + i + "_" + h + " = true");
                        }else{
                            eval("grid.set(" + h + "," + i + ",0);")
                            eval("remove(villager" + i + "_" + h + ")");
                            eval("box" + i + "_" + h + " = false");
                        }
                    }
                }
                    
            }
            
        }
    }
    println(grid);
}


    if (typeof start === 'function') {
        start();
    }
};
