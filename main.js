let inputProfile, inputNote, inputOctave, inputDuration;
let generateButton;
let dl;

window.onload = function() {
	inputProfile = document.getElementById("profile")
	inputNote = document.getElementById("note");
	inputOctave = document.getElementById("octave");
	inputDuration = document.getElementById("duration");
	generateButton = document.getElementById("submit");

	generateButton.addEventListener('click', generate);

	dl = document.getElementById("download");

}

function generate() {
	Synth instanceof AudioSynth; // true

	let testInstance = new AudioSynth;
	testInstance instanceof AudioSynth; // true

	testInstance === Synth; // true

	let profile = inputProfile.options[inputProfile.selectedIndex].value;
	let note = inputNote.options[inputNote.selectedIndex].value;
	let octave = inputOctave.value;
	let duration = parseInt(inputDuration.value);

	Synth.setSampleRate(4000);
	console.log(profile, note, octave, duration);

	customProfile();

	Synth.play(profile, note, octave, duration);

	let wav = Synth.generate(profile, note, octave, duration);

	let data = {
		URL: wav,
		profile: profile,
		note: note,
		octave: octave,
		duration: duration
	};

	download(data)
	//console.log(typeof(wav));
	//console.log(wav);
	//document.body.appendChild(wav)
}

function download(data) {
	let filename = data.profile + "_" + data.note +  data.octave + ".wav";
	console.log(filename);
	dl.download = filename;
	dl.innerHTML = dl.download;
	dl.href = data.URL

}

function customProfile() {
	Synth.loadSoundProfile({
		name: 'custom',
		attack: function() { return 0.0002; },
		dampen: function(sampleRate, frequency, volume) {
			return 2*Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
		},
		wave: function(i, sampleRate, frequency, volume) {
			var base = this.modulate[0];
			return this.modulate[1](
				i,
				sampleRate,
				frequency,
				Math.pow(base(i, sampleRate, frequency, 0), 2) +
					(0.75 * base(i, sampleRate, frequency, 0.25)) +
					(0.1 * base(i, sampleRate, frequency, 0.5))
			);
		}
	})
}
