import React, { useState, useEffect } from 'react';
import LeadForm from '../../components/crm/LeadForm';

const API_URL = 'http://localhost:8080/api/crm/leads';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leads from backend
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch leads');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleChange = e => setLead({ ...lead, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (!res.ok) throw new Error('Failed to create lead');
      const newLead = await res.json();
      setLeads([...leads, newLead]);
      setLead({});
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Leads</h2>
      <LeadForm lead={lead} onChange={handleChange} onSubmit={handleSubmit} />
      <ul>
        {leads.map(l => (
          <li key={l.id}>{l.name} - {l.contactInfo}</li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsPage; 