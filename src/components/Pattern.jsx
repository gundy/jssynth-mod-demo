import React from 'react/addons';

export class PatternChannel extends React.Component {
	render() {
		var cx = React.addons.classSet;
		var tdClasses = cx({
			'pattern-data': true
		});
		return (
			<td className={tdClasses}>{this.props.chan.note} {this.props.chan.sampleNumber} {this.props.chan.volume} {this.props.chan.effect} {this.props.chan.parameter}</td>
		)
	}
}

export class PatternRow extends React.Component {
    render() {
        var cx = React.addons.classSet;
        var rowClasses = cx({
            'pattern-row': true,
                'playing': this.props.row.playing,
                'row-has-data': !this.props.row.empty,
                'alternate-row': (this.props.row.rowNum !== "" && ((this.props.row.rowNum % 2) === 0))
        });
        var thClasses = cx({
            'pattern-row-num': true
        });
        return (
            <tr className={rowClasses}>
                <th className={thClasses}>{this.props.row.rowNum}</th>
                {this.props.row.channels.map(function(object, i) {
                    return <PatternChannel chan={object}/>
                })}
            </tr>
        )
    }
}

export class Pattern extends React.Component {
    render() {
        var cx = React.addons.classSet;
        var tableClasses = cx({
            'scrollable': true,
            'song-pattern': true
        });
        return (
            <table className={tableClasses}>
                    <thead>
                        <tr>
                            <th></th>
                            {this.props.rows[0].channels.map(function(object, cn) {
                                return (
                                    <th>{cn+1}</th>
                                )
                            })}
                        </tr>
                    </thead>
                <tbody>
                {this.props.rows.map(function(object, i){
                    return <PatternRow row={object}/>;
                })}
                </tbody>
            </table>
        )
    }
}

