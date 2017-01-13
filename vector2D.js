/**
 * Vector2D is a two dimensional math vector.
 */
function Vector2D(x,y) {
    this.x = x;
    this.y = y;
}

/**
 * returns the reversed vector of this vector.
 */
Vector2D.prototype.reversed = function reversed() {
    return new Vector2D(-this.x, -this.y);
}

Vector2D.prototype.length = function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}