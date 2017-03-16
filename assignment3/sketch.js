/*
 * Name: Thanh Trinh
 * CSC2463 Audio Assignment 3
 */
var fireworks;
var osc, oscNoise;
var lfo, filt, filt2;
var ampEnv, ampEnv2;

function preload() {
  fireworks = loadImage("fireworks.jpg");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  osc = new Tone.Oscillator(440,'sawtooth6').start();
  osc.volume.value = -20;
  filt = new Tone.Filter(500, 'highpass');
  lfo = new Tone.LFO(10,650,700).start();
  
  osc2 = new Tone.Oscillator(440,'square4').start();
  osc2.volume.value = -15;

  oscNoise = new Tone.Noise().start();
  filt2 = new Tone.Filter(500, 'highpass');
  oscNoise.volume.value = 15;
  
  ampEnv = new Tone.AmplitudeEnvelope({
    "attack": 1.5,
    "decay": 1.5,
    "sustain": 1.0,
    "release": 1.5
  }).toMaster();

  ampEnv2 = new Tone.AmplitudeEnvelope({
      "attack": 1.5,
      "decay": 1.5,
      "sustain": 1.0,
      "release": 2.0
  }).toMaster();

  osc.connect(filt);
  filt.connect(ampEnv);
  lfo.connect(osc.frequency);

  oscNoise.connect(filt2);
  filt2.connect(ampEnv2);
}

function mousePressed() {
  if(mouseX <= 400 && mouseY <= 400) {
    osc.frequency.value = 'Bb4';
    ampEnv.triggerAttackRelease(1.5);
    ampEnv2.triggerAttackRelease(0.2,2.0,0.2);
  }
}

function draw() {
  background(100,150,200);
  image(fireworks,200,200,220,293);
  textSize(15);
  text("Fireworks Sound Effect", 125, 35);
}