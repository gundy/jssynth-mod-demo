import React from 'react/addons';

export class SongDetails extends React.Component {
	start() {
		window.audioOut.start();
	}

	stop() {
		window.audioOut.stop();
	}

	previousPos() {
		window.player.previousPos();
	}

	nextPos() {
		window.player.nextPos();
	}

	toggleFilter() {
		window.toggleFilter();
	}

	render() {
		var song = this.props.song;
		var playerState = this.props.playerState;
		var playerPos = playerState.pos;
		var playerOrder = song.orders[playerState.pos];

		return (
			<div className="songDetailsContainer">
				<div className="infoRow">
					<div className="songDetails">
						<div className="row"><div className="header songName">Song Name:</div><div className="value songName">{song.name}</div></div>
						<div className="row"><div className="header songType">Song Type:</div><div className="value songType">{song.type}</div></div>
						<div className="row"><div className="header songChannels">Num channels:</div><div className="value songChannels">{song.channels}</div></div>
						<div className="row"><div className="header songLength">Song length:</div><div className="value songLength">{song.songLength}</div></div>
					</div>
					<div className="playerDetails">
						<div className="row"><div className="header songSpeed">Speed:</div><div className="value songSpeed">{playerState.speed} / {playerState.bpm}</div></div>
						<div className="row"><div className="header songPos">Position/Pattern: </div><div className="value songPos">{playerPos} / {playerOrder}</div></div>
						<div className="row"><div className="header songRow">Row: </div><div className="value songRow">{playerState.row}</div></div>
					</div>
				</div>
				<div className="controlsRow">
					<div className="controls">
						<button className="button" type="button" onClick={this.start}>Play</button>
						<button className="button" type="button" onClick={this.stop}>|&nbsp;|</button>
						<button className="button" type="button" onClick={this.previousPos}>&lt;&lt;</button>
						<button className="button" type="button" onClick={this.nextPos}>&gt;&gt;</button>
						<button className="button" type="button" onClick={this.toggleFilter}>Toggle filter</button>
					</div>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}
