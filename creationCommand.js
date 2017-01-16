
/**
 * Command that handles object creation.
 */
class CreationCommand {

    constructor(canvasDrawable, canvas) {
        this.canvas = canvas;
        this.object = canvasDrawable;
    }

    /**
     * Removes the object from the canvas.
     */
    undo() {
        this.canvas.removeObject(this.object);
        this.canvas.update();
    }

    /**
     * Adds the object to the canvas.
     */
    redo() {
        this.canvas.addObject(this.object);
        this.canvas.update();
    }
}