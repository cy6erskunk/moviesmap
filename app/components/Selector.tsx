import React, { type FormEvent } from 'react';

type MovieTitleProps = {
  title?: string;
  value: string;
};
function MovieTitleOption(props: MovieTitleProps) {
  const title = typeof props.title !== 'undefined' ? props.title : props.value;
  return <option value={props.value}>{title}</option>;
}

const selectorStyle = {
  margin: '1em',
  width: 'calc(100% - 2em)',
  fontSize: '18px'
};

type Props = {
  handleChange?: (title: string, loadingHistory?: any[]) => void;
  titles: string[];
  value?: string;
  loadingData?: boolean;
  className?: string;
};
const MovieSelector = (
  props: Props = {
    titles: [],
    loadingData: false
  }
): JSX.Element => {
  const titles = props.titles;
  let titlesList: JSX.Element[] = [];

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    props.handleChange?.(event.currentTarget.value);
  };

  if (props.loadingData) {
    titlesList.unshift(
      <MovieTitleOption key={Math.random()} title="(Loading...)" value="" />
    );
  } else {
    titlesList = titles.map((title: any, index: any) => {
      const key = `__id_${index}`;
      return <MovieTitleOption key={key} value={title} />;
    });
    titlesList.unshift(
      <MovieTitleOption key="-1" title="(select title to proceed)" value="" />
    );
  }

  return (
    <select
      value={props.value}
      onChange={handleChange}
      style={selectorStyle}
      disabled={props.loadingData}
    >
      {titlesList}
    </select>
  );
};

export default MovieSelector;
