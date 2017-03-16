/*
 * Name: Thanh Trinh
 * Audio Project: Make p5 Sing! & Bug Squish
 */

var bug = [];
var count = 30;
var time, speed;
var state, score, isSquished;
var isPlaying = false;

var synth, chordLoop, seq;

function preload() {
	for(var i = 0; i < count; i++) {
		bug[i] = new Buggie("ladybug.png", random(40, 600), random(480), random(-1, +1), 2);
	}
}

function setup() {
	createCanvas(640,480);
	imageMode(CENTER);
	state = 0;						// play start music
	score = 0;
	speed = 6;
	isSquished = false;

	Tone.Transport.bpm.value = 120;
	Tone.Transport.loop = true;
	Tone.Transport.loopEnd = '1m';

	synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster();
	synth.volume.value = -12;

	Tone.Transport.schedule(function(time){ 
			synth.triggerAttackRelease(['b3','c4','e4'],'2n', time);
			synth.triggerAttackRelease(['e3','b3','e4'],'2n', '+2n');
		}, '8n');

	if(state == 0)
		Tone.Transport.start();
}

function triggerSynth(time){
	synth.triggerAttackRelease('B4','8n', time);
}

function synthNotes(time, note){
	synth.triggerAttackRelease(note,'8n',time);
}

function draw() {
	if(state == 0) {
		background(50,250,50);
		textSize(50);
		text("Bug Squish",200,240);
		textSize(25);
		text("Press Any Key to Start", 200,300);
	}

	if(state == 1) {
		background(50,250,50);
		for(var i = 0; i < count; i++) {
			bug[i].draw();
		}
		time = 31 - round(millis()/1000);
		if(time > 0) {
			textSize(25);
			text("Time: "+ time, 5, 25);
			textSize(25);
			text("Score: "+ score, 5, 55);
		}
		else {
			chordLoop = new Tone.Loop(function(time){ 
				synth.triggerAttackRelease(['a3','c4','e4'],'2n', time);
				synth.triggerAttackRelease(['e3','g#3','e4'],'2n', '+2n');
			}, '8n');
			chordLoop.start(0);	
			state = 2;				// end game music
		}
	}

	if(state == 2) {
		textSize(50);
		text("GAME OVER",200,240);
		textSize(25);
		text("Your Score: "+ score,200,300);
	}
}

function mousePressed() {
	for(var i = 0; i < count; i++) {
		bug[i].squish(mouseX,mouseY); 
									// make squish noises
	}
	speed += 2;						//as game speeds up, music speeds up
}

function mouseReleased() {
	for(var i = 0; i < count; i++) {
		bug[i].dead(mouseX,mouseY);
	}
}

function keyPressed() {
								// play game music
	seq = new Tone.Sequence(synthNotes, ['a3','b3','c3'], '8n');
	seq.start(0);
	
	state = 1;
}

function Buggie(imageName,x,y,moving,health) {
	this.spritesheet = loadImage(imageName);
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.moving = moving;
	this.facing = moving;
	this.health = health;
	
	this.draw = function() {
		push();
		
		translate(this.x,this.y);
		if(this.facing < 0) {
			scale(-1.0,1.0);
		}
		if(this.moving != 0) {
			if(this.frame == 0)
				image(this.spritesheet, 0, 0,80,80,160,0,80,80);
			if(this.frame == 1)
				image(this.spritesheet, 0, 0,80,80,240,0,80,80);
			if(this.frame == 2)
				image(this.spritesheet, 0, 0,80,80,320,0,80,80);
			if(this.frame == 3)
				image(this.spritesheet, 0, 0,80,80,400,0,80,80);
			if(frameCount%4 == 0) {
				this.frame = (this.frame + 1)%4;
				this.x = this.x + speed * this.moving;
				if(this.x < 40 || this.x > width-40) {
					this.moving = -this.moving;
					this.facing = -this.facing;
				}			
			}
		}
		else {
			if(this.health == 0) {
				image(this.spritesheet,0,0,80,80,80,0,80,80);
			}
			if(this.health == 1) {
				image(this.spritesheet,0,0,80,80,0,0,80,80);			
			}
		}
		pop();
	}

	this.squish = function(x,y) {
		if(this.x-40 < x && x < this.x+40 &&
			this.y-40 < y && y < this.y+40) {
			this.moving = 0;
			this.health = 1;
			score++;
			synth.triggerAttackRelease('C2','8n');
		}
	}

	this.dead = function(x,y) {
		if(this.x-40 < x && x < this.x+40 &&
			this.y-40 < y && y < this.y+40) {
			this.health = 0;
		}
	}
}