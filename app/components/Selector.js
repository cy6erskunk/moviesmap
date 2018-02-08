import PropTypes from 'prop-types'
import React, {Component} from 'react'

function MovieTitleOption(props) {
  const title = typeof props.title !== 'undefined' ? props.title : props.value
  return <option value={props.value}>{title}</option>
}

MovieTitleOption.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
}

const selectorStyle = {
  margin: '1em',
  width: 'calc(100% - 2em)',
  fontSize: '18px',
}

class MovieSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleChange(event.target.value)
  }

  render() {
    const titles = this.props.titles
    if (!this.props.loadingData) {
      this.titlesList = titles.map((title, index) => {
        const key = `__id_${index}`
        return <MovieTitleOption key={key} value={title} />
      })
      this.titlesList.unshift(
        <MovieTitleOption key="-1" title="(select title to proceed)" value="" />,
      )
    } else {
      this.titlesList.unshift(
        <MovieTitleOption key={Math.random()} title="(Loading...)" value="" />,
      )
    }

    return (
      <select
        value={this.props.value}
        onChange={this.handleChange}
        style={selectorStyle}
        disabled={this.props.loadingData}
      >
        {this.titlesList}
      </select>
    )
  }
}

MovieSelector.propTypes = {
  handleChange: PropTypes.func,
  titles: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  loadingData: PropTypes.bool,
}

MovieSelector.defaultProps = {
  titles: [],
  loadingData: false,
}

export default MovieSelector
