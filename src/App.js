import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import List from './components/List';
import Update from './components/Update';
import Creater from './components/Creater';

function App() {
  return (
    <div className="container">
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
       <Link to='/' className='navbar-brand'>TODO LIST</Link>
    </nav>
    <br/>

        <Routes>
          <Route path="/" element={<List/>} />
          <Route path='/update/:id' element={<Update/>} />
          <Route path='/create' element={<Creater/>}/>
        </Routes>
    </div>
  );
}

export default App;
