/**
 * Helper class
 */
class Helper {
    constructor() {}

    static measureText(text, font) {
        this.ctx.font = font;
        return this.ctx.measureText(text);
    }
}

// Assign the canvas context
Helper.ctx =  null;