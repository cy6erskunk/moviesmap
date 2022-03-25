import PropTypes from 'prop-types'
import React, {Component} from 'react'

type MovieTitleProps = {
  title?: string
  value: string
}
function MovieTitleOption(props: MovieTitleProps) {
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

type Props = {
  handleChange: (title: string, loadingHistory: Array<any>) => void
  titles: string[]
  value?: string
  loadingData: boolean
  className?: string
}
class MovieSelector extends Component<Props> {
  static defaultProps = {
    titles: [],
    loadingData: false,
  }

  titlesList: any

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
    const titles = this.props.titles
    if (!this.props.loadingData) {
      this.titlesList = titles.map((title: any, index: any) => {
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

export default MovieSelector
