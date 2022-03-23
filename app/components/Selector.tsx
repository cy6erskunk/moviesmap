import PropTypes from 'prop-types'
import React, {Component} from 'react'

function MovieTitleOption(props: any) {
  const title = typeof props.title !== 'undefined' ? props.title : props.value
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
  static propTypes = {
    handleChange: PropTypes.func,
    titles: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    loadingData: PropTypes.bool,
  }

  static defaultProps = {
    titles: [],
    loadingData: false,
  }

  titlesList: any;

  constructor(props: any) {
    super(props)

    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChange' does not exist on type 'Re... Remove this comment to see the full error message
    this.props.handleChange(event.target.value)
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'titles' does not exist on type 'Readonly... Remove this comment to see the full error message
    const titles = this.props.titles
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingData' does not exist on type 'Rea... Remove this comment to see the full error message
    if (!this.props.loadingData) {
      this.titlesList = titles.map((title: any, index: any) => {
        const key = `__id_${index}`
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <MovieTitleOption key={key} value={title} />
      })
      this.titlesList.unshift(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MovieTitleOption key="-1" title="(select title to proceed)" value="" />,
      )
    } else {
      this.titlesList.unshift(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MovieTitleOption key={Math.random()} title="(Loading...)" value="" />,
      )
    }

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <select
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        value={this.props.value}
        onChange={this.handleChange}
        style={selectorStyle}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingData' does not exist on type 'Rea... Remove this comment to see the full error message
        disabled={this.props.loadingData}
      >
        {this.titlesList}
      </select>
    )
  }
}

export default MovieSelector
