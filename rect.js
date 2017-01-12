function Rectange(){
    this.originX;
    this.originY;
    this.width;
    this.height;
    
    this.setCoordinates = function setCoordinates(origin, end){
        if (origin.x <= end.x && origin.y <= end.y){
            this.originX = origin.x;
            this.originY = origin.y;
            this.width   = end.x - origin.x;
            this.height  = end.y - origin.y;
        }
        else if (origin.x <= end.x && origin.y > end.y){
            this.originX = origin.x;
            this.originY = end.y;
            this.width   = end.x - origin.x;
            this.height  = origin.y - end.y;
        }
        else if (origin.x > end.x && origin.y <= end.x){
            this.originX = end.x;
            this.originY = origin.y;
            this.width   = origin.x - end.x;
            this.height  = end.y - origin.y;
        }
        else{
            this.originX = end.x;
            this.originY = end.y;
            this.width   = origin.x - end.x;
            this.height  = origin.y - end.y;
        }
    };

    this.draw = function draw(ctx){
        ctx.rect(this.originX, this.originY, this.width, this.height);
    };
}