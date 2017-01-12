function Rectange(){
    this.originX;
    this.originY;
    this.width;
    this.height;
    
    this.setCoordinates = function setCoordinates(origin_x, origin_y, end_x, end_y){
        if (origin_x <= end_x && origin_y <= end_y){
            this.originX = origin_x;
            this.originY = origin_y;
            this.width   = end_x - origin_x;
            this.height  = end_y - origin_y;
        }
        else if (origin_x <= end_x && origin_y > end_y){
            this.originX = origin_x;
            this.originY = end_y;
            this.width   = end_x - origin_x;
            this.height  = origin_y - end_y;
        }
        else if (origin_x > end_x && origin_y <= end_x){
            this.originX = end_x;
            this.originY = origin_y;
            this.width   = origin_x - end_x;
            this.height  = end_y - origin_y;
        }
        else{
            this.originX = end_x;
            this.originY = end_y;
            this.width   = origin_x - end_x;
            this.height  = origin_y - end_y;
        }
        console.log(this);
    };

    this.draw = function draw(ctx){
        ctx.fillRect(this.originX, this.originY-140, this.width, this.height);
        ctx.stroke()
    };
}