/**
 * The text tool handles writing text on the canvas
 */
function TextTool(canvas, textAreaElement) {
    this.canvas = canvas;
    this.mouseDownPoint;
    this.isMouseDown = false;
    this.currentText = null;
    this.textAreaElement = textAreaElement;

    // Assign event functions.
    var textTool = this;
    this.textAreaElement.keydown(function(event) {textTool.keyDown(event)});
}

/**
 * Creates a text box if a text box was not hit else it 
 * selects that text box for edit mode.
 */
TextTool.prototype.mouseDown = function mouseDown(event){
    this.isMouseDown = true;
    this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
    var hit = this.canvas.getFirstObjectHit(this.mouseDownPoint.x, this.mouseDownPoint.y);

    if(hit instanceof Text) {
        if(this.currentText != null)
            this.currentText.isEdit(false);
        this.currentText = hit;
    }
    else
        this.currentText = new Text();
}

/**
 * Modifies the size of the text box.
 */
TextTool.prototype.mouseMove = function mouseMove(event){
}

/**
 * Releases the text box but keeps the text box open in edit mode.
 */
TextTool.prototype.mouseUp = function mouseUp(event){
    this.isMouseDown = false;
}

/**
 * Keydown function that will be called when the textarea receives a keydown
 * down event. Handles input to the current text object.
 */
TextTool.prototype.keyDown = function keyDown(event){
}