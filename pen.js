class Pen extends Shape {
    constructor(){
        super();
        this.currentDrawing = [];
    }

    draw(ctx){
        if (this.isHighlight){
            for (var i = 0; i < this.currentDrawing.length; i++){
                this.currentDrawing[i].drawHighlight(ctx);
            }
        }
        for (var i = 0; i < this.currentDrawing.length; i++){
            this.currentDrawing[i].draw(ctx);
        }
    }

    move(vector2D){
        for (var i = 0; i < this.currentDrawing.length; i++){
            this.currentDrawing[i].move(vector2D);
        }
    }

    containsCoordinates(x,y){
        for (var i = 0; i < this.currentDrawing.length; i++){
            if (this.currentDrawing[i].containsCoordinates(x,y)){
                return true;
            }
        }
        return false;
    }
}