// -------------------Skew-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Crop (Rikki)" : "Crop (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Posterize time
if (effectController("Posterize Skew") > 0) {
    posterizeTime(effectController("Posterize Skew"))
}

// Get value
var skewValue = effectController("Skew");
[skewValue]
