import React, { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <span className="font-extrabold text-9xl mb-2">404</span>
          <h1 className="font-light text-5xl">SOMETHING WENT WRONG</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
