// Get the selected layer
var selectedLayer = app.project.activeItem.selectedLayers[0];

// Get all keyframe values of position property
var positionProperty = selectedLayer.property("Position");
var positionKeyframeValues = [];
for (var i = 1; i <= positionProperty.numKeys; i++) {
    var keyValue = positionProperty.keyValue(i);
    positionKeyframeValues.push([keyValue[0].toFixed(3), keyValue[1].toFixed(3)]); // Format to 3 decimal places
}

// Get all keyframe values of rotation property
var rotationProperty = selectedLayer.property("Rotation");
var rotationKeyframeValues = [];
for (var i = 1; i <= rotationProperty.numKeys; i++) {
    rotationKeyframeValues.push(rotationProperty.keyValue(i).toFixed(3)); // Format to 3 decimal places
}

// Write keyframe values to a file
var file = new File("~/Desktop/keyframeValues.txt");
file.open("w");
file.write("var positionKeyframeValues = [");
for (var j = 0; j < positionKeyframeValues.length; j++) {
    file.write("[" + positionKeyframeValues[j][0] + ", " + positionKeyframeValues[j][1] + "]");
    if (j < positionKeyframeValues.length - 1) {
        file.write(", ");
    }
}
file.write("];\n");

file.write("var rotationKeyframeValues = [");
for (var j = 0; j < rotationKeyframeValues.length; j++) {
    file.write(rotationKeyframeValues[j]);
    if (j < rotationKeyframeValues.length - 1) {
        file.write(", ");
    }
}
file.write("];");
file.close();