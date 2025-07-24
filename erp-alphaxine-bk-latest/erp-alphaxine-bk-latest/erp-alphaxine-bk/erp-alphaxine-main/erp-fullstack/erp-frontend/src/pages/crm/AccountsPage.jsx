import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/crm/accounts';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch accounts');
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  if (loading) return <div>Loading accounts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map(a => (
          <li key={a.id}>{a.name} - {a.industry} - {a.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsPage; 