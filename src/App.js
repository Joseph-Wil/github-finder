import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <section>
      <div className='container'>
      <AnimatePresence exitBeforeEnter={false} mode="wait">
        <Routes>
            <Route exact path='/' element={<Search />} />
            <Route exact path='/user/:username' element={<User />} />
        </Routes>
      </AnimatePresence>
      </div>
    </section>
  );
}

export default App;
