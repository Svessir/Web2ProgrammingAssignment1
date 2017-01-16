/**
 * An Abstract shape class for the canvas objects
 */
class Shape {
    
    constructor() {
        this.isHighlight = false;
        this.originX;
        this.originY;
    }

    /**
     * Draws the Shape to the provided canvas context.
     */
    draw(ctx){
    }

    /**
     * Moves the Shape along the provided vector
     */
    move(vector2D) {
        this.originX += vector2D.x;
        this.originY += vector2D.y;
    }

    /**
     * Set if the Shape will be highlighted during draw.
     */
    setHighlight(isHighlight) {
        this.isHighlight = isHighlight;
    }

    /**
     * Checks if the Shape contains the coordinate
     */
    containsCoordinates(x,y) {
    }
}