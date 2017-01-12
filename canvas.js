/**
 * Canvas class contains the state of the
 * canvas.
 */
function Canvas(width, height, canvasContext) {
    this.width = width;
    this.height = height;
    this.canvasContext = canvasContext;
    this.canvasObjects = [];
    this.undoStack = [];
    this.redoStack = [];
}

/**
 * Clears the canvas and draws all objects
 * in the canvas object list back to the canvas.
 */
Canvas.prototype.update = function update() {

}