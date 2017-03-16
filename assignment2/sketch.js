/*
 * Name: Thanh Trinh
 * CSC2463 Audio Assignment 2
 */
var osc, osc2, osc3; 
var ampEnv, ampEnv2, ampEnvNoise;
var oscNoise, lfo, lfo2, lfo3, filt;

function setup() {
  createCanvas(600, 400);
  
  oscNoise = new Tone.Noise().start();
  filt = new Tone.Filter(2000,'lowpass');
  osc = new Tone.Oscillator(440,'sine').start();
  lfo = new Tone.LFO(10,-64,0).start();

  osc2 = new Tone.Oscillator(440,'sawtooth6').start();
  lfo2 = new Tone.LFO(10,650,670).start();
  osc2.volume.value = -12;

  osc3 = new Tone.Oscillator(140,'square').start();
  lfo3 = new Tone.LFO(5,10,20).start();
  osc3.volume.value = -10;

  ampEnv = new Tone.AmplitudeEnvelope({
    "attack": 0.1,
    "decay": 0.2,
    "sustain": 1.0,
    "release": 0.8
  }).toMaster();

  ampEnv2 = new Tone.AmplitudeEnvelope({
    "attack": 0.1,
    "decay": 0.5,
    "sustain": 1.0,
    "release": 0.5
  }).toMaster();

  ampEnvNoise = new Tone.AmplitudeEnvelope({
		"attack": 0.1,
		"decay": 0.1,
		"sustain": 0.8,
		"release": 0.1
	}).toMaster();

  osc.connect(ampEnv);
  lfo.connect(oscNoise.volume);
  
  oscNoise.connect(filt);
  filt.connect(ampEnvNoise);

  osc2.connect(ampEnv);
  lfo2.connect(osc2.frequency);

  osc3.connect(ampEnv2);
  lfo3.connect(osc3.frequency);
}

function keyPressed() {
  console.log("Key is:", keyCode);
  if(keyCode == 81) { //Q
    osc.frequency.value = 'C5';
    ampEnv.triggerAttackRelease(1);
    osc.frequency.setValueAtTime('D5','+0.5');
    ampEnvNoise.triggerAttackRelease(1);
  } else if(keyCode == 87) { //W
    osc2.frequency.value = 'Bb4';
    ampEnv.triggerAttackRelease(0.5);
  } else if(keyCode == 69) { //E
    osc3.frequency.value = 'C5';
    ampEnv2.triggerAttackRelease(1);
    osc2.frequency.setValueAtTime('Bb4', '+0.2');
    ampEnvNoise.triggerAttackRelease(+0.5);
  } else if(keyCode == 82) { //R
    osc.frequency.value = 'D5';
    ampEnv.triggerAttackRelease(1);
    osc3.frequency.setValueAtTime('C5', '+0.5');
    ampEnvNoise.triggerAttackRelease(+0.5);
  } else if(keyCode == 83) { //S
    osc.frequency.value = 'Bb4';
    ampEnvNoise.triggerAttackRelease(1);
    osc2.frequency.setValueAtTime('C5','+0.3');
    ampEnv2.triggerAttackRelease(+0.3);
  }
}

function draw() {
  background(100,150,100);
  textSize(20);
  text("Basic Sound Synthesizer",170,100);
  rect(125,150,100,30); //top left
  text("Press Q",140,175);
  rect(125,250,100,30); //bottom left
  text("Press R",140,275);
  rect(325,150,100,30); //top right
  text("Press W",340,175);
  rect(325,250,100,30); //bottom right
  text("Press S",340,275);
  rect(225,200,100,30); //middle
  text("Press E",240,225);
}