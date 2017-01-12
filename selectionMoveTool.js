/**
 * Tool that handles selecting and moving canvas Objects
 */
function SelectionMoveTool(canvas) {
    this.canvas = canvas;
    this.selected = [];
}

/**
 * Queries canvas for the first hit object at mouse down.
 * If an object was hit it is added to the selected list
 * else all selected objects are dropped
 */
SelectionMoveTool.prototype.mouseDown = function mouseDown(event){
};

/**
 * if the mouse is down all selected objects are moved according
 * to the vector between the mouse down origin point and the current mouse
 * position
 */
SelectionMoveTool.prototype.mouseMove = function mouseMove(event){
};

/**
 * If objects are in the selected list a MoveCommand is instantiated
 * that can replicate and reverse the move that was just made.
 */
SelectionMoveTool.prototype.mouseUp = function mouseUp(event){
}