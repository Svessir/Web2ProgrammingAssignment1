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
    
    var txtTool = new TextTool(canvas, $("#canvas-text"), $("#width-element"));
    canvas.setTool(txtTool);
    Helper.ctx = canvasElement.getContext("2d");
}