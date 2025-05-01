// -------------------Scale-------------------

// Get controller name
var effectName = thisProperty.propertyGroup(1).name;
var effectIndex = effectName.match(/\d+/);
effectIndex = effectIndex ? parseInt(effectIndex[0]) : 0;
var controllerName = effectIndex == 0 ? "Shake (Rikki)" : "Shake (Rikki) " + effectIndex;
var effectController = effect(controllerName);

// Global variables
var ampMultiplier = effectController("Amplitude");
var freqMultiplier = effectController("Frequency");
var zDist = effectController("Z Dist");

// -------------------Wave-------------------

var waveAmp = effectController("Scale Wave Amp") * ampMultiplier;
var phase = effectController("Wave Phase") * (Math.PI / 180);
var wavePhase = effectController("Scale Wave Phase") * (Math.PI / 180);
var waveFreq = effectController("Scale Wave Freq");
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

waveValue = waveAmp * Math.cos(timeOffset / 2 * Math.PI * 2 + phase + wavePhase);

// -------------------Random-------------------

var randSmooth = effectController("Scale Rand Smooth");
var randAmp = effectController("Scale Rand Amp") * ampMultiplier;
var randFreq = effectController("Scale Rand Freq");
var seed = effectController("Rand Seed");
var randSeed = effectController("Scale Rand Seed");
timeOffset = 0;
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
    randValue = wiggle(1, randAmp, 1, .5, timeOffset) - value;
} else {
    var timeFactor = Math.floor(timeOffset);
    seedRandom(timeFactor + seed + randSeed, true);
    randValue = random(-randAmp, randAmp);
}

// -------------------Result-------------------

var combinedValue = (1/zDist + randValue + waveValue) * 100;
[combinedValue];