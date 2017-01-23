class Line extends Shape {
    constructor(){
        super();
        this.isHighlight = false;
        this.lineWidth = 2;
        this.upVec;
        this.downVec;
        this.height = 2.0;
    }
    /**
     * Sets the origin point and end point.
     */
    setLineInfo(origin_x, origin_y, end_x, end_y){
        this.originX = origin_x;
        this.originY = origin_y;
        this.endX = end_x;
        this.endY = end_y; 
        this.calculateVectors();
    }

    /**
     * Moves the Shape along the provided vector
     */
    move(vector2D) {
        super.move(vector2D);
        this.endX += vector2D.x;
        this.endY += vector2D.y;
    
    }

    /**
     * Calculates the perpendicular vectors to the line.
     */
    calculateVectors(){
        var perpVector = new Vector2D((this.endX - this.originX), (this.endY - this.originY));
        perpVector.normalize();
        this.perp = {
            x : perpVector.y,
            y : -perpVector.x
        }
        this.upVec = {
            x : this.perp.x,
            y : this.perp.y
        };
        this.downVec = {
            x : -this.upVec.x,
            y : -this.upVec.y
        };
    }

    /**
     * Draw outlines if line is highlighted
     */
    drawHighlight(ctx){
        ctx.beginPath();
        ctx.setLineDash([5, 3]);
        ctx.moveTo(this.originX + this.upVec.x * this.height, this.originY + this.upVec.y * this.height);
        ctx.lineTo(this.endX + this.upVec.x * this.height, this.endY + this.upVec.y * this.height);
        ctx.lineTo(this.endX + this.downVec.x * this.height, this.endY + this.downVec.y * this.height);
        ctx.lineTo(this.originX + this.downVec.x * this.height, this.originY + this.downVec.y * this.height);
        ctx.lineTo(this.originX + this.upVec.x * this.height, this.originY + this.upVec.y * this.height);
        ctx.lineWidth = 1;
        //ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.setLineDash([1, 0]);
        ctx.closePath();
        
    }

    /**
     * Draws a Line to the provided context.
     */
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.originX, this.originY);
        ctx.lineTo(this.endX, this.endY);
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.closePath();
        if (this.isHighlight){
            this.drawHighlight(ctx);
        }
    }

    /**
     * Calculate the length of the line.
     */
    length(){
       return Math.sqrt(Math.pow((this.originX - this.endX),2) + 
                     Math.pow((this.originY - this.endY),2));
    }

    /**
     * Calculates the length bewtween a point the and the origin of the line.
     */
    lengthToOrigin(p){
       return Math.sqrt(Math.pow((p.x - this.originX),2) + 
                     Math.pow((p.y - this.originY),2));
    }

    /**
     * Calculates the length between a point and the end of the line.
     */
    lengthToEnd(p){
       return Math.sqrt(Math.pow((p.x - this.endX),2) + 
                     Math.pow((p.y - this.endY),2));
    }

    /**
     * Calculate the triangle point area.
     */
    calculatePointArea(point){
        this.originUp = {
            x : this.originX + this.upVec.x,
            y : this.originY + this.upVec.y
        };
        this.originDown = {
            x : this.originX + this.downVec.x,
            y : this.originY + this.downVec.y
        };
        this.endUp = {
            x : this.endX + this.upVec.x,
            y : this.endY + this.upVec.y
        };
        this.endDown = {
            x : this.endX + this.downVec.x,
            y : this.endY + this.downVec.y
        };
        var triangle_1 = new Triangle(point, this.originUp, this.originDown);
        var triangle_2 = new Triangle(point, this.originUp, this.endUp);
        var triangle_3 = new Triangle(point, this.originDown, this.endDown);
        var triangle_4 = new Triangle(point, this.endUp, this.endDown);
        var triangeArea = triangle_1.area() + triangle_2.area() + 
                        triangle_3.area() + triangle_4.area();
        return triangeArea;
    }


    /**
     * Checks if the line contains the coordinate.
     */
    containsCoordinates(x,y){
        this.width = this.length();
        if (this.lineWidth < 3){
            this.height = 5 ;
        }
        else {
            this.height = this.lineWidth
        }
        var area = this.width * this.height;
        var point = {
            x : x,
            y : y
        };
        return area >= this.calculatePointArea(point) && 
                this.length() > this.lengthToOrigin(point) &&
                this.length() > this.lengthToEnd(point);
    }
}