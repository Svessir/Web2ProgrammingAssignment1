/**
 * Class contains the information about a triangle.
 */
class Triangle{
    constructor(p1,p2,p3){
        this.point1 = p1;
        this.point2 = p2;
        this.point3 = p3;
    }

    /**
     * Calculates the length between two points.
     */
    length(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x),2) + Math.pow((p2.y - p1.y),2));
    }

    /**
     * Calculates the area of the triangle.
     */
    area() {
        var p2_p1_distance = this.length(this.point2, this.point1);
        var p3_p1_distance = this.length(this.point3, this.point1);
        var p3_p2_distance = this.length(this.point3, this.point2);
        var s = (p2_p1_distance + p3_p1_distance + p3_p2_distance)/2;
        var area = Math.sqrt(s*(s-p2_p1_distance)*(s-p3_p1_distance)*(s-p3_p2_distance));
        //console.log(area); 
        return area;
    }


}