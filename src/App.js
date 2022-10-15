import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Tasks from './pages/Tasks';
import InfoPanel from './pages/Info-Panel';

const App = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Tasks />} />
          <Route path='/info-panel' element={<InfoPanel />} />
        </Routes>
      </BrowserRouter>
  )}
 else {
    return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<Tasks />} />
          <Route path='/info-panel' element={<InfoPanel />} />
        </Routes>
      </HashRouter>)
  }
}

export default App;
