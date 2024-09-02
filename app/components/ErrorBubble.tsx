import type { CSSProperties } from 'react';

const errorStyle: CSSProperties = {
  color: 'red',
  position: 'fixed',
  top: '0',
  left: '0'
};

function ErrorBubble(props: { message?: string } = { message: '' }) {
  const style = { ...errorStyle, display: props.message ? 'block' : 'none' };
  return <div style={style}>{`Something went wrong: ${props.message}`}</div>;
}

export default ErrorBubble;
