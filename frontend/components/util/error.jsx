import React from 'react';

const Error = ({msg}) => {
  if (msg) {
    return (
      <div className='error'>{msg}</div>
    );
  } else {
    return null;
  }
}

export default Error;
