/**
 * Tool that handles selecting and moving canvas Objects
 */
class SelectionMoveTool extends Tool {

    constructor(canvas) {
        super(canvas);
        this.selected = [];
        this.moveVector = new Vector2D(0,0);
        this.hit = null;
        this.isDrag = false;
    }

    /**
     * Queries canvas for the first hit object at mouse down.
     * If an object was hit it is added to the selected list
     * else all selected objects are dropped
     */
    mouseDown(event){
        this.isMouseDown = true;
        this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.hit = this.canvas.getFirstObjectHit(this.mouseDownPoint.x, this.mouseDownPoint.y);
        
        // If no object was clicked then clear the selection
        if(this.hit == null)
            this.clearSelection();
        this.canvas.update();
    }

    /**
     * if the mouse is down all selected objects are moved according
     * to the vector between the mouse down origin point and the current mouse
     * position
     */
    mouseMove(event) {
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
                this.addToSelection(this.hit);
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
    }

    /**
     * If objects are in the selected list a MoveCommand is instantiated
     * that can replicate and reverse the move that was just made.
     */
    mouseUp(event){

        if(this.isDrag && this.selected.length > 0) {
            this.canvas.addCommand(new MoveCommand(this.selected.slice(0,this.selected.length), this.moveVector, this.canvas));
        } 
        else if (!this.isDrag && this.hit != null) {
            if(this.isInSelection(this.hit))
                this.removeFromSelection(this.hit);
            else
                this.addToSelection(this.hit);
            this.hit = null;
        }

        this.isMouseDown = false;
        this.isDrag = false;
        this.moveVector = new Vector2D(0,0);
        this.canvas.update();
    }

    /**
     * Checks if object is already in selection
     */
    isInSelection(object){
        for(var i = 0; i < this.selected.length; i++) {
            if(this.selected[i] === object)
                return true;
        }
        return false;
    }

    /**
     * returns the calculated move vector given two mouse coordinates
     */
    calculateMoveVector(startX, startY, endX, endY){
        return new Vector2D(endX - startX, endY - startY);
    }

    /**
     * moves all the objects according to a move vector.
     */
    move(vector){
        for(var i = 0; i < this.selected.length; i++) {
            this.selected[i].move(vector);
        }
    }

    /**
     * cancels the move made on all selected object given the move vector.
     */
    reverseMove(vector){
        var reverseVector = vector.reversed();
        for(var i = 0; i < this.selected.length; i++) {
            this.selected[i].move(reverseVector);
        }
    }

    /**
     * Add an item to the selection
     */
    addToSelection(object){
        this.selected.push(object);
        object.setHighlight(true);
    }

    /**
     * Removes an item from the selection
     */
    removeFromSelection(object){
        for(var i = 0; i < this.selected.length; i++) {
            if(this.selected[i] === object) {
                object.setHighlight(false);
                this.selected.splice(i, 1);
            }
        }
    }

    /**
     * Clears the selection.
     */
    clearSelection(){
        for(var i = 0; i < this.selected.length; i++) {
            this.selected[i].setHighlight(false);
        }
        this.selected = [];
    }
}