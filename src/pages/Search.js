import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Search() {
  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
        try {
            await axios.get(`https://api.github.com/users/${username}`);
            setUserExists(true);
            navigate(`/user/${username}`);
        } catch (error) {
            setUserExists(false);
        }
    }
  }

  return (
    <motion.section
      className='container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <section className='container'>
        <div className='search-box'>
            <i className="fa-brands fa-github"></i>
            <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
            </form>
            <h1>Welcome to GitHub Finder</h1>
            {!userExists && <p className='error-msg'>User does not exist</p>}
        </div>
    </section>
    </motion.section>
  );
};

export default Search