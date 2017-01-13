
/**
 * Tool that handles creation of Circles on the canvas.
 */
function CircleTool(canvas){
    this.mouseDownCoordX;
    this.mouseDownCoordY;
    this.currentMouseCoordX;
    this.currentMouseCoordY;
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

    this.mouseDownCoordX = event.clientX;
    this.mouseDownCoordY = event.clientY;
    this.mouseUpCoordX = event.clientX;
    this.currentMouseCoordX = event.clientY;
    this.isMouseDown = true;
    this.currentCircle = new Circle();
    this.currentCircle.setCircleInfo(this.mouseDownCoordX, this.mouseDownCoordY, this.currentMouseCoordX, this.currentMouseCoordY);
    this.canvas.addObject(this.currentCircle);
    this.canvas.update();
    console.log(this);
}

/**
 * Modifies the circle that has be instansiated on the canvas.
 */
CircleTool.prototype.mouseMove = function mouseMove(event){
    if (this.isMouseDown){
        this.currentMouseCoordX = event.clientX;
        this.currentMouseCoordY = event.clientY;
        this.currentCircle.setCircleInfo(this.mouseDownCoordX, this.mouseDownCoordY, this.currentMouseCoordX, this.currentMouseCoordY);
        console.log(this);
    }
}

/**
 * Releases the circle and instantiates a command object that can undo and redo
 * the work that has just been done on the object.
 */
CircleTool.prototype.mouseUp = function mouseUp(event){
    this.currentMouseCoordX = event.clientX;
    this.currentMouseCoordY = event.clientY;
    this.currentCircle.setCircleInfo(this.mouseDownCoordX, this.mouseDownCoordY, this.currentMouseCoordX, this.currentMouseCoordY);
    this.isMouseDown = false;
    console.log(this);
}