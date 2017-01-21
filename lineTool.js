/**
 * Tool that handles creation of Line on the canvas.
 */
class LineTool extends Tool{
    
    constructor(canvas){
        super(canvas);
        this.currentLine;
    }

    /**
     * Instantiates a line on the canvas.
     */
    mouseDown(event){
        if(this.isMouseDown)
            return;
        
        this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.isMouseDown = true;
        this.currentLine = new Line();
        this.currentLine.setLineInfo(this.mouseDownPoint.x, this.mouseDownPoint.y, this.mouseDownPoint.x, this.mouseDownPoint.y);
        this.canvas.addObject(this.currentLine);
        this.canvas.update();
    };

    /**
     * Modifies the line that has been instanstiated on the canvas.
     */
    mouseMove(event){
        if(this.isMouseDown){
            var canvasCoordMove = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
            this.currentLine.setLineInfo(this.mouseDownPoint.x, this.mouseDownPoint.y, canvasCoordMove.x, canvasCoordMove.y);
            this.canvas.update();
        }
    }

    /**
     * Releases the line and instantiates a command object that can undo and redo
     * the work that has just been done on the object.
     */
    mouseUp(event){
        this.isMouseDown = false;
        this.canvas.addCommand(new CreationCommand(this.currentLine, this.canvas));
        this.currentLine = null;
    }
}