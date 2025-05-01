// -------------------Position-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Shake (Rikki)" : "Shake (Rikki) " + effectIndex;
var effectController = effect(controllerName);

var anchorCoordinates = effectController("Anchor Coordinates");
if (anchorCoordinates.value == 1) {

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

} else {

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
    var positionX = centerX + anchorXdifference;
    var positionY = centerY + anchorYdifference;

    // Global variables
    var ampMultiplier = effectController("Amplitude");
    var freqMultiplier = effectController("Frequency");

    // [-------------------Position X-------------------]

    // -------------------Wave-------------------

    var waveAmp = effectController("X Wave Amp") * ampMultiplier;
    var phase = effectController("Wave Phase") * (Math.PI / 180);
    var wavePhase = effectController("X Wave Phase") * (Math.PI / 180);
    var waveFreq = effectController("X Wave Freq");
    var timeOffset = 0;
    var waveValue = 0;

    if (waveFreq.numKeys > 0 || freqMultiplier.numKeys > 0) {
        for (var t = timeToFrames(thisLayer.inPoint); t < timeToFrames(time); t++) {
            var currentFreq = waveFreq.valueAtTime(framesToTime(t)) * freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentFreq * thisComp.frameDuration;
        }
    } else {
        timeOffset = time * waveFreq * freqMultiplier;
    }

    waveValue = waveAmp * Math.cos(timeOffset * Math.PI + phase + wavePhase  + Math.PI);

    // -------------------Random-------------------

    var randSmooth = effectController("X Rand Smooth");
    var randAmp = effectController("X Rand Amp") * ampMultiplier;
    var randFreq = effectController("X Rand Freq");
    var seed = effectController("Rand Seed");
    var randSeed = effectController("X Rand Seed");
    var timeOffset = 0;
    var randValue = 0;

    if (randFreq.numKeys > 0 || freqMultiplier.numKeys > 0) {
        for (var t = timeToFrames(thisLayer.inPoint); t < timeToFrames(time); t++) {
            var currentFreq = randFreq.valueAtTime(framesToTime(t)) * freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentFreq * thisComp.frameDuration;
        }
    } else {
        timeOffset = time * randFreq * freqMultiplier;
    }

    if (randSmooth.value == 1) {
        seedRandom(seed + randSeed, false);
        randValue = wiggle(1, randAmp, 1, .5, timeOffset)[0] - value[0];
    } else {
        var timeFactor = Math.floor(timeOffset);
        seedRandom(timeFactor + seed + randSeed, true);
        randValue = random(-randAmp, randAmp);
    }

    // -------------------Result-------------------

    var combinedValueX = positionX + randValue + waveValue;



    // [-------------------Position Y-------------------]

    // -------------------Wave-------------------

    var waveAmp = effectController("Y Wave Amp") * ampMultiplier;
    var phase = effectController("Wave Phase") * (Math.PI / 180);
    var wavePhase = effectController("Y Wave Phase") * (Math.PI / 180);
    var waveFreq = effectController("Y Wave Freq");
    var timeOffset = 0;
    var waveValue = 0;

    if (waveFreq.numKeys > 0 || freqMultiplier.numKeys > 0) {
        for (var t = timeToFrames(thisLayer.inPoint); t < timeToFrames(time); t++) {
            var currentFreq = waveFreq.valueAtTime(framesToTime(t)) * freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentFreq * thisComp.frameDuration;
        }
    } else {
        timeOffset = time * waveFreq * freqMultiplier;
    }

    waveValue = waveAmp * Math.cos(timeOffset * Math.PI + phase + wavePhase + Math.PI);

    // -------------------Random-------------------

    var randSmooth = effectController("Y Rand Smooth");
    var randAmp = effectController("Y Rand Amp") * ampMultiplier;
    var randFreq = effectController("Y Rand Freq");
    var seed = effectController("Rand Seed");
    var randSeed = effectController("Y Rand Seed");
    var timeOffset = 0;
    var randValue = 0;

    if (randFreq.numKeys > 0 || freqMultiplier.numKeys > 0) {
        for (var t = timeToFrames(thisLayer.inPoint); t < timeToFrames(time); t++) {
            var currentFreq = randFreq.valueAtTime(framesToTime(t)) * freqMultiplier.valueAtTime(framesToTime(t));
            timeOffset += currentFreq * thisComp.frameDuration;
        }
    } else {
        timeOffset = time * randFreq * freqMultiplier;
    }

    if (randSmooth.value == 1) {
        seedRandom(seed + randSeed, false);
        randValue = wiggle(1, randAmp, 1, .5, timeOffset)[1] - value[1];
    } else {
        var timeFactor = Math.floor(timeOffset);
        seedRandom(timeFactor + seed + randSeed, true);
        randValue = random(-randAmp, randAmp);
    }

    // -------------------Result-------------------

    var combinedValueY = positionY - randValue - waveValue;

    [combinedValueX, combinedValueY];

}