
/**
 * Tool that handles creation of Rectangles on the canvas.
 */
class RectTool extends Tool{

    constructor(canvas){
        super(canvas);
        this.currentRectangle;
    }

    /**
     * Instantiates a rectangle on the canvas.
     */
    mouseDown(event){
        if(this.isMouseDown)
            return;

        this.mouseDownPoint = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
        this.isMouseDown = true;
        this.currentRectangle = new Rectangle();
        this.currentRectangle.setCoordinates(this.mouseDownPoint.x, this.mouseDownPoint.y, this.mouseDownPoint.x, this.mouseDownPoint.y);
        this.canvas.addObject(this.currentRectangle);
        this.canvas.update();
    };

    /**
     * Modifies the rectangle that has been instantiated on the canvas.
     */
    mouseMove(event){
        if (this.isMouseDown){
            var canvasCoordMove = this.canvas.getCanvasCoordinates(event.clientX, event.clientY);
            this.currentRectangle.setCoordinates(this.mouseDownPoint.x, this.mouseDownPoint.y, canvasCoordMove.x, canvasCoordMove.y);
            this.canvas.update();
        }
    }

    /**
     * Releases the rectangle and instantiates a command object that can undo and redo
     * the work that has just been done on the object.
     */
    mouseUp(event){
        this.isMouseDown = false;
        this.canvas.addCommand(new CreationCommand(this.currentRectangle, this.canvas));
        this.currentRectangle = null;
    }
}