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
    this.width = canvasElement.width;
    this.height = canvasElement.height;
    this.offset = canvasElement.getBoundingClientRect();

    // Assign tool functions to canvas mouse event functions
    this.setTool(new CircleTool(this)); // Insert default tool
}

/**
 * Clears the canvas and draws all objects
 * in the canvas object list back to the canvas.
 */
Canvas.prototype.update = function update() {
    this.canvasContext.clearRect(0,0,this.width, this.height);
    for (var i = 0; i < this.canvasObjects.length; i++){
        this.canvasObjects[i].draw(this.canvasContext, this.offset);
    }
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
Canvas.prototype.getCanvasCoordinates = function getCanvasCoordinates(x,y) {
    var rect = this.canvasElement.getBoundingClientRect();
    return {
        x: (x - rect.left) / (rect.right - rect.left) * this.width,
        y: (y - rect.top) / (rect.bottom - rect.top) * this.height
    };
}

/**
 * Adds a command to the undo stack.
 */
Canvas.prototype.addCommand = function addCommand(command) {
    this.undoStack.push(command);
}

/**
 * Undoes the latest command on the undoStack.
 */
Canvas.prototype.undo = function undo() {
    if(this.undoStack.length > 0) {
        var command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);
    }
}

/**
 * Redoes the latest command on the redoStack.
 */
Canvas.prototype.redo = function redo() {
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
Canvas.prototype.getFirstObjectHit = function getFirstObjectHit(x,y) {
    for(var i = this.canvasObjects.length - 1; i >= 0; i--) {
        if(this.canvasObjects[i].containsCoordinates(x,y))
            return this.canvasObjects[i];
    }
    return null;
}

/**
 * Set a new tool for the canvas.
 */
Canvas.prototype.setTool = function setTool(tool) {
    this.canvasElement.onmousedown = function(event) {tool.mouseDown(event)};
    this.canvasElement.onmousemove  = function(event) {tool.mouseMove(event)};
    this.canvasElement.onmouseup = function(event) {tool.mouseUp(event)};
}