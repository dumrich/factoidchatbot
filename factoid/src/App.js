import React from 'react';
import ChatWindow from './ChatWindow'; // Import ChatWindow component
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider
import './App.css'; // Import global styles (if any)

function App() {
  return (
    <ThemeProvider> {/* Wrap your app in ThemeProvider */}
      <div className="App">

          <ChatWindow /> {/* Render the ChatWindow component */}
      </div>
    </ThemeProvider>
  );
}

export default App;