
/**
 * Tool that handles creation of Circles on the canvas.
 */
function CircleTool(canvas){
    this.mouseDownPoint;
    this.isMouseDown = false;
    this.currentCircle;
    this.canvas = canvas;
}

/**
 *  Instansiates a circle on the canvas.
 */
CircleTool.prototype.mouseDown = function mouseDown(event){
    if (this.isMouseDown)
        return;

    this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
    this.isMouseDown = true;
    this.currentCircle = new Circle();
    this.currentCircle.setCircleInfo(this.mouseDownPoint.x, this.mouseDownPoint.y, this.mouseDownPoint.x, this.mouseDownPoint.y);
    this.canvas.addObject(this.currentCircle);
    this.canvas.update();
    console.log(this);
}

/**
 * Modifies the circle that has be instansiated on the canvas.
 */
CircleTool.prototype.mouseMove = function mouseMove(event){
    if (this.isMouseDown){
        var currentPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.currentCircle.setCircleInfo(this.mouseDownPoint.x, this.mouseDownPoint.y, currentPoint.x, currentPoint.y);
        this.canvas.update();
        console.log(this);
    }
}

/**
 * Releases the circle and instantiates a command object that can undo and redo
 * the work that has just been done on the object.
 */
CircleTool.prototype.mouseUp = function mouseUp(event){
    this.isMouseDown = false;
    this.canvas.addCommand(new CreationCommand(this.currentCircle, this.canvas));
    this.currentCircle = null;
    console.log(this);
}

