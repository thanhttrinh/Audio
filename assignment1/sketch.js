/*
 * Name: Thanh Trinh
 * CSC2463 Audio Assignment 1
 */

var nowPlaying1 = "Melancholic Interpretation in G";
var nowPlaying2 = "My Love (piano)";
var nowPlaying3 = "Piano Remix";
var nowPlaying4 = "Nodens Field Song";

var player1, player2, player3, player4;
var distorty, vibrato, phaser, chorus;

var playButton1, playButton2, playButton3, playButton4;
var stopButton1, stopButton2, stopButton3, stopButton4;
var distortButton, vibButton, phaButton, choButton;

var duButton, ddButton;
var vfuButton, vfdButton, vduButton, vddButton;
var pfuButton, pfdButton, pouButton, podButton;
var cfuButton, cfdButton, cduButton, cddButton;

function preload() {
	distorty = new Tone.Distortion(0.5);
	vibrato = new Tone.Vibrato(
		{
			"frequency" : 0.5,
			"depth" : 0.5
		}
	);
	phaser = new Tone.Phaser(
		{
			"frequency" : 15, 
			"octaves" : 5, 
			"baseFrequency" : 1000
		}
	);
	chorus = new Tone.Chorus(5,5.5,0.5);

	player1 = new Tone.Player("melan.mp3");
	player2 = new Tone.Player("mylove.mp3");
	player3 = new Tone.Player("piano.mp3");
	player4 = new Tone.Player("Nodens.mp3");

	playButton1 = createButton('Play');
 	playButton1.position(20, 40);
	playButton1.mousePressed(play1);
	playButton2 = createButton('Play');
 	playButton2.position(20, 120);
	playButton2.mousePressed(play2);
	playButton3 = createButton('Play');
 	playButton3.position(20, 200);
	playButton3.mousePressed(play3);
	playButton4 = createButton('Play');
 	playButton4.position(20, 280);
	playButton4.mousePressed(play4);

	stopButton1 = createButton('Stop');
	stopButton1.position(20,60);
	stopButton1.mousePressed(stop1);
	stopButton2 = createButton('Stop');
	stopButton2.position(20,140);
	stopButton2.mousePressed(stop2);
	stopButton3 = createButton('Stop');
	stopButton3.position(20,220);
	stopButton3.mousePressed(stop3);
	stopButton4 = createButton('Stop');
	stopButton4.position(20,300);
	stopButton4.mousePressed(stop4);

	distortButton = createButton('Add Distortion Effect');
	distortButton.position(100,50);
	distortButton.mousePressed(distort);
	vibButton = createButton("Add Vibrato Effect");
	vibButton.position(100,130);
	vibButton.mousePressed(vib);
	phaButton = createButton("Add Phaser Effect");
	phaButton.position(100,210);
	phaButton.mousePressed(pha);
	choButton = createButton("Add Chorus Effect");
	choButton.position(100,290);
	choButton.mousePressed(cho);

	duButton = createButton('+1 Distortion');
	duButton.position(250,40);
	duButton.mousePressed(distortUp);
	ddButton = createButton('-1 Distortion');
	ddButton.position(250,60);
	ddButton.mousePressed(distortDown);

	vfuButton = createButton('+1 Frequency');
	vfuButton.position(250,120);
	vfuButton.mousePressed(vibFreqUp);
	vfdButton = createButton('-1 Frequency');
	vfdButton.position(250,140);
	vfdButton.mousePressed(vibFreqDown);
	vduButton = createButton('+1 Depth');
	vduButton.position(350,120);
	vduButton.mousePressed(vibDepthUp);
	vddButton = createButton('-1 Depth');
	vddButton.position(350,140);
	vddButton.mousePressed(vibDepthDown);

	pfuButton = createButton('+1 Frequency');
	pfuButton.position(250,200);
	pfuButton.mousePressed(phaFreqUp);
	pfdButton = createButton('-1 Frequency');
	pfdButton.position(250,220);
	pfdButton.mousePressed(phaFreqDown);
	pouButton = createButton('+1 Octave');
	pouButton.position(350,200);
	pouButton.mousePressed(phaOctaveUp);
	podButton = createButton('-1 Octave');
	podButton.position(350,220);
	podButton.mousePressed(phaOctaveDown);

	cfuButton = createButton('+1 Frequency');
	cfuButton.position(250,280);
	cfuButton.mousePressed(choFreqUp);
	cfdButton = createButton('-1 Frequency'); 
	cfdButton.position(250,300);
	cfdButton.mousePressed(choFreqDown);
	
}
function setup() {
	createCanvas(480,360);
	background(255,150,150);
	textSize(20);
	fill(255);
	text(nowPlaying1, 20, 30);
	text(nowPlaying2, 20, 110);
	text(nowPlaying3, 20, 190);
	text(nowPlaying4, 20, 270);
}
function play1() {
	player1.toMaster().start();
}
function stop1() {
	player1.stop();
}
function distort() {
	distorty.toMaster();
	player1.connect(distorty);
}
function distortUp() {
	distorty.distortion += 0.1;
}
function distortDown() {
	distorty.distortion -= 0.1;
}

function play2() {
	player2.toMaster().start();
}
function stop2() {
	player2.stop();
}
function vib() {
	vibrato.toMaster();
	player2.connect(vibrato);
}
function vibFreqUp() {
	vibrato.frequency.value += 0.1;
}
function vibFreqDown() {
	vibrato.frequency.value -= 0.1;
}
function vibDepthUp() {
	vibrato.depth.value += 0.1;
}
function vibDepthDown() {
	vibrato.depth.value -= 0.1;
}

function play3() {
	player3.toMaster().start();
}
function stop3() {
	player3.stop();
}
function pha() {
	phaser.toMaster();
	player3.connect(phaser);
}
function phaFreqUp() {
	phaser.frequency.value += 1;
}
function phaFreqDown() {
	phaser.frequency.value -= 1;
}
function phaOctaveUp() {
	phaser.octaves.value += 1;
}
function phaOctaveDown() {
	phaser.octaves.value -= 1;
}

function play4() {
	player4.toMaster().start();
}
function stop4() {
	player4.stop();
}
function cho() {
	chorus.toMaster();
	player4.connect(chorus);
}
function choFreqUp() {
	chorus.frequency.value += 0.5;
}
function choFreqDown() {
	chorus.frequency.value -= 0.5;
}
