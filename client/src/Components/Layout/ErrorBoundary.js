import React, { useState } from "react";
import withErrorBoundary from "./withErrorBoundary";

function withErrorBoundary(WrappedComponent) {
  return function ErrorBoundary(props) {
    const [error, setError] = useState(null);

    if (error) {
      return <div>An error occurred: {error.toString()}</div>;
    }

    try {
      return <WrappedComponent {...props} />;
    } catch (err) {
      setError(err);
    }
  };
}

export { withErrorBoundary };




function MyComponent() {
  // ...
}

export default withErrorBoundary(MyComponent);
