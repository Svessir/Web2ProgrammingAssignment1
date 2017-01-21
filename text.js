/**
 * The text canvas object
 */
class Text extends Shape {

    constructor(originPoint, textSettings) {
        super();
        this.lines = [];
        this.originX = originPoint.x;
        this.originY = originPoint.y;
        this.pixels;
        this.fontType;
        this.color;
        this.setTextSettings(textSettings);
        this.width = 0;
        this.height = 0;
    }

    /**
     * Draws the Text to the provided canvas context.
     */
    draw(ctx){
        if(this.isHighlight)
            this.drawHighLight(ctx);

        var oldFillStyle = ctx.fillStyle;
        ctx.font = this.getFont();
        ctx.fillStyle = this.color;
        for(let i = 0; i < this.lines.length; i++) {
            ctx.fillText(this.lines[i], this.originX, this.originY + (this.pixels * (i + 1)));
        }
        ctx.fillStyle = oldFillStyle;
    }

    /**
     * Draws the selection highlight
     */
    drawHighLight(ctx) {
        var currentX = this.originX;
        var currentY = this.originY;
        ctx.setLineDash([3,6]);
        for(let i = 0; i < this.lines.length; i++, currentY += this.pixels) {
            var lineWidth = Helper.measureText(this.lines[i], this.getFont()).width;
            ctx.beginPath();
            ctx.rect(currentX, currentY, lineWidth, this.pixels);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.setLineDash([1,0]);
    }

    /**
     * Checks if the Text object contains the coordinate
     */
    containsCoordinates(x,y) {
        var currentX = this.originX;
        var currentY = this.originY;

        for(let i = 0; i < this.lines.length; i++, currentY += this.pixels) {
            var lineWidth = Helper.measureText(this.lines[i], this.getFont()).width;
            if(x >= currentX && x <= currentX + lineWidth && y >= currentY && y <= currentY + this.pixels)
                return true;
        }
        return false;
    }

    /**
     * Sets the text on the object.
     * Owerwrites any existing text.
     */
    setText(text) {
        this.lines = text.trim().split("\n");
        this.width = this.getMaxWidth();
        this.height = this.getHeight();
    }

    /**
     * Gets the width of the longest line in the text.
     */
    getMaxWidth() {
        var maxWidth = 0;
        for(let i = 0; i < this.lines.length; i++) {
            var width = Helper.measureText(this.lines[i], this.getFont()).width;
            maxWidth = width > maxWidth ? width : maxWidth;
        }
        return maxWidth;
    }

    /**
     * Gets the height of the text.
     */
    getHeight() {
        return this.lines.length * this.pixels;
    }

    /**
     * Gets the font of the text in the form:
     * <number>px <FontType>
     */
    getFont() {
        return this.pixels + "px " + this.fontType;
    }

    /**
     * Gets the text as a string
     */
    getText() {
        var text = "";
        for(let i = 0; i < this.lines.length; i++) {
            text += this.lines[i] + "\n";
        }
        return text.trim();
    }

    /**
     * Set the text settings
     */
    setTextSettings(textSettings) {
        this.pixels = textSettings.pixels;
        this.fontType = textSettings.font;
        this.color = textSettings.color;
    }

    /**
     * get the text settings;
     */
    getTextSettings() {
        return new TextSettings(this.pixels, this.fontType, this.color);
    }

    /**
     * Get origin point
     */
    getOrigin() {
        return {x: this.originX, y: this.originY};
    }
}

/**
 * Data Transfer Object for
 * the settings that a text needs.
 */
class TextSettings {
    
    constructor(pixels, font, color) {
        this.pixels = pixels;
        this.font = font;
        this.color = color;
    }
}