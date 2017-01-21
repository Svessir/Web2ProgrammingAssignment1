/**
 * Vector2D is a two dimensional math vector.
 */
class Vector2D {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    /**
     * returns the reversed vector of this vector.
     */
    reversed() {
        return new Vector2D(-this.x, -this.y);
    }

    /**
     * Returns the length of the vector.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        var length = this.length();
        this.x = this.x / length;
        this.y = this.y / length;
    }

}