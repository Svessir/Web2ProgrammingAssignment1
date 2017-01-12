
function RectTool(canvas){
    
    this.mouseDownCoordX;
    this.mouseDownCoordY;
    this.currentMouseCoordX;
    this.currentMouseCoordY;
    this.mouseIsDown = false;
    this.currentRectangle;
    this.canvas = canvas;

    this.mouseDown = function mouseDown(event){
        var canvasCoordDown = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.mouseDownCoordX = canvasCoordDown.x;
        this.mouseDownCoordY = canvasCoordDown.y;  // get coords of the mouse
        this.mouseIsDown = true;
        this.currentRectangle = new Rectange();
        this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.mouseDownCoordX, this.mouseDownCoordY);
        this.canvas.addObject(this.currentRectangle);
        this.canvas.update();
    };

    this.mouseMove = function mouseMove(event){
        if (this.mouseIsDown){
            var canvasCoordMove = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
            this.currentMouseCoordX = canvasCoordMove.x;
            this.currentMouseCoordY = canvasCoordMove.y;
            this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.currentMouseCoordX, this.currentMouseCoordY);
            this.canvas.update();
        }
    };

    this.mouseUp = function mouseUp(event){
        this.mouseIsDown = false;
    }
}