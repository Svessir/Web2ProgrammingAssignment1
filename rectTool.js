
/**
 * Tool that handles creation of Rectangles on the canvas.
 */
function RectTool(canvas){
    
    this.mouseDownCoordX;
    this.mouseDownCoordY;
    this.currentMouseCoordX;
    this.currentMouseCoordY;
    this.mouseIsDown = false;
    this.currentRectangle;
    this.canvas = canvas;
}

/**
 * Instantiates a rectangle on the canvas.
 */
RectTool.prototype.mouseDown = function mouseDown(event){
    if(this.mouseIsDown == true)
        return;

    var canvasCoordDown = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
    this.mouseDownCoordX = canvasCoordDown.x;
    this.mouseDownCoordY = canvasCoordDown.y;  // get coords of the mouse
    this.mouseIsDown = true;
    this.currentRectangle = new Rectangle();
    this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.mouseDownCoordX, this.mouseDownCoordY);
    this.canvas.addObject(this.currentRectangle);
    this.canvas.update();
};

/**
 * Modifies the rectangle that has been instantiated on the canvas.
 */
RectTool.prototype.mouseMove = function mouseMove(event){
    if (this.mouseIsDown){
        var canvasCoordMove = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.currentMouseCoordX = canvasCoordMove.x;
        this.currentMouseCoordY = canvasCoordMove.y;
        this.currentRectangle.setCoordinates(this.mouseDownCoordX, this.mouseDownCoordY, this.currentMouseCoordX, this.currentMouseCoordY);
        this.canvas.update();
    }
};

/**
 * Releases the rectangle and instantiates a command object that can undo and redo
 * the work that has just been done on the object.
 */
RectTool.prototype.mouseUp = function mouseUp(event){
    this.mouseIsDown = false;
    this.canvas.addCommand(new CreationCommand(this.currentRectangle, this.canvas));
}