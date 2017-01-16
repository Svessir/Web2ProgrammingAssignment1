/**
 * The text canvas object
 */
class Text extends Shape {

    constructor() {
        super();
    }

    /**
     * Draws the Text to the provided canvas context.
     */
    draw(ctx){
    }

    /**
     * Moves the text along the provided vector
     */
    move(vector2D) {
    }

    /**
     * Set if the rectangle will be highlighted during draw.
     */
    setHighlight(isHighlight) {
        this.isHighlight = isHighlight;
    }

    /**
     * Checks if the Text object contains the coordinate
     */
    containsCoordinates(x,y) {
    }
}