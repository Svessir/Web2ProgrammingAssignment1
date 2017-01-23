/**
 * Tool that handles the creation of Pen drawing on the canvas
 */
class PenTool extends Tool {

    constructor(canvas){
        super(canvas);
        this.currentPen;
    }

    /**
     * Instantiates the Pen drawing on the canvas.
     */
    mouseDown(event){
        if(this.isMouseDown){
            return;
        }
        this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.isMouseDown = true;
        this.currentPen = new Pen();
        this.currentLine = new Line();
        this.currentLine.setLineInfo(this.mouseDownPoint.x, this.mouseDownPoint.y,
                                this.mouseDownPoint.x, this.mouseDownPoint.y);
        this.currentPen.currentDrawing.push(this.currentLine);
        this.canvas.addObject(this.currentPen);
        this.canvas.update();
    }

    /**
     * Adds a line to the drawing on the canvas.
     */
    mouseMove(event){
        if(this.isMouseDown){
            var mouseCurrentPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
            this.isMouseDown = true;
            this.currentLine = new Line();
            this.currentLine.setLineInfo(this.mouseDownPoint.x, this.mouseDownPoint.y,
                                         mouseCurrentPoint.x, mouseCurrentPoint.y);
            this.mouseDownPoint = mouseCurrentPoint;
            this.currentPen.currentDrawing.push(this.currentLine);
            this.canvas.update();
        }
    }

    /**
     * Releases the drawing and instantiates object that can undo and redo
     * the work that has just been done on the object
     */
    mouseUp(event){
        this.isMouseDown = false;
        this.canvas.addCommand(new CreationCommand(this.currentPen, this.canvas));
        this.currentPen = null;
    }

}