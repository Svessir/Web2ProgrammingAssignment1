/**
 * Canvas class contains the state of the
 * canvas.
 */
function Canvas(canvasElement) {
    this.canvasElement = canvasElement;
    this.canvasContext = canvasElement.getContext("2d");;
    this.canvasObjects = [];
    this.undoStack = [];
    this.redoStack = [];
    this.width = canvasElement.width;
    this.height = canvasElement.height;
    this.i = 0;

    // Assign tool functions to canvas mouse event functions
    this.setTool(new RectTool(this)); // Insert default tool
}

/**
 * Clears the canvas and draws all objects
 * in the canvas object list back to the canvas.
 */
Canvas.prototype.update = function update() {
    this.canvasContext.clearRect(0,0,this.width, this.height);
    for (var i = 0; i < this.canvasObjects.length; i++){
        this.canvasObjects[i].draw(this.canvasContext);
    }
}

/**
 * Adds an object to the list of objects in the canvas
 */
Canvas.prototype.addObject = function addObject(drawable) {
    this.canvasObjects.push(drawable);
}

/**
 * Removes the first instance of the object in backward creation order.
 */
Canvas.prototype.removeObject = function removeObject(drawable) {
    // TODO: implement
}

Canvas.prototype.getCanvasCoordinates = this.getCanvasCoordinates = function(x,y) {
    var rect = this.canvasElement.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

/**
 * Set a new tool for the canvas
 */
Canvas.prototype.setTool = function setTool(tool) {
    this.canvasElement.onmousedown = function(event) {tool.mouseDown(event)};
    this.canvasElement.onmousemove  = function(event) {tool.mouseMove(event)};
    this.canvasElement.onmouseup = function(event) {tool.mouseUp(event)};
}