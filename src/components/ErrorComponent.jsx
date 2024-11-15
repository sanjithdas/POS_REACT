import React from 'react';

const ErrorComponent = () => {
    console.log("error component");
  throw new Error('Test Error - This is a test error');
  return <div>This will never be displayed</div>;
};

export default ErrorComponent;
