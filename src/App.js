import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './pages/Home';
import Stats from './pages/Stats';
import './style.css';

function App() {
  // CAPTURE TEST STATISTICS
  // RESET BTN FUNCTION

  return (
    <div className="app">
      <Nav />
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/statistics" element={<Stats />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
