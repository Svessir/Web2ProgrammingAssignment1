/**
 * The Circle object that can be drawn to canvas.
 */
function Circle(){
    this.originX;
    this.originY;
    this.radius;
}

/**
 * Changes the origin point, width and height of the rectangle.
 */
Circle.prototype.setCircleInfo = function setCircleInfo(origin_x, origin_y, end_x, end_y){
    this.originX = origin_x;
    this.originY = origin_y;
    if (origin_x <= end_x && origin_y <= end_y){
        var width = end_x - origin_x;
        var height = end_y - origin_y;
    }
    else if (origin_x <= end_x && origin_y > end_y){
        var width   = end_x - origin_x;
        var height  = origin_y - end_y;
    }
    else if (origin_x > end_x && origin_y <= end_x){
        var width   = origin_x - end_x;
        var height  = end_y - origin_y;
    }
    else{
        var width   = origin_x - end_x;
        var height  = origin_y - end_y;
    }
    this.radius = Math.sqrt(Math.pow(width) + Math.pow(height));
    console.log(this);
}

/**
 * Draws the Rectangle to the provided canvas context.
 */
Circle.prototype.draw = function draw(ctx){
    ctx.arc(this.originX, this.originY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

/**
 * Moves the circle along the provided vector
 */
Circle.prototype.move = function move(vector2D) {
    this.originX += vector2D.x;
    this.originY += vector2D.y;
}