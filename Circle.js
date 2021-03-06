/**
 * The Circle object that can be drawn to canvas.
 */
class Circle extends Shape {
    
    constructor(){
        super();
        this.radius;
        this.isHighlight = false;
    }

    /**
     * Changes the origin point, width and height of the circle.
     */
    setCircleInfo(origin_x, origin_y, end_x, end_y){
        this.originX = origin_x;
        this.originY = origin_y;
        this.radius = this.calcRadius(this.originX, this.originY, end_x, end_y);
    }

    /**
     * Draws the circle to the provided canvas context.
     */
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.originX, this.originY, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Checks if the circle contains the coordinate
     */
    containsCoordinates(x,y) {
        return this.radius >= this.calcRadius(this.originX, this.originY, x, y);
    }

    /**
     *  Calculates distance between two points.
     */
    calcRadius(x1,y1, x2, y2){
        return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1 - y2),2));
    }
}