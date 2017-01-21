/**
 * The text tool handles writing text on the canvas
 */
class TextTool extends Tool {

    constructor(canvas, textAreaElement, widthElement) {
        super(canvas);
        this.textAreaElement = textAreaElement;
        this.widthElement = widthElement;
        this.currentText = null;
        this.isEditing = false;
        this.textSettings = new TextSettings(40, "Arial", "red");
        this.oldText = null;

        var textTool = this;
        this.textAreaElement.keyup(function (event) {textTool.keyUp(event)});
        this.textAreaElement.blur(function(event) {textTool.onTextEditorExit(event)});
        this.textAreaElement.on("focus", function(event){textTool.onTextEditorEnter(event)});
    }

    /**
     * Creates a text box if a text box was not hit else it 
     * selects that text box for edit mode.
     */
    mouseDown(event){
        if(this.isEditing)
            return;
        
        this.isEditing = true;
        this.isMouseDown = true;
        this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        var hit = this.canvas.getFirstObjectHit(this.mouseDownPoint.x, this.mouseDownPoint.y);
        var leftOffset, topOffset;

        if(hit !== null) {
            this.currentText = hit;
            var point = this.canvas.getScreenCoordinates(this.currentText.getOrigin().x, this.currentText.getOrigin().y);
            leftOffset = point.x;
            topOffset = point.y;
            this.oldText = this.currentText.getText();
        }
        else {
            this.currentText = new Text(this.mouseDownPoint, this.textSettings);
            this.canvas.addObject(this.currentText);
            leftOffset = event.clientX;
            topOffset = event.clientY;
            this.canvas.addCommand(new CreationCommand(this.currentText, this.canvas));
        }

        this.textAreaElement.show();
        this.textAreaElement.offset({ left: leftOffset, top: topOffset });

        // Use timeout to focus on text area. else it wont work.
        var textarea = this.textAreaElement;
        setTimeout(function() {
            textarea.focus();
        }, 0);
    }

    /**
     * Releases the text box but keeps the text box open in edit mode if 
     * currentText is not null.
     */
    mouseUp(event){
        this.isMouseDown = true;
    }

    /**
     * Called when focusing the text area element
     */
    onTextEditorEnter(event) {
        this.textAreaElement.val(this.currentText.getText());
        this.updateTextAreaSize(this.currentText.getText());
    }

    /**
     * Called when unfocusing the text area element
     */
    onTextEditorExit(event) {
        var newText = this.textAreaElement.val();
        this.isEditing = false;
        this.textAreaElement.hide();
        this.currentText.setText(newText);
        this.textAreaElement.val("");
        this.canvas.update();

        if(this.oldText != null) {
            this.canvas.addCommand(new TextEditCommand(this.currentText, this.canvas, this.oldText, newText));
            this.oldText = null;
        }
        this.currentText = null;
    }

    /**
     * Updates the width and height of the text area element according to
     * the size of the text.
     */
    updateTextAreaSize(text) {
        var textSettings = this.currentText.getTextSettings();

        // Setting the font and size of the text
        this.textAreaElement.css("font-size", textSettings.pixels + "px");
        this.textAreaElement.css("font-family", textSettings.fontType);

        //TODO: resize text area.
    }

    /**
     * Keydown function that will be called when the textarea receives a keydown
     * down event. Handles input logic to the current text object.
     */
    keyUp(event){
        if(this.currentText === null)
            return;
        
        this.updateTextAreaSize(this.textAreaElement.val());
        if(event.key === "Enter" && event.ctrlKey)
            this.textAreaElement.hide();
    }

    /**
     * Set text settings
     */
    setTextSettings(textSettings) {
        this.textSettings = textSettings;
    }
}