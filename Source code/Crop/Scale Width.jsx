// -------------------Scale Width-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Crop (Rikki)" : "Crop (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Posterize time
if (effectController("Posterize Scale") > 0) {
    posterizeTime(effectController("Posterize Scale"))
}

// Get value
var zDist = effectController("Z Dist");
var scaleX = effectController("Scale X");
var scaleY = effectController("Scale Y");
[1/zDist * scaleX * 100];