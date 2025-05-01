// -------------------Scale-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Shake Preset (Rikki)" : "Shake Preset (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Posterize time
if (effectController("Posterize Scale") > 0) {
    posterizeTime(effectController("Posterize Scale"))
}

// Global variables
var ampMultiplier = effectController("Amplitude");
var freqMultiplier = effectController("Frequency");
var phase = effectController("Phase (sec)");
var shakeScaleValue = effectController("Shake Scale");
var scaleValue = effectController("Scale");

// -------------------Multiplier-------------------

var numberOfFreqKeyframes = freqMultiplier.numKeys;
var firstOffset = 0;
var timeOffset = 0;
var lastOffset = 0;
var multiplierValue = 0;

// -------------------Frame by frame interpolation-------------------

if (numberOfFreqKeyframes > 0 && freqMultiplier.key(1).time < time) {
    // Area before the first keyframe
    var firstKeyframeTime = freqMultiplier.key(1).time;
    var firstKeyframeValue = freqMultiplier.key(1).value;
    if (firstKeyframeTime - 0 > 0) {
        firstOffset = (firstKeyframeValue) * (firstKeyframeTime - 0);
    }

    // Area after the last keyframe
    var lastKeyframeTime = freqMultiplier.key(numberOfFreqKeyframes).time;
    var lastKeyframeValue = freqMultiplier.key(numberOfFreqKeyframes).value;
    if (time - lastKeyframeTime > 0) {
        lastOffset = (lastKeyframeValue) * (time - lastKeyframeTime);
    }

    // Area between the first and the latest keyframes
    if (time - lastKeyframeTime < 0) {
        for (var t = timeToFrames(firstKeyframeTime); t < timeToFrames(time); t++) {
            var currentSpeed = freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentSpeed * thisComp.frameDuration;
        }
    } else {
        for (var t = timeToFrames(firstKeyframeTime); t < timeToFrames(lastKeyframeTime); t++) {
            var currentSpeed = freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentSpeed * thisComp.frameDuration;
        }
    }

    // Final result
    multiplierValue = firstOffset + timeOffset + lastOffset;
} else {
    // Add area before 1st keyframe (or whole area if no keyframes)
    multiplierValue = (time - 0) * freqMultiplier.value;
}

// -------------------Result-------------------

var finalScale = (scaleValue + shakeScaleValue.valueAtTime(multiplierValue + phase) * ampMultiplier) * 100;
finalScale;