import React from 'react';

const stages = ['Qualification', 'Proposal', 'Negotiation', 'Closed'];

const OpportunityBoard = ({ opportunities, onStageChange }) => {
  return (
    <div className="crm-opportunity-board">
      {stages.map(stage => (
        <div key={stage} className="crm-opportunity-stage">
          <h3>{stage}</h3>
          <ul>
            {opportunities.filter(o => o.stage === stage).map(o => (
              <li key={o.id}>
                {o.name} - ${o.dealSize}
                {onStageChange && stage !== 'Closed' && (
                  <button onClick={() => onStageChange(o, stage)}>Next Stage</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OpportunityBoard; 