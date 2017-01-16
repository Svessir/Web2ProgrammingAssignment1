/**
 * Command that handles replicating moving objects.
 */
class MoveCommand {
    
    constructor(objectList,vector2D, canvas) {
        this.movedObjects = objectList;
        this.moveVector = vector2D;
        this.reversedMoveVector = vector2D.reversed();
        this.canvas = canvas;
    }

    /**
     * applies the reversed moveVector on the objects
     */
    undo() {
        for(var i = 0; i < this.movedObjects.length; i++) {
            this.movedObjects[i].move(this.reversedMoveVector);
        }
        this.canvas.update();
    }

    /**
     * applies the moveVector on the objects
     */
    redo() {
        for(var i = 0; i < this.movedObjects.length; i++) {
            this.movedObjects[i].move(this.moveVector);
        }
        this.canvas.update();
    }
}