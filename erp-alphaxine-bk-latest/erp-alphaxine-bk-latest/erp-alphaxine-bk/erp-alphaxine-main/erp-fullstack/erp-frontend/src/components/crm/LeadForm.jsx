import React from 'react';

const LeadForm = ({ lead, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="crm-form">
      <input type="text" name="name" placeholder="Lead Name" value={lead?.name || ''} onChange={onChange} required />
      <input type="text" name="source" placeholder="Source" value={lead?.source || ''} onChange={onChange} />
      <input type="text" name="contactInfo" placeholder="Contact Info" value={lead?.contactInfo || ''} onChange={onChange} />
      <input type="text" name="industry" placeholder="Industry" value={lead?.industry || ''} onChange={onChange} />
      <input type="number" name="estimatedBudget" placeholder="Estimated Budget" value={lead?.estimatedBudget || ''} onChange={onChange} />
      <input type="text" name="region" placeholder="Region" value={lead?.region || ''} onChange={onChange} />
      <input type="text" name="authority" placeholder="Authority" value={lead?.authority || ''} onChange={onChange} />
      <input type="text" name="need" placeholder="Need" value={lead?.need || ''} onChange={onChange} />
      <input type="text" name="timeline" placeholder="Timeline" value={lead?.timeline || ''} onChange={onChange} />
      <button type="submit">Save Lead</button>
    </form>
  );
};

export default LeadForm; 