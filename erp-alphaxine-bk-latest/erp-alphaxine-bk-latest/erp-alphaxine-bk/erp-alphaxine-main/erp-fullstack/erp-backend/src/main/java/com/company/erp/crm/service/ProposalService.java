package com.company.erp.crm.service;

import com.company.erp.crm.model.Proposal;
import com.company.erp.crm.model.ProposalDocument;
import com.company.erp.crm.repository.ProposalRepository;
import com.company.erp.crm.repository.ProposalDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;
    @Autowired
    private ProposalDocumentRepository proposalDocumentRepository;

    // CRUD
    public Proposal createProposal(Proposal proposal) {
        proposal.setVersion(1);
        return proposalRepository.save(proposal);
    }

    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    public Optional<Proposal> getProposalById(Long id) {
        return proposalRepository.findById(id);
    }

    public Proposal updateProposal(Long id, Proposal details) {
        return proposalRepository.findById(id).map(proposal -> {
            proposal.setTitle(details.getTitle());
            proposal.setClientName(details.getClientName());
            proposal.setRequirements(details.getRequirements());
            proposal.setStatus(details.getStatus());
            proposal.setDealSize(details.getDealSize());
            proposal.setApprovalStatus(details.getApprovalStatus());
            proposal.setOpportunityId(details.getOpportunityId());
            proposal.setVersion(proposal.getVersion() + 1); // versioning
            return proposalRepository.save(proposal);
        }).orElse(null);
    }

    public void deleteProposal(Long id) {
        proposalRepository.deleteById(id);
    }

    // Approval flow (stub)
    public boolean approveProposal(Long id) {
        return proposalRepository.findById(id).map(proposal -> {
            proposal.setApprovalStatus("Approved");
            proposalRepository.save(proposal);
            return true;
        }).orElse(false);
    }

    // File upload (stub)
    public ProposalDocument uploadDocument(Long proposalId, MultipartFile file) {
        // TODO: Integrate with S3 or DMS
        ProposalDocument doc = new ProposalDocument();
        doc.setProposalId(proposalId);
        doc.setFileName(file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFileUrl("/mock-url/" + file.getOriginalFilename());
        doc.setVersion(1); // or increment if needed
        proposalDocumentRepository.save(doc);
        return doc;
    }

    // Dynamic template support (stub)
    public String generateProposalTemplate(Long proposalId) {
        // TODO: Implement dynamic template logic
        return "Generated template for proposal " + proposalId;
    }
} 