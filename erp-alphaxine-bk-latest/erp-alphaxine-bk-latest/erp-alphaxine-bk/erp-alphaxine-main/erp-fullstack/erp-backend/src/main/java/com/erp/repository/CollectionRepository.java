package com.erp.repository;

import com.erp.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    
    // Find collections by employee ID
    List<Collection> findByEmployeeIdOrderByStartDateDesc(String employeeId);
    
    // Find collections by status
    List<Collection> findByStatusOrderByDueDateAsc(Collection.CollectionStatus status);
    
    // Find active collections
    List<Collection> findByStatus(Collection.CollectionStatus status);
    
    // Find overdue collections
    @Query("SELECT c FROM Collection c WHERE c.dueDate < :currentDate AND c.status = 'ACTIVE'")
    List<Collection> findOverdueCollections(@Param("currentDate") LocalDate currentDate);
    
    // Find collections by employee and status
    List<Collection> findByEmployeeIdAndStatus(String employeeId, Collection.CollectionStatus status);
    
    // Find collections by type
    List<Collection> findByCollectionType(Collection.CollectionType collectionType);
    
    // Custom query to get total outstanding amount by employee
    @Query("SELECT COALESCE(SUM(c.remainingAmount), 0) FROM Collection c " +
           "WHERE c.employeeId = :employeeId AND c.status = 'ACTIVE'")
    Double getTotalOutstandingAmountByEmployee(@Param("employeeId") String employeeId);
    
    // Custom query to get collections summary by type
    @Query("SELECT c.collectionType, COUNT(c) as totalCollections, " +
           "SUM(c.totalAmount) as totalAmount, SUM(c.remainingAmount) as outstandingAmount " +
           "FROM Collection c " +
           "GROUP BY c.collectionType " +
           "ORDER BY outstandingAmount DESC")
    List<Object[]> getCollectionsSummaryByType();
    
    // Find collections due for payment (within next 7 days)
    @Query("SELECT c FROM Collection c WHERE c.dueDate BETWEEN :startDate AND :endDate " +
           "AND c.status = 'ACTIVE' ORDER BY c.dueDate ASC")
    List<Collection> findCollectionsDueSoon(@Param("startDate") LocalDate startDate, 
                                          @Param("endDate") LocalDate endDate);
    
    // Count collections by status
    long countByStatus(Collection.CollectionStatus status);
    
    // Get total outstanding amount for all active collections
    @Query("SELECT COALESCE(SUM(c.remainingAmount), 0) FROM Collection c WHERE c.status = 'ACTIVE'")
    Double getTotalOutstandingAmount();
    
    // Find collections with payments due this month
    @Query("SELECT c FROM Collection c WHERE c.status = 'ACTIVE' " +
           "AND c.installmentsPaid < c.totalInstallments " +
           "ORDER BY c.dueDate ASC")
    List<Collection> findActiveCollectionsWithPendingPayments();
    
    // Employee wise summary
    @Query("SELECT c.employeeId, c.employeeName, COUNT(c) as activeCollections, " +
           "SUM(c.remainingAmount) as outstandingAmount " +
           "FROM Collection c " +
           "WHERE c.status = 'ACTIVE' " +
           "GROUP BY c.employeeId, c.employeeName " +
           "ORDER BY outstandingAmount DESC")
    List<Object[]> getEmployeeWiseCollectionsSummary();
}
