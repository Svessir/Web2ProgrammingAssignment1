/**
 * The Rectange object that can be drawn to canvas.
 */
function Rectange(){
    this.originX;
    this.originY;
    this.width;
    this.height;
}
/**
 * Changes the origin point, width and height of the rectangle.
 */
Rectange.prototype.setCoordinates = function setCoordinates(origin_x, origin_y, end_x, end_y){
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
Rectange.prototype.draw = function draw(ctx){
    ctx.fillRect(this.originX, this.originY, this.width, this.height);
    ctx.stroke()
}

/**
 * Moves the rectangle along the provided vector
 */
Rectangle.prototype.move = function move(vector2D) {
    this.originX += vector2D.x;
    this.originY += vector2D.y;
}