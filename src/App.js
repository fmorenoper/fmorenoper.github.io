import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, ChessBoard } from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chess" element={<ChessBoard />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
