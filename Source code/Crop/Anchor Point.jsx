// -------------------Anchor Point-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Crop (Rikki)" : "Crop (Rikki) " + effectIndex;
var effectController = effect(controllerName);

var anchorCoordinates = effectController("Anchor Coordinates");
if (anchorCoordinates.value == 1) {

    // Get anchor value
    var anchorMode = effectController("Anchor Mode");
    if (anchorMode.value == 1) {
        var anchorX = effectController("Anchor Point")[0];
        var anchorY = effectController("Anchor Point")[1];
    } else {
        var layerWidth = thisLayer.width;
        var layerHeight = thisLayer.height;
        var anchorX = effectController("Anchor X") * 0.01;
        var anchorY = effectController("Anchor Y") * 0.01;
        anchorX = layerWidth * anchorX;
        anchorY = layerHeight * anchorY;
    }

    // Get final value
    var layerWidth = thisLayer.width;
    var layerHeight = thisLayer.height;
    var centerX = layerWidth / 2;
    var centerY = layerHeight / 2;
    var anchorXdifference = anchorX - centerX;
    var anchorYdifference = anchorY - centerY;
    var shift1 = effectController("Shift 1");
    var shift2 = effectController("Shift 2");
    var shift3 = effectController("Shift 3");
    var shiftX0 = effectController("Shift X");
    var shiftX1 = effectController("Shift X 1");
    var shiftX2 = effectController("Shift X 2");
    var shiftX3 = effectController("Shift X 3");
    var shiftY0 = effectController("Shift Y");
    var shiftY1 = effectController("Shift Y 1");
    var shiftY2 = effectController("Shift Y 2");
    var shiftY3 = effectController("Shift Y 3");
    var finalX = centerX + anchorXdifference - shift1[0] - shift2[0] - shift3[0] - shiftX0 - shiftX1 - shiftX2 - shiftX3;
    var finalY = centerY + anchorYdifference - shift1[1] - shift2[1] - shift3[1] - shiftY0 - shiftY1 - shiftY2 - shiftY3;
    [finalX, finalY]

} else {

    // Get value
    var anchorMode = effectController("Anchor Mode");
    if (anchorMode.value == 1) {
        var centerX = effectController("Anchor Point")[0];
        var centerY = effectController("Anchor Point")[1];
        [centerX, centerY]
    } else {
        var layerWidth = thisLayer.width;
        var layerHeight = thisLayer.height;
        var anchorX = effectController("Anchor X") * 0.01;
        var anchorY = effectController("Anchor Y") * 0.01;
        var centerX = layerWidth * anchorX;
        var centerY = layerHeight * anchorY;
        [centerX, centerY]
    }

}