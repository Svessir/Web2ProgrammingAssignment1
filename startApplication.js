var canvas;

window.onload = function () {
    // Add application start up logic here
    var canvasElement = document.getElementById("canvas");
    canvas = new Canvas(canvasElement);
    
    // Listen for ctrl-z event
    function KeyPress(e) {
        var evtobj = window.event? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey)
            canvas.undo();
        if(evtobj.keyCode == 49)
            canvas.setTool(new SelectionMoveTool(canvas));
    }
    document.onkeydown = KeyPress;

    console.log($("#canvas-text"));
    var txtTool = new TextTool(canvas, $("#canvas-text"));
}