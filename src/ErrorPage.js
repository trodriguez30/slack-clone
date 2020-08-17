import React from "react";

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading failed!</p>;
    }

    return this.props.children;
  }
}

export default ErrorPage;
