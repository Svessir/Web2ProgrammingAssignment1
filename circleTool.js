

function circleTool(canvas){
    this.mouseDownCoord;
    this.mouseUpCoord;
    this.isMouseDown = false;
    this.currentCircle;

    this.mouseDown = function mouseDown(event){
        this.mouseDownCoord = (event.clientX, event.clientY);
        this.mouseUpCoord = (event.clientX, event.clientY);
        this.isMouseDown = true;
        this.currentCircle = new Circle();
        this.currentCircle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
    };

    this.mouseMove = function mouseMove(event){
        if (this.isMouseDown){
            this.mouseUpCoord = (event.clientX, event.clientY);
            this.currentCircle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
        }
    };
    
    this.mouseUp = function mouseUp(event){
        this.mouseUpCoord = (event.clientX, event.clientY);
        this.currentCircle.setCoordinates(this.mouseDownCoord, this.mouseUpCoord);
    };
}