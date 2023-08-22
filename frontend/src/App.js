// src/App.js
import React from 'react';
import Routess from './Routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import setAuthToken from './Utils/setAuthToken';

const token = localStorage.token;
if (token) {
  setAuthToken(token);
}

// Create an ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform any error handling here
    console.error('Error occurred:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routess />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
