
function RectTool(canvas){
    
    this.mouseDownCoordX;
    this.mouseDownCoordY;
    this.mouseUpCoordX;
    this.mouseUpCoordY;
    this.mouseIsDown = false;
    this.currentRectangle;
    this.canvas = canvas;

    this.mouseDown = function mouseDown(event){
        this.mouseDownCoordX = event.clientX;
        this.mouseDownCoordY = event.clientY;  // get coords of the mouse
        this.mouseUpCoordX = event.clientX;
        this.mouseUpCoordY = event.clientY;
        this.mouseIsDown = true;
        this.currentRectangle = new Rectange();
        this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.mouseUpCoordX, this.mouseUpCoordY);
        this.canvas.addObject(this.currentRectangle);
        this.canvas.update();
    };

    this.mouseMove = function mouseMove(event){
        if (this.mouseIsDown){
            this.mouseUpCoordX = event.clientX;
            this.mouseUpCoordY = event.clientY;
            this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.mouseUpCoordX, this.mouseUpCoordY);
            this.canvas.update();
        }
    };

    this.mouseUp = function mouseUp(event){
        this.mouseUpCoordX = event.clientX;
        this.mouseUpCoordY = event.clientY;
        this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.mouseUpCoordX, this.mouseUpCoordY);
        this.canvas.update();
        this.mouseIsDown = false;
    }
}