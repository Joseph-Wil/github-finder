import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const options = { headers: { Authorization: `Bearer ${token}`} };
  const userEndpoint = `https://api.github.com/users/${username}`;
  const reposEndpoint = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(userEndpoint, options);
        setUserData(userResponse.data);

        const reposResponse = await axios.get(reposEndpoint, options);
        const sortedRepos = reposResponse.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching user information:', error.message);
      }
    };

    if (username) {
        fetchUserData();
    }

  }, [username, token, options, userEndpoint, reposEndpoint]);

  return (
    <motion.section
      className='github-box container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className='github-box container'>
          {userData ? (
          <div className='github-profile'>
              <img src={userData.avatar_url} alt={`${userData.name}'s profile`} />
              <h2 className='profile-name'>{userData.name}</h2>
              <div className='profile-stats'>
                <div className='stats'>
                  <p className='number'>{userData.public_repos}</p>
                  <p className='label'>Repositories</p>
                </div>
                <div className='stats'>
                  <p className='number'>{userData.followers}</p>
                  <p className='label'>Followers</p>
                </div>
                <div className='stats'>
                  <p className='number'>{userData.following}</p>
                  <p className='label'>Following</p>
                </div>
              </div>
              <a href={`https://github.com/${username}`} target='_blank' rel='noopener noreferrer' className='github-btn'>
              Go to GitHub
            </a>
          </div>
          ) : (
              <div>Loading...</div>
          )}
          <section className='repo container'>
              <ul>
                  {repos.map(repo => (
                      <li key={repo.id} className='repo-box'>
                        <div className='repo-header'>
                          <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a>
                          <p className='repo-date'>Last updated: {new Date(repo.created_at).toLocaleDateString()}</p>
                        </div>
                          <p className='repo-description'>{repo.description}</p>
                      </li>
                  ))}
              </ul>
          </section>
      </section>
    </motion.section>
  );
};

export default User