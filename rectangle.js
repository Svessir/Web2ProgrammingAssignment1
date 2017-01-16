/**
 * The Rectangle object that can be drawn to canvas.
 */
class Rectangle extends Shape {

    constructor() {
        super();
        this.width;
        this.height;
        this.isHighlight = false;
    }

    /**
     * Changes the origin point, width and height of the rectangle.
     */
    setCoordinates(origin_x, origin_y, end_x, end_y){
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
    draw(ctx){
        ctx.beginPath();
        if(this.isHighlight) {
            ctx.setLineDash([3,6]);
            ctx.rect(this.originX - 1, this.originY - 1, this.width + 2, this.height + 2);
            ctx.stroke();
            ctx.setLineDash([1,0]);
        }

        ctx.fillStyle="black";
        ctx.fillRect(this.originX, this.originY, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Set if the rectangle will be highlighted during draw.
     */
    setHighlight(isHighlight) {
        this.isHighlight = isHighlight;
    }

    /**
     * Checks if the Rectangle contains the coordinate
     */
    containsCoordinates(x,y) {
        return x >= this.originX && x <= this.originX + this.width &&
            y >= this.originY && y <= this.originY + this.height; 
    }
}