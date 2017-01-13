/**
 * The Rectangle object that can be drawn to canvas.
 */
function Rectangle(){
    this.originX;
    this.originY;
    this.width;
    this.height;
    this.isHighlight = false;
}
/**
 * Changes the origin point, width and height of the rectangle.
 */
Rectangle.prototype.setCoordinates = function setCoordinates(origin_x, origin_y, end_x, end_y){
    if (origin_x <= end_x && origin_y <= end_y){
        this.originX = origin_x;
        this.originY = origin_y;
        this.width   = end_x - origin_x;
        this.height  = end_y - origin_y;
    }
    else if (origin_x <= end_x && origin_y > end_y){
        this.originX = origin_x;
        this.originY = end_y;
        this.width   = end_x - origin_x;
        this.height  = origin_y - end_y;
    }
    else if (origin_x > end_x && origin_y <= end_x){
        this.originX = end_x;
        this.originY = origin_y;
        this.width   = origin_x - end_x;
        this.height  = end_y - origin_y;
    }
    else{
        this.originX = end_x;
        this.originY = end_y;
        this.width   = origin_x - end_x;
        this.height  = origin_y - end_y;
    }
}

/**
 * Draws the Rectangle to the provided canvas context.
 */
Rectangle.prototype.draw = function draw(ctx){
    if(this.isHighlight) {
        ctx.fillStyle="#FF0000";
        ctx.fillRect(this.originX - 1, this.originY - 1, this.width + 2, this.height + 2);
        ctx.stroke();
    }

    ctx.fillStyle="black";
    ctx.fillRect(this.originX, this.originY, this.width, this.height);
    ctx.stroke();
}

/**
 * Moves the rectangle along the provided vector
 */
Rectangle.prototype.move = function move(vector2D) {
    this.originX += vector2D.x;
    this.originY += vector2D.y;
}

/**
 * Set if the rectangle will be highlighted during draw.
 */
Rectangle.prototype.setHighlight = function setHighlight(isHighlight) {
    this.isHighlight = isHighlight;
}

/**
 * Checks if the Rectangle contains the coordinate
 */
Rectangle.prototype.containsCoordinates = function containsCoordinates(x,y) {
    return x >= this.originX && x <= this.originX + this.width &&
           y >= this.originY && y <= this.originY + this.height; 
}