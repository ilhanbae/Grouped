import { Routes, Route } from 'react-router-dom';
import './index.css';
import Login from "./pages/Login/Login";

export default function App() {
  return (
      <div>
          <Routes>
              <Route path='/login' element={<Login/>}/>
          </Routes>
      </div>
  );
}