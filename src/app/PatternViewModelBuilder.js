import {MOD_PERIOD_TABLE} from 'gundy/jssynth-mod';

export class PatternViewModelBuilder {
	static createPatternChannelViewModel(playerState, song, patternRow) {
		var channels = [];
		for (var chan = 0; chan < song.channels; chan++) {
			var note = patternRow[chan];

			var noteText = "---";
			var sampleText = "--";
			var volumeText = "--";
			var effectText = "-";
			var parameterText = "--";
			if (note.note > 0) {
				noteText = MOD_PERIOD_TABLE.getName(note.note);
			}
			if (note.sampleNumber > 0) {
				sampleText = ("0"+note.sampleNumber.toString(16)).slice(-2);
			}
			if (note.volume > 0) {
				volumeText = ("0"+note.volume.toString(16)).slice(-2);
			}
			if (note.parameter !== 0x00 || note.effect !== 0x00) {
				if (song.effectMap[note.effect]) {
					effectText = song.effectMap[note.effect].code;
				} else {
					effectText = "?";
				}
			}

			if (note.parameter !== 0x00 || note.effect !== 0x00) {
				parameterText = ("0"+note.parameter.toString(16)).slice(-2);
			}

			channels.push({
				"note": noteText,
				"sampleNumber": sampleText,
				"volume": volumeText,
				"effect": effectText,
				"parameter": parameterText
			});
		}
		return channels;
	};

	/* view model always has 33 rows, 16+1+16 */
	static createPatternViewModel(playerState, song, patternNumber) {

		var EMPTY_ROW = {
			rowNum: "",
			playing: false,
			empty: true,
			channels: []
		};

		var i;

		for (i = 0; i< song.channels; i++) {
			EMPTY_ROW.channels.push(
				{
					note: "",
					sampleNumber: "",
					volume: "",
					effect: "",
					"parameter": ""
				}
			);
		}
		var pattern = song.patterns[patternNumber];
		var row = playerState.row;

		var rowCount = 0;
		var rows = [];
		if (row < 7) {  /* 0..15 needs to be empty if no rows here */
			for (i = 0; i < 7-row; i++) {
				rows.push(EMPTY_ROW);
				rowCount++;
			}
		}
		var currentRow = row - 7;
		if (currentRow < 0) {
			currentRow = 0;
		}

		var endRow = row + 8;
		if (endRow >= pattern.length) {
			endRow = pattern.length-1;
		}

		while (currentRow <= endRow) {
			rows.push({
				rowNum: currentRow,
				playing: currentRow === playerState.row,
				empty: false,
				channels: PatternViewModelBuilder.createPatternChannelViewModel(playerState, song, pattern[currentRow])
			});
			currentRow++;
			rowCount++;
		}

		while (rowCount <= 15) {
			rows.push(EMPTY_ROW);
			rowCount++;
		}

		return {
			"rows": rows
		};
	};
}
