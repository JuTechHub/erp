package com.erp.controller;

import com.erp.model.Claim;
import com.erp.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {
    
    @Autowired
    private ClaimRepository claimRepository;
    
    // Get all claims
    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {
        try {
            List<Claim> claims = claimRepository.findAll();
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get claims by employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Claim>> getClaimsByEmployee(@PathVariable String employeeId) {
        try {
            List<Claim> claims = claimRepository.findByEmployeeIdOrderBySubmittedDateDesc(employeeId);
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get pending claims for approval
    @GetMapping("/pending")
    public ResponseEntity<List<Claim>> getPendingClaims() {
        try {
            List<Claim> claims = claimRepository.findPendingClaims();
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get claims by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Claim>> getClaimsByStatus(@PathVariable String status) {
        try {
            Claim.ClaimStatus claimStatus = Claim.ClaimStatus.valueOf(status.toUpperCase());
            List<Claim> claims = claimRepository.findByStatusOrderBySubmittedDateAsc(claimStatus);
            return ResponseEntity.ok(claims);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create new claim
    @PostMapping
    public ResponseEntity<Claim> createClaim(@RequestBody Claim claim) {
        try {
            claim.setSubmittedDate(LocalDate.now());
            claim.setStatus(Claim.ClaimStatus.PENDING);
            Claim savedClaim = claimRepository.save(claim);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClaim);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update claim
    @PutMapping("/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable Long id, @RequestBody Claim claimDetails) {
        try {
            Optional<Claim> optionalClaim = claimRepository.findById(id);
            if (optionalClaim.isPresent()) {
                Claim claim = optionalClaim.get();
                claim.setEmployeeId(claimDetails.getEmployeeId());
                claim.setEmployeeName(claimDetails.getEmployeeName());
                claim.setClaimType(claimDetails.getClaimType());
                claim.setClaimDate(claimDetails.getClaimDate());
                claim.setOfficeLocation(claimDetails.getOfficeLocation());
                claim.setAmount(claimDetails.getAmount());
                claim.setDescription(claimDetails.getDescription());
                
                Claim updatedClaim = claimRepository.save(claim);
                return ResponseEntity.ok(updatedClaim);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Approve claim
    @PutMapping("/{id}/approve")
    public ResponseEntity<Claim> approveClaim(@PathVariable Long id, @RequestParam String approvedBy) {
        try {
            Optional<Claim> optionalClaim = claimRepository.findById(id);
            if (optionalClaim.isPresent()) {
                Claim claim = optionalClaim.get();
                claim.setStatus(Claim.ClaimStatus.APPROVED);
                claim.setApprovedDate(LocalDate.now());
                claim.setApprovedBy(approvedBy);
                
                Claim updatedClaim = claimRepository.save(claim);
                return ResponseEntity.ok(updatedClaim);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Reject claim
    @PutMapping("/{id}/reject")
    public ResponseEntity<Claim> rejectClaim(@PathVariable Long id, @RequestParam String rejectionReason) {
        try {
            Optional<Claim> optionalClaim = claimRepository.findById(id);
            if (optionalClaim.isPresent()) {
                Claim claim = optionalClaim.get();
                claim.setStatus(Claim.ClaimStatus.REJECTED);
                claim.setRejectionReason(rejectionReason);
                
                Claim updatedClaim = claimRepository.save(claim);
                return ResponseEntity.ok(updatedClaim);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete claim
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Long id) {
        try {
            if (claimRepository.existsById(id)) {
                claimRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get claims statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getClaimsStatistics() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalClaims", claimRepository.count());
            stats.put("pendingClaims", claimRepository.countByStatus(Claim.ClaimStatus.PENDING));
            stats.put("approvedClaims", claimRepository.countByStatus(Claim.ClaimStatus.APPROVED));
            stats.put("rejectedClaims", claimRepository.countByStatus(Claim.ClaimStatus.REJECTED));
            
            // Get recent claims (last 30 days)
            LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
            List<Claim> recentClaims = claimRepository.findRecentClaims(thirtyDaysAgo);
            stats.put("recentClaims", recentClaims.size());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
