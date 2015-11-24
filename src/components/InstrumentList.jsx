import React from 'react/addons';

export class InstrumentItem extends React.Component {
    render() {
        var cx = React.addons.classSet;
        var instrumentIsPlaying = InstrumentItem.isSamplePlaying(this.props.num, this.props.song, this.props.playerState);
        var rowClasses = cx({
            'playing': instrumentIsPlaying
        });
        var nameClasses = cx({
            'name': true
        });

        var sampleDat;
        if (this.props.sample) {
            var bRep = this.props.sample.repeatType !== 'NON_REPEATING';
            var repeatFlag = 'N';
            if (bRep) {
                repeatFlag = 'Y';
            }
            sampleDat = {
                "name": this.props.sample.name,
                "sampleLength": this.props.sample.sampleLength,
                "volume": this.props.sample.volume,
                "repeatFlag": repeatFlag,
                "repeatStart": this.props.sample.repeatStart,
                "repeatEnd": this.props.sample.repeatEnd
            }
        } else {
            sampleDat = {
                name: "",
                sampleLength: "",
                volume: "",
                repeatFlag: "",
                repeatStart: "",
                repeatEnd: ""
            }
        }
        var hexNum = this.props.num.toString(16);
        return (
        <tr className={rowClasses}>
            <td>{hexNum}</td>
            <td className={nameClasses}>{sampleDat.name}</td>
            <td>{sampleDat.sampleLength}</td>
            <td>{sampleDat.volume}</td>
            <td>{sampleDat.repeatFlag}</td>
            <td>{sampleDat.repeatStart}</td>
            <td>{sampleDat.repeatEnd}</td>
        </tr>
        )
    }

	static isSamplePlaying(testSample, song, playerState) {
		if (song.orders && song.orders[playerState.pos] >= 0 && song.patterns[song.orders[playerState.pos]][playerState.row]) {
			for (var chan = 0; chan < song.channels; chan++) {
				var note = song.patterns[song.orders[playerState.pos]][playerState.row][chan]

				var sampleNumber = note.sampleNumber;
				if (sampleNumber === testSample && note.note > 0 && note.note < 254) {
					return true;
				}
			}
		}
		return false;
	}
}

export class InstrumentList extends React.Component {
    render() {
        var cx = React.addons.classSet;
        var tableClasses = cx({
            'instrument-list': true
        });
        var nameClasses = cx({'name': true});
        var song = this.props.song;
        var playerState = this.props.playerState;
        return (
            <table className={tableClasses}>
                <thead>
                    <tr>
                        <th colSpan='8'>Instruments</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th className={nameClasses}>Name</th>
                        <th>Len</th>
                        <th>Vol</th>
                        <th>Rep?</th>
                        <th>Rep Start</th>
                        <th>Rep End</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.song.instruments.map(function(object, i) {
                    return object.samples.map(function(o2, i2) {
                        return <InstrumentItem num={i+1} sample={o2.metadata} song={song} playerState={playerState}/>;
                    });
                })}
                </tbody>
            </table>
        )
    }
}

