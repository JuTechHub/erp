package com.erp.repository;

import com.erp.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    
    // Find claims by employee ID
    List<Claim> findByEmployeeIdOrderBySubmittedDateDesc(String employeeId);
    
    // Find claims by status
    List<Claim> findByStatusOrderBySubmittedDateAsc(Claim.ClaimStatus status);
    
    // Find claims by date range
    List<Claim> findByClaimDateBetween(LocalDate startDate, LocalDate endDate);
    
    // Find claims by employee and status
    List<Claim> findByEmployeeIdAndStatus(String employeeId, Claim.ClaimStatus status);
    
    // Find claims by type
    List<Claim> findByClaimType(Claim.ClaimType claimType);
    
    // Custom query to get claims summary by month
    @Query("SELECT YEAR(c.claimDate) as year, MONTH(c.claimDate) as month, " +
           "c.claimType, COUNT(c) as totalClaims, SUM(c.amount) as totalAmount " +
           "FROM Claim c " +
           "WHERE c.status = :status " +
           "GROUP BY YEAR(c.claimDate), MONTH(c.claimDate), c.claimType " +
           "ORDER BY year DESC, month DESC")
    List<Object[]> getClaimsSummaryByMonth(@Param("status") Claim.ClaimStatus status);
    
    // Custom query to get total approved amount for an employee
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Claim c " +
           "WHERE c.employeeId = :employeeId AND c.status = :status")
    Double getTotalApprovedAmountByEmployee(@Param("employeeId") String employeeId, 
                                          @Param("status") Claim.ClaimStatus status);
    
    // Find claims awaiting approval (pending status)
    @Query("SELECT c FROM Claim c WHERE c.status = 'PENDING' ORDER BY c.submittedDate ASC")
    List<Claim> findPendingClaims();
    
    // Count claims by status
    long countByStatus(Claim.ClaimStatus status);
    
    // Find recent claims (last 30 days)
    @Query("SELECT c FROM Claim c WHERE c.submittedDate >= :startDate ORDER BY c.submittedDate DESC")
    List<Claim> findRecentClaims(@Param("startDate") LocalDate startDate);
}
