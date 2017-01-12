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

    // Assign tool functions to canvas mouse event functions
    this.setTool(new RectTool(this)); // Insert default tool
}

/**
 * Clears the canvas and draws all objects
 * in the canvas object list back to the canvas.
 */
Canvas.prototype.update = function update() {
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

/**
 * Set a new tool for the canvas
 */
Canvas.prototype.setTool = function setTool(tool) {
    this.canvasElement.onmousedown = function(event) {tool.mouseDown(event)};
    this.canvasElement.onmousemove  = function(event) {tool.mouseMove(event)};
    this.canvasElement.onmouseup = function(event) {tool.mouseUp(event)};
}