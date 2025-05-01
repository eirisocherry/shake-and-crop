// -------------------Anchor Point-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Shake Preset (Rikki)" : "Shake Preset (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Posterize time
if (effectController("Posterize Anchor") > 0) {
    posterizeTime(effectController("Posterize Anchor"))
}

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