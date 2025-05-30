import React, { useEffect, useState } from 'react';

function App() {
  const [selectedPage, setSelectedPage] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([
    { name: 'Milk', description: '2 liters of fresh milk', date: new Date().toLocaleString() },
    { name: 'Bread', description: 'Whole wheat bread loaf', date: new Date().toLocaleString() },
    { name: 'Eggs', description: 'One dozen organic eggs', date: new Date().toLocaleString() },
    { name: 'Shampoo', description: 'Anti-dandruff 400ml', date: new Date().toLocaleString() },
    { name: 'Notebook', description: 'A5 ruled notebook', date: new Date().toLocaleString() },
    { name: 'Pen', description: 'Black gel pen', date: new Date().toLocaleString() },
  ]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (selectedPage === 'users') {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('API error:', error);
          setLoading(false);
        });
    }
  }, [selectedPage]);

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      setItems([...items, {
        ...newItem,
        date: new Date().toLocaleString()
      }]);
      setNewItem({ name: '', description: '' });
    }
  };

  const handleRemoveItem = index => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleContactChange = e => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = e => {
    e.preventDefault();
    alert(`Contact Form Submitted:\n${JSON.stringify(contact, null, 2)}`);
  };

  const menuItems = [
    { key: 'contact', label: 'Contact Form', icon: '📨' },
    { key: 'list', label: 'Item List', icon: '🛒' },
    { key: 'users', label: 'User List', icon: '👥' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#2c3e50',
        color: '#ecf0f1',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{ textAlign: 'center' }}>📁 My React App</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menuItems.map(item => (
            <li key={item.key} style={{ margin: '10px 0' }}>
              <button
                onClick={() => setSelectedPage(item.key)}
                style={{
                  width: '100%',
                  background: selectedPage === item.key ? '#1abc9c' : 'transparent',
                  border: 'none',
                  color: 'inherit',
                  padding: '10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              >
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f6f7' }}>
        {selectedPage === 'contact' && (
          <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleContactSubmit}
              style={{
                maxWidth: '800px',
                background: '#fff',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', gap: '20px', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label>Name:</label>
                  <input type="text" name="name" value={contact.name} onChange={handleContactChange} required placeholder="John Doe" style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Email:</label>
                  <input type="email" name="email" value={contact.email} onChange={handleContactChange} required placeholder="john@example.com" style={{ width: '100%', padding: '8px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label>Phone:</label>
                  <input type="tel" name="phone" value={contact.phone} onChange={handleContactChange} placeholder="+92 300 0000000" style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Subject:</label>
                  <input type="text" name="subject" value={contact.subject} onChange={handleContactChange} placeholder="Regarding..." style={{ width: '100%', padding: '8px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Message:</label>
                <textarea name="message" value={contact.message} onChange={handleContactChange} rows="5" placeholder="Your message here..." style={{ width: '100%', padding: '8px' }}></textarea>
              </div>

              <button type="submit" style={{ background: '#1abc9c', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Submit</button>
            </form>
          </div>
        )}

        {selectedPage === 'list' && (
          <div>
            <h2>Shopping / Task Items</h2>
            <div style={{ marginBottom: '1rem', background: '#fff', padding: '1rem', borderRadius: '10px' }}>
              <input
                type="text"
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item Name"
                style={{ padding: '8px', marginRight: '10px', width: '30%' }}
              />
              <input
                type="text"
                value={newItem.description}
                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Item Description"
                style={{ padding: '8px', marginRight: '10px', width: '40%' }}
              />
              <button onClick={handleAddItem} style={{ padding: '8px 12px', background: '#2980b9', color: '#fff', border: 'none', borderRadius: '5px' }}>Add</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((item, index) => (
                <li key={index} style={{
                  background: '#ecf0f1',
                  marginBottom: '1rem',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                  <small>{item.date}</small><br />
                  <button onClick={() => handleRemoveItem(index)} style={{ marginTop: '5px', background: '#c0392b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px' }}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedPage === 'users' && (
          <div>
            <h2>Fetched User List</h2>
            {loading ? (
              <div style={{ fontSize: '18px', color: '#7f8c8d' }}>🔄 Loading users...</div>
            ) : (
              <ul style={{ paddingLeft: '20px' }}>
                {users.map(user => (
                  <li key={user.id} style={{ marginBottom: '10px' }}>
                    <strong>{user.name}</strong> — {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
