import React from 'react/addons'
import {Pattern} from '../components/Pattern.jsx!'
import {InstrumentList} from '../components/InstrumentList.jsx!'
import {SongDetails} from '../components/SongDetails.jsx!'
import {Mixer} from 'gundy/jssynth'
import {WebAudioDriver} from 'gundy/jssynth'
import {Player} from 'gundy/jssynth-mod'
import {MODLoader} from 'gundy/jssynth-mod';
import {S3MLoader} from 'gundy/jssynth-mod';
import {PatternViewModelBuilder} from './PatternViewModelBuilder'

//import modFile from '../data/mods/ode2ptk.mod'
import s3mFile from '../data/s3ms/2ND_PM.s3m'

//window.song = MODLoader.readMODfile(modFile);
window.song = S3MLoader.readS3Mfile(s3mFile);

window.mixer = new Mixer({numChannels: 8 /* all 8 channels for music */ });
window.player = new Player(window.mixer);
window.player.setSong(window.song);
window.audioOut = new WebAudioDriver(window.mixer, 4096);  /* 4096/8192/.. = buffer size */
window.toggleFilter = function() { player.playerState.filter = 1 - player.playerState.filter};

var renderPattern = function(playerState) {
	var patternModel = PatternViewModelBuilder.createPatternViewModel(playerState, window.song, window.song.orders[playerState.pos]);
	React.render(
		React.createElement(InstrumentList, {song: song, playerState: player.playerState}),
		document.getElementById('song-instrument-list')
	);
	React.render(
		React.createElement(SongDetails, {song: song, playerState: player.playerState}),
		document.getElementById('song-ui-details-container')
	);
	React.render(
		React.createElement(Pattern, patternModel),
		document.getElementById('song-pattern-container')
	);
};

player.registerCallback(function(playerState, channelStateArray) {
	renderPattern(playerState);
});

renderPattern(window.player.getPlayerState());

window.mixer.setPostMixCallback(function(mixData) {
	// maybe do something in here - eg. update Spectrum Analyser
}, window);
