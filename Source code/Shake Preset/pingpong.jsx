// -------------------Loop-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Shake Preset (Rikki)" : "Shake Preset (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Get value
var loop = effectController("Loop")

if (loop.value == 1 && thisProperty.numKeys > 0) {
    loopOut("pingpong") + loopIn("pingpong") - value
} else {
    value
}