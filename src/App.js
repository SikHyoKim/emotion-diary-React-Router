import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>App.js</h2>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />}/>
        <Route path='/Edit' element={<Edit />}/>
        <Route path='/Diary:id' element={<Diary />}/>
      </Routes>
      <RouteTest />
    </div>
    </BrowserRouter>
  );
}

export default App;
