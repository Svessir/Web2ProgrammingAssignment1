/**
 * The text canvas object
 */
function Text() {

}

/**
 * Changes the origin point, width and height of the rectangle.
 */
Text.prototype.setCoordinates = function setCoordinates(origin_x, origin_y, end_x, end_y){
}

/**
 * Draws the Text to the provided canvas context.
 */
Text.prototype.draw = function draw(ctx){
}

/**
 * Moves the text along the provided vector
 */
Text.prototype.move = function move(vector2D) {
}

/**
 * Set if the rectangle will be highlighted during draw.
 */
Text.prototype.setHighlight = function setHighlight(isHighlight) {
    this.isHighlight = isHighlight;
}

/**
 * Checks if the Text object contains the coordinate
 */
Text.prototype.containsCoordinates = function containsCoordinates(x,y) {
}

/**
 * Sets if the text object is in edit mode.
 */
Text.prototype.isEdit = function isEdit(edit) {
}