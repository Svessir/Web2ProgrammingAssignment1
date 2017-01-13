/**
 * Tool that handles selecting and moving canvas Objects
 */
function SelectionMoveTool(canvas) {
    this.canvas = canvas;
    this.selected = [];
    this.isMouseDown = false;
    this.mouseDownPoint = {x:0, y:0};
    this.moveVector = new Vector2D(0,0);
    this.hit = null;
    this.isDrag = false;
}

/**
 * Queries canvas for the first hit object at mouse down.
 * If an object was hit it is added to the selected list
 * else all selected objects are dropped
 */
SelectionMoveTool.prototype.mouseDown = function mouseDown(event){
    this.isMouseDown = true;
    this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
    this.hit = this.canvas.getFirstObjectHit(this.mouseDownPoint.x, this.mouseDownPoint.y);
    
    // If no object was clicked then clear the selection
    if(this.hit == null)
        this.selected = [];
};

/**
 * if the mouse is down all selected objects are moved according
 * to the vector between the mouse down origin point and the current mouse
 * position
 */
SelectionMoveTool.prototype.mouseMove = function mouseMove(event) {
    if(!this.isMouseDown || this.hit === null) return;
    var currentMousePoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
    var currentMoveVector = this.calculateMoveVector(this.mouseDownPoint.x, this.mouseDownPoint.y,
                                                    currentMousePoint.x, currentMousePoint.y);
    
    var oldDrag = this.isDrag;
    // Check if the drag has passed the drag deadzone.
    this.isDrag = (currentMoveVector.length() > 2) ? true : this.isDrag;

    // Add newly clicked object if it was not in selection and a drag has been started.
    if(oldDrag === false && this.isDrag) {
        if(!this.isInSelection(this.hit))
            this.selected.push(this.hit);
    }

    if(this.isDrag) 
    {
        // Reverse the old vector move
        this.reverseMove(this.moveVector);

        // Apply the new vector move
        this.moveVector = currentMoveVector;
        this.move(this.moveVector);
        this.canvas.update();
    }
};

/**
 * If objects are in the selected list a MoveCommand is instantiated
 * that can replicate and reverse the move that was just made.
 */
SelectionMoveTool.prototype.mouseUp = function mouseUp(event){

    if(this.isDrag && this.selected.length > 0) {
        this.canvas.addCommand(new MoveCommand(this.selected.slice(0,this.selected.length), this.moveVector, this.canvas));
    } 
    else if (!this.isDrag && this.hit != null) {
        if(this.isInSelection(this.hit))
            this.removeFromSelection(this.hit);
        else
            this.selected.push(this.hit);
        this.hit = null;
    }

    this.isMouseDown = false;
    this.isDrag = false;
    this.moveVector = new Vector2D(0,0);
}

/**
 * Checks if object is already in selection
 */
SelectionMoveTool.prototype.isInSelection = function isInSelection(object){
    for(var i = 0; i < this.selected.length; i++) {
        if(this.selected[i] === object)
            return true;
    }
    return false;
}

/**
 * returns the calculated move vector given two mouse coordinates
 */
SelectionMoveTool.prototype.calculateMoveVector = function calculateMoveVector(startX, startY, endX, endY){
    return new Vector2D(endX - startX, endY - startY);
}

/**
 * moves all the objects according to a move vector.
 */
SelectionMoveTool.prototype.move = function move(vector){
    for(var i = 0; i < this.selected.length; i++) {
        this.selected[i].move(vector);
    }
}

/**
 * cancels the move made on all selected object given the move vector.
 */
SelectionMoveTool.prototype.reverseMove = function reverseMove(vector){
    var reverseVector = vector.reversed();
    for(var i = 0; i < this.selected.length; i++) {
        this.selected[i].move(reverseVector);
    }
}

/**
 * Removes an item from the selection
 */
SelectionMoveTool.prototype.removeFromSelection = function removeFromSelection(object){
    for(var i = 0; i < this.selected.length; i++) {
        if(this.selected[i] === object)
            this.selected.splice(i, 1);
    }
}