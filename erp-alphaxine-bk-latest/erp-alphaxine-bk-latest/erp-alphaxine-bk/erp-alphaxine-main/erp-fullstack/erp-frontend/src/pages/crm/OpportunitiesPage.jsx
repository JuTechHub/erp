import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/crm/opportunities';

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch opportunities');
        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Opportunities</h2>
      <ul>
        {opportunities.map(o => (
          <li key={o.id}>{o.name} - {o.stage} - ${o.dealSize}</li>
        ))}
      </ul>
    </div>
  );
};

export default OpportunitiesPage; 