import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/crm/proposals';

const ProposalsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch proposals');
        const data = await res.json();
        setProposals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  if (loading) return <div>Loading proposals...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Proposals</h2>
      <ul>
        {proposals.map(p => (
          <li key={p.id}>{p.title} - {p.clientName} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalsPage; 