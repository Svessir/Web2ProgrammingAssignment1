/**
 * 
 */
function RectTool(canvas){
    
    this.mouseDownCoord;
    this.mouseUpCoord;
    this.mouseIsDown = false;
    this.currentRectangle;

    this.mouseDown = function mouseDown(event){
        this.mouseDownCoord = (event.clientX, event.clientY);  // get coords of the mouse
        this.mouseUpCoord = (event.clientX, event.clientY);
        this.mouseIsDown = true;
        this.currentRectangle = new Rectange();
        this.currentRectangle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
    };

    this.mouseMove = function mouseMove(event){
        if (this.mouseIsDown){
            this.mouseUpCoord = (event.clientX, event.clientY); // get coords of the mouse
            this.currentRectangle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
        }
    };

    this.mouseUp = function mouseUp(event){
        this.mouseUpCoord = (event.clientX, event.clientY);     // get coords of the mouse
        this.currentRectangle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
        this.mouseIsDown = false;
    }
}