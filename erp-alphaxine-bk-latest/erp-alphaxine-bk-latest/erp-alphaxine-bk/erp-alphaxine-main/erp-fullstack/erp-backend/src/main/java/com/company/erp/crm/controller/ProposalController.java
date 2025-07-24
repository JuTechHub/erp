package com.company.erp.crm.controller;

import com.company.erp.crm.model.Proposal;
import com.company.erp.crm.model.ProposalDocument;
import com.company.erp.crm.service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/crm/proposals")
public class ProposalController {
    @Autowired
    private ProposalService proposalService;

    @PostMapping
    public Proposal createProposal(@RequestBody Proposal proposal) {
        return proposalService.createProposal(proposal);
    }

    @GetMapping
    public List<Proposal> getAllProposals() {
        return proposalService.getAllProposals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proposal> getProposalById(@PathVariable Long id) {
        Optional<Proposal> proposal = proposalService.getProposalById(id);
        return proposal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proposal> updateProposal(@PathVariable Long id, @RequestBody Proposal details) {
        Proposal updated = proposalService.updateProposal(id, details);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProposal(@PathVariable Long id) {
        proposalService.deleteProposal(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<String> approveProposal(@PathVariable Long id) {
        boolean success = proposalService.approveProposal(id);
        if (success) return ResponseEntity.ok("Proposal approved");
        return ResponseEntity.badRequest().body("Approval failed");
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<ProposalDocument> uploadDocument(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        ProposalDocument doc = proposalService.uploadDocument(id, file);
        return ResponseEntity.ok(doc);
    }

    @GetMapping("/{id}/template")
    public ResponseEntity<String> generateTemplate(@PathVariable Long id) {
        String template = proposalService.generateProposalTemplate(id);
        return ResponseEntity.ok(template);
    }
} 