import React from 'react';

const ProposalEditor = ({ proposal, onChange, onSubmit, onFileUpload }) => {
  return (
    <form onSubmit={onSubmit} className="crm-form">
      <input type="text" name="title" placeholder="Proposal Title" value={proposal?.title || ''} onChange={onChange} required />
      <input type="text" name="clientName" placeholder="Client Name" value={proposal?.clientName || ''} onChange={onChange} />
      <textarea name="requirements" placeholder="Requirements" value={proposal?.requirements || ''} onChange={onChange} />
      <input type="number" name="dealSize" placeholder="Deal Size" value={proposal?.dealSize || ''} onChange={onChange} />
      <input type="file" name="file" onChange={onFileUpload} />
      <button type="submit">Save Proposal</button>
    </form>
  );
};

export default ProposalEditor; 