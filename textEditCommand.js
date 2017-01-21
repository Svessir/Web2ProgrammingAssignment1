/**
 * Command that handles editing text
 */
class TextEditCommand {
    
    constructor(textObject, canvas, beforeText, afterText) {
        this.textObject = textObject;
        this.canvas = canvas;
        this.beforeText = beforeText;
        this.afterText = afterText;
    }

    /**
     * applies the reversed moveVector on the objects
     */
    undo() {
        this.textObject.setText(this.beforeText);
        this.canvas.update();
    }

    /**
     * applies the moveVector on the objects
     */
    redo() {
        this.textObject.setText(this.afterText);
        this.canvas.update();
    }
}