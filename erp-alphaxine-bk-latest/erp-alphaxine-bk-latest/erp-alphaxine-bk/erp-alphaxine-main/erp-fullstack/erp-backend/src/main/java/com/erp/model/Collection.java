package com.erp.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "collections")
public class Collection {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "employee_id", nullable = false, length = 50)
    private String employeeId;
    
    @Column(name = "employee_name", nullable = false)
    private String employeeName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "collection_type", nullable = false)
    private CollectionType collectionType;
    
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;
    
    @Column(name = "remaining_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal remainingAmount;
    
    @Column(name = "installment_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal installmentAmount;
    
    @Column(name = "installments_paid", nullable = false)
    private Integer installmentsPaid = 0;
    
    @Column(name = "total_installments", nullable = false)
    private Integer totalInstallments;
    
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;
    
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CollectionStatus status = CollectionStatus.ACTIVE;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // Constructors
    public Collection() {}
    
    public Collection(String employeeId, String employeeName, CollectionType collectionType, 
                     BigDecimal totalAmount, Integer totalInstallments, LocalDate startDate, 
                     LocalDate dueDate, String description) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.collectionType = collectionType;
        this.totalAmount = totalAmount;
        this.remainingAmount = totalAmount;
        this.totalInstallments = totalInstallments;
        this.installmentAmount = totalAmount.divide(BigDecimal.valueOf(totalInstallments));
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.description = description;
        this.status = CollectionStatus.ACTIVE;
        this.installmentsPaid = 0;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Business method to record payment
    public void recordPayment(BigDecimal paymentAmount) {
        this.remainingAmount = this.remainingAmount.subtract(paymentAmount);
        this.installmentsPaid++;
        
        if (this.remainingAmount.compareTo(BigDecimal.ZERO) <= 0) {
            this.status = CollectionStatus.COMPLETED;
            this.remainingAmount = BigDecimal.ZERO;
        } else if (LocalDate.now().isAfter(this.dueDate)) {
            this.status = CollectionStatus.OVERDUE;
        }
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    
    public CollectionType getCollectionType() { return collectionType; }
    public void setCollectionType(CollectionType collectionType) { this.collectionType = collectionType; }
    
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    
    public BigDecimal getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(BigDecimal remainingAmount) { this.remainingAmount = remainingAmount; }
    
    public BigDecimal getInstallmentAmount() { return installmentAmount; }
    public void setInstallmentAmount(BigDecimal installmentAmount) { this.installmentAmount = installmentAmount; }
    
    public Integer getInstallmentsPaid() { return installmentsPaid; }
    public void setInstallmentsPaid(Integer installmentsPaid) { this.installmentsPaid = installmentsPaid; }
    
    public Integer getTotalInstallments() { return totalInstallments; }
    public void setTotalInstallments(Integer totalInstallments) { this.totalInstallments = totalInstallments; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public CollectionStatus getStatus() { return status; }
    public void setStatus(CollectionStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public enum CollectionType {
        SALARY_ADVANCE("salary_advance"),
        EQUIPMENT_DAMAGE("equipment_damage"),
        LOAN("loan"),
        MISCELLANEOUS("miscellaneous");
        
        private final String value;
        
        CollectionType(String value) {
            this.value = value;
        }
        
        public String getValue() {
            return value;
        }
    }
    
    public enum CollectionStatus {
        ACTIVE("active"),
        COMPLETED("completed"),
        OVERDUE("overdue");
        
        private final String value;
        
        CollectionStatus(String value) {
            this.value = value;
        }
        
        public String getValue() {
            return value;
        }
    }
}
