# Claims and Collections Feature - SQL Database Schema

## Overview
This document provides the SQL schema and queries for the Claims and Collections feature in the ERP system.

## Database Tables

### 1. Claims Table
The `claims` table stores all employee reimbursement claims.

```sql
CREATE TABLE claims (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    claim_type ENUM('NIGHT_SHIFT', 'TRANSPORT', 'OFFICE_SUPPLIES') NOT NULL,
    claim_date DATE NOT NULL,
    office_location VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    submitted_date DATE NOT NULL,
    approved_date DATE NULL,
    approved_by VARCHAR(255) NULL,
    rejection_reason TEXT NULL,
    receipt_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_employee_id (employee_id),
    INDEX idx_status (status),
    INDEX idx_claim_date (claim_date),
    INDEX idx_submitted_date (submitted_date)
);
```

### 2. Collections Table
The `collections` table stores all employee collections (advances, loans, etc.).

```sql
CREATE TABLE collections (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    collection_type ENUM('SALARY_ADVANCE', 'EQUIPMENT_DAMAGE', 'LOAN', 'MISCELLANEOUS') NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    remaining_amount DECIMAL(10,2) NOT NULL,
    installment_amount DECIMAL(10,2) NOT NULL,
    installments_paid INT DEFAULT 0,
    total_installments INT NOT NULL,
    start_date DATE NOT NULL,
    due_date DATE NOT NULL,
    description TEXT NOT NULL,
    status ENUM('ACTIVE', 'COMPLETED', 'OVERDUE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_employee_id (employee_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
);
```

### 3. Collection Payments Table
The `collection_payments` table tracks individual payments made against collections.

```sql
CREATE TABLE collection_payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    collection_id BIGINT NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'salary_deduction',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
    INDEX idx_collection_id (collection_id),
    INDEX idx_payment_date (payment_date)
);
```

## Sample Data Insertion

### Claims Sample Data
```sql
INSERT INTO claims (employee_id, employee_name, claim_type, claim_date, office_location, amount, description, status, submitted_date) VALUES
('EMP001', 'John Doe', 'NIGHT_SHIFT', '2024-01-15', 'Main Office', 500.00, 'Night shift allowance for overtime work', 'PENDING', '2024-01-16'),
('EMP002', 'Jane Smith', 'TRANSPORT', '2024-01-14', 'Branch Office', 150.00, 'Public transport between Main Office and Branch Office', 'APPROVED', '2024-01-15'),
('EMP003', 'Mike Johnson', 'OFFICE_SUPPLIES', '2024-01-13', 'Remote Office', 75.50, 'Office supplies purchased for team meeting', 'PENDING', '2024-01-14'),
('EMP001', 'John Doe', 'TRANSPORT', '2024-01-12', 'Client Site', 200.00, 'Transport to client location for project meeting', 'APPROVED', '2024-01-13');
```

### Collections Sample Data
```sql
INSERT INTO collections (employee_id, employee_name, collection_type, total_amount, remaining_amount, installment_amount, installments_paid, total_installments, start_date, due_date, description, status) VALUES
('EMP001', 'John Doe', 'SALARY_ADVANCE', 5000.00, 2500.00, 1250.00, 2, 4, '2024-01-15', '2024-02-15', 'Salary advance for personal emergency', 'ACTIVE'),
('EMP002', 'Jane Smith', 'EQUIPMENT_DAMAGE', 1500.00, 0.00, 1500.00, 1, 1, '2024-01-10', '2024-01-31', 'Laptop screen damage compensation', 'COMPLETED'),
('EMP003', 'Mike Johnson', 'LOAN', 10000.00, 8000.00, 1000.00, 2, 10, '2024-01-05', '2024-11-05', 'Company loan for education expenses', 'ACTIVE');
```

### Collection Payments Sample Data
```sql
INSERT INTO collection_payments (collection_id, payment_amount, payment_date, payment_method, notes) VALUES
(1, 1250.00, '2024-01-30', 'salary_deduction', 'First installment deducted from January salary'),
(1, 1250.00, '2024-02-28', 'salary_deduction', 'Second installment deducted from February salary'),
(2, 1500.00, '2024-01-31', 'salary_deduction', 'Full amount deducted from January salary'),
(3, 1000.00, '2024-01-31', 'salary_deduction', 'First installment deducted from January salary'),
(3, 1000.00, '2024-02-28', 'salary_deduction', 'Second installment deducted from February salary');
```

## Common Queries

### Claims Queries

#### Get all pending claims for approval
```sql
SELECT * FROM claims 
WHERE status = 'PENDING' 
ORDER BY submitted_date ASC;
```

#### Get claims by employee
```sql
SELECT * FROM claims 
WHERE employee_id = 'EMP001' 
ORDER BY submitted_date DESC;
```

#### Get claims summary by month
```sql
SELECT 
    YEAR(claim_date) as year,
    MONTH(claim_date) as month,
    claim_type,
    COUNT(*) as total_claims,
    SUM(amount) as total_amount
FROM claims 
WHERE status = 'APPROVED'
GROUP BY YEAR(claim_date), MONTH(claim_date), claim_type
ORDER BY year DESC, month DESC;
```

#### Approve a claim
```sql
UPDATE claims 
SET status = 'APPROVED', 
    approved_date = CURDATE(), 
    approved_by = 'Admin User' 
WHERE id = 1;
```

#### Reject a claim
```sql
UPDATE claims 
SET status = 'REJECTED', 
    rejection_reason = 'Invalid receipt or documentation' 
WHERE id = 1;
```

### Collections Queries

#### Get all active collections
```sql
SELECT * FROM collections 
WHERE status = 'ACTIVE' 
ORDER BY due_date ASC;
```

#### Get collections by employee
```sql
SELECT * FROM collections 
WHERE employee_id = 'EMP001' 
ORDER BY start_date DESC;
```

#### Get overdue collections
```sql
SELECT * FROM collections 
WHERE due_date < CURDATE() 
AND status = 'ACTIVE' 
ORDER BY due_date ASC;
```

#### Record a payment
```sql
INSERT INTO collection_payments (collection_id, payment_amount, payment_date, payment_method, notes) 
VALUES (1, 1250.00, CURDATE(), 'salary_deduction', 'Monthly installment deduction');

-- Update collection record
UPDATE collections 
SET remaining_amount = remaining_amount - 1250.00,
    installments_paid = installments_paid + 1,
    status = CASE 
        WHEN remaining_amount - 1250.00 <= 0 THEN 'COMPLETED'
        ELSE 'ACTIVE'
    END
WHERE id = 1;
```

#### Get collection payment history
```sql
SELECT 
    c.employee_name,
    c.collection_type,
    c.total_amount,
    c.remaining_amount,
    cp.payment_amount,
    cp.payment_date,
    cp.payment_method,
    cp.notes
FROM collections c
JOIN collection_payments cp ON c.id = cp.collection_id
WHERE c.employee_id = 'EMP001'
ORDER BY cp.payment_date DESC;
```

## Reports and Analytics

### Monthly Claims Report
```sql
SELECT 
    CONCAT(YEAR(claim_date), '-', LPAD(MONTH(claim_date), 2, '0')) as month,
    COUNT(*) as total_claims,
    SUM(CASE WHEN status = 'APPROVED' THEN amount ELSE 0 END) as approved_amount,
    SUM(CASE WHEN status = 'PENDING' THEN amount ELSE 0 END) as pending_amount,
    SUM(CASE WHEN status = 'REJECTED' THEN amount ELSE 0 END) as rejected_amount
FROM claims
WHERE claim_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY YEAR(claim_date), MONTH(claim_date)
ORDER BY month DESC;
```

### Collections Summary Report
```sql
SELECT 
    collection_type,
    COUNT(*) as total_collections,
    SUM(total_amount) as total_amount,
    SUM(remaining_amount) as outstanding_amount,
    SUM(total_amount - remaining_amount) as collected_amount
FROM collections
GROUP BY collection_type
ORDER BY outstanding_amount DESC;
```

### Employee Wise Claims and Collections Summary
```sql
SELECT 
    e.employee_id,
    e.employee_name,
    COALESCE(c.total_claims, 0) as total_claims,
    COALESCE(c.approved_claims_amount, 0) as approved_claims_amount,
    COALESCE(col.active_collections, 0) as active_collections,
    COALESCE(col.outstanding_amount, 0) as outstanding_amount
FROM (
    SELECT DISTINCT employee_id, employee_name FROM claims
    UNION
    SELECT DISTINCT employee_id, employee_name FROM collections
) e
LEFT JOIN (
    SELECT 
        employee_id,
        COUNT(*) as total_claims,
        SUM(CASE WHEN status = 'APPROVED' THEN amount ELSE 0 END) as approved_claims_amount
    FROM claims
    GROUP BY employee_id
) c ON e.employee_id = c.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        COUNT(*) as active_collections,
        SUM(remaining_amount) as outstanding_amount
    FROM collections
    WHERE status = 'ACTIVE'
    GROUP BY employee_id
) col ON e.employee_id = col.employee_id
ORDER BY e.employee_name;
```

## Indexes for Performance

```sql
-- Additional indexes for better performance
CREATE INDEX idx_claims_employee_status ON claims(employee_id, status);
CREATE INDEX idx_claims_date_range ON claims(claim_date, status);
CREATE INDEX idx_collections_employee_status ON collections(employee_id, status);
CREATE INDEX idx_collections_due_status ON collections(due_date, status);
CREATE INDEX idx_payments_collection_date ON collection_payments(collection_id, payment_date);
```

## Triggers for Automatic Updates

### Update collection status trigger
```sql
DELIMITER //
CREATE TRIGGER update_collection_status
AFTER INSERT ON collection_payments
FOR EACH ROW
BEGIN
    UPDATE collections 
    SET remaining_amount = remaining_amount - NEW.payment_amount,
        installments_paid = installments_paid + 1,
        status = CASE        WHEN remaining_amount - NEW.payment_amount <= 0 THEN 'COMPLETED'
        ELSE 'ACTIVE'
        END
    WHERE id = NEW.collection_id;
END//
DELIMITER ;
```

### Update overdue collections trigger
```sql
DELIMITER //
CREATE TRIGGER check_overdue_collections
AFTER UPDATE ON collections
FOR EACH ROW
BEGIN
    IF NEW.due_date < CURDATE() AND NEW.status = 'ACTIVE' THEN
        UPDATE collections 
        SET status = 'OVERDUE' 
        WHERE id = NEW.id;
    END IF;
END//
DELIMITER ;
```

## Security Considerations

1. **Role-based Access**: Implement proper role-based access control
2. **Data Encryption**: Encrypt sensitive financial data
3. **Audit Trail**: Log all changes to claims and collections
4. **Approval Workflow**: Implement multi-level approval for high-value claims
5. **Document Management**: Secure storage for receipts and supporting documents

## Integration Points

1. **Payroll Integration**: Automatic deduction of collection installments
2. **Employee Management**: Link with employee master data
3. **Accounting Integration**: Export approved claims to accounting system
4. **Notification System**: Send alerts for pending approvals and overdue collections
5. **Reporting**: Generate various reports for management and compliance
