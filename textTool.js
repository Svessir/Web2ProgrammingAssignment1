/**
 * The text tool handles writing text on the canvas
 */
class TextTool extends Tool {

    constructor(canvas, textAreaElement) {
        super(canvas);
    }

    /**
     * Creates a text box if a text box was not hit else it 
     * selects that text box for edit mode.
     */
    mouseDown(event){
    }

    /**
     * Modifies the size of the text box.
     */
    mouseMove(event){
    }

    /**
     * Releases the text box but keeps the text box open in edit mode.
     */
    mouseUp(event){
    }

    /**
     * Keydown function that will be called when the textarea receives a keydown
     * down event. Handles input to the current text object.
     */
    keyDown(event){
    }
}