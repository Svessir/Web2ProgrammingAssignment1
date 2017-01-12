
/**
 * Command that handles object creation.
 */
function CreationCommand(canvasDrawable, canvas) {
    this.canvas = canvas;
    this.object = canvasDrawable;
}

/**
 * Removes the object from the canvas.
 */
CreationCommand.prototype.undo = function undo() {
    this.canvas.removeObject(this.object);
    this.canvas.update();
}

/**
 * Adds the object to the canvas.
 */
CreationCommand.prototype.redo = function redo() {
    this.canvas.addObject(this.object);
    this.canvas.update();
}