/**
 * 
 */
function RectTool(canvas){
    
    this.mouseDownCoords;
    this.mouseUpCoords;
    this.mouseIsDown = false;
    this.currentRectangle;

    this.mouseDown = function mouseDown(event){
        this.mouseDownCoords = (event.x, event.y);   // get coords of the mouse
        this.mouseUpCoords = (event.x, event.y);
        this.mouseIsDown = true;
        this.currentRectangle = new Rectange();
        this.currentRectangle.setCoordinates(this.mouseDownCoords, this.mouseUpCoords);
    };

    this.mouseMove = function mouseMove(event){
        if (this.mouseIsDown){
            this.mouseUpCoords = (event.x, event.y);           // get coords of the mouse
            this.currentRectangle.setCoordinates(this.mouseDownCoords, this.mouseUpCoords);
        }
    };

    this.mouseUp = function mouseUp(event){
        this.mouseUpCoords = (event.x, event.y);           // get coords of the mouse
        this.currentRectangle.setCoordinates(this.mouseDownCoords, this.mouseUpCoords);
    }
}