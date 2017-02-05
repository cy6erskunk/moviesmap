import React, {Component} from 'react';
import { render } from 'react-dom';

function MovieTitleOption(props) {
    let title = typeof props.title !== "undefined" ? props.title : props.value;
    return (
        <option value={props.value}>{title}</option>
    );
}

const selectorStyle = {
    margin: '1em',
    width: 'calc(100% - 2em)',
    fontSize: '18px'
};

class MovieSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        const titles = props.titles;
        this.titlesList = titles.map((title, index) => 
            <MovieTitleOption key={index} value={title}/>
        );
        this.titlesList.unshift(<MovieTitleOption key="-1" title="(select title to proceed)" value=""/>)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.handleChange(event.target.value);
    }
    
    render() {
        return (
            <select value={this.state.value} 
                    onChange={this.handleChange.bind(this)}
                    style={selectorStyle}
                    >{this.titlesList}</select>
        );
    }
}

export default MovieSelector;