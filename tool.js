/**
 * Abstract class for tools
 */
class Tool {

    /**
     * A Tool must have a reference to the canvas so it
     * can update it.
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.isMouseDown = false;
        this.mouseDownPoint;
    }

    /**
     * The function that will be called if this tool is selected
     * and the mouse is pressed down.
     */
    mouseDown(event){
    }

    /**
     * The function that will be called if this tool is selected
     * and the mouse is moving.
     */
    mouseMove(event){
    }

    /**
     * The function that will be called if this tool is selected
     * and the mouse button is released.
     */
    mouseUp(event){
    }
}