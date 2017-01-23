/**
 * Canvas class contains the state of the
 * canvas.
 */
class Canvas {

    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        this.canvasContext = canvasElement.getContext("2d");
        this.canvasObjects = [];
        this.undoStack = [];
        this.redoStack = [];
        this.width = canvasElement.width;
        this.height = canvasElement.height;
        this.offset = canvasElement.getBoundingClientRect();

        // Assign tool functions to canvas mouse event functions
        this.setTool(new PenTool(this)); // Insert default tool
    }

    /**
     * Clears the canvas and draws all objects
     * in the canvas object list back to the canvas.
     */
    update() {
        this.canvasContext.clearRect(0,0,this.width, this.height);
        for (var i = 0; i < this.canvasObjects.length; i++){
            this.canvasObjects[i].draw(this.canvasContext);
        }
    }

    /**
     * Adds an object to the list of objects in the canvas
     */
    addObject(drawable) {
        this.canvasObjects.push(drawable);
    }

    /**
     * Removes the first instance of the object in backward creation order.
     */
    removeObject(drawable) {
        for(var i = this.canvasObjects.length - 1; i >= 0; i--) {
            if(this.canvasObjects[i] === drawable) {
                this.canvasObjects.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Convert screen coordinates to canvas coordinates.
     */
    getCanvasCoordinates(x,y) {
        var rect = this.canvasElement.getBoundingClientRect();
        return {
            x: (x - rect.left) / (rect.right - rect.left) * this.width,
            y: (y - rect.top) / (rect.bottom - rect.top) * this.height
        };
    }

    /**
     * Convert canvas coordinates to screen coordinates.
     */
    getScreenCoordinates(x,y) {
        var rect = this.canvasElement.getBoundingClientRect();
        return {
            x: (x + rect.left),
            y: (y + rect.top)
        };
    }

    /**
     * Adds a command to the undo stack.
     */
    addCommand(command) {
        this.undoStack.push(command);
    }

    /**
     * Undoes the latest command on the undoStack.
     */
    undo() {
        if(this.undoStack.length > 0) {
            var command = this.undoStack.pop();
            command.undo();
            this.redoStack.push(command);
        }
    }

    /**
     * Redoes the latest command on the redoStack.
     */
    redo() {
        if(this.redoStack.length > 0) {
            var command = this.redoStack.pop();
            command.redo();
            this.undoStack.push(command);
        }
    }

    /**
     * Returns the most latest object in the canvasObjects list that contains the
     * provided coordinates.
     */
    getFirstObjectHit(x,y) {
        for(var i = this.canvasObjects.length - 1; i >= 0; i--) {
            if(this.canvasObjects[i].containsCoordinates(x,y))
                return this.canvasObjects[i];
        }
        return null;
    }

    /**
     * Set a new tool for the canvas.
     */
    setTool(tool) {
        this.canvasElement.onmousedown = function(event) {tool.mouseDown(event)};
        this.canvasElement.onmousemove  = function(event) {tool.mouseMove(event)};
        this.canvasElement.onmouseup = function(event) {tool.mouseUp(event)};
    }
}