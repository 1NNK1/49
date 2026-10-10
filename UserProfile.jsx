import React, { useState, useEffect } from 'react';

// Компонент профиля
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div data-testid="loading">Загрузка...</div>;
  if (error) return <div data-testid="error">Ошибка: {error}</div>;

  return (
    <div data-testid="user-profile" style={styles.card}>
      <h2>Профиль пользователя</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Город:</strong> {user.address.city}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '20px auto',
    fontFamily: 'Arial',
    backgroundColor: '#f9f9f9'
  }
};

export default UserProfile;
