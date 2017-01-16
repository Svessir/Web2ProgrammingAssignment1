/**
 * The Circle object that can be drawn to canvas.
 */
function Circle(){
    this.originX;
    this.originY;
    this.radius;
    this.isHighlight = false;
}

/**
 * Changes the origin point, width and height of the rectangle.
 */
Circle.prototype.setCircleInfo = function setCircleInfo(origin_x, origin_y, end_x, end_y){
    this.originX = origin_x;
    this.originY = origin_y;
    this.radius = this.calcRadius(this.originX, this.originY, end_x, end_y);
    console.log(this);
}

/**
 * Draws the circle to the provided canvas context.
 */
Circle.prototype.draw = function draw(ctx){
    ctx.beginPath();
    ctx.arc(this.originX, this.originY, this.radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
}

/**
 * Moves the circle along the provided vector
 */
Circle.prototype.move = function move(vector2D) {
    this.originX += vector2D.x;
    this.originY += vector2D.y;
}

/**
 * Set if the circle will be highlighted during draw.
 */
Circle.prototype.setHighlight = function setHighlight(isHighlight) {
    this.isHighlight = isHighlight;
}

/**
 * Checks if the Circle contains the coordinate
 */
Circle.prototype.containsCoordinates = function containsCoordinates(x,y) {
    return this.radius >= this.calcRadius(this.originX, this.originY, x, y);
}

/**
 *  Calculates distance between two points.
 */
Circle.prototype.calcRadius = function calcRadius(x1,y1, x2, y2){
    return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
}