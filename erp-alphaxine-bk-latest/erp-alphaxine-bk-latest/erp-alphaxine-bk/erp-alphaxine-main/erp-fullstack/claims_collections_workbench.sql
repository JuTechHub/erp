-- Claims and Collections Database Schema for ERP System
-- Execute these queries in MySQL Workbench to create the database structure

-- 1. Create Claims Table
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

-- 2. Create Collections Table
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

-- 3. Create Collection Payments Table
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

-- 4. Create Additional Indexes for Performance
CREATE INDEX idx_claims_employee_status ON claims(employee_id, status);
CREATE INDEX idx_claims_date_range ON claims(claim_date, status);
CREATE INDEX idx_collections_employee_status ON collections(employee_id, status);
CREATE INDEX idx_collections_due_status ON collections(due_date, status);
CREATE INDEX idx_payments_collection_date ON collection_payments(collection_id, payment_date);

-- 5. Create Trigger for Automatic Collection Status Updates
-- Note: Execute this trigger separately in MySQL Workbench
DELIMITER //

CREATE TRIGGER update_collection_status
AFTER INSERT ON collection_payments
FOR EACH ROW
BEGIN
    UPDATE collections 
    SET remaining_amount = remaining_amount - NEW.payment_amount,
        installments_paid = installments_paid + 1,
        status = CASE 
            WHEN remaining_amount - NEW.payment_amount <= 0 THEN 'COMPLETED'
            ELSE 'ACTIVE'
        END
    WHERE id = NEW.collection_id;
END//

DELIMITER ;

-- 6. Create Trigger for Checking Overdue Collections
-- Note: Execute this trigger separately in MySQL Workbench
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

-- 7. Common Query Examples (for testing)

-- Get all pending claims
SELECT * FROM claims WHERE status = 'PENDING' ORDER BY submitted_date ASC;

-- Get claims by employee
SELECT * FROM claims WHERE employee_id = 'EMP001' ORDER BY submitted_date DESC;

-- Get all active collections
SELECT * FROM collections WHERE status = 'ACTIVE' ORDER BY due_date ASC;

-- Get collections by employee
SELECT * FROM collections WHERE employee_id = 'EMP001' ORDER BY start_date DESC;

-- Get overdue collections
SELECT * FROM collections WHERE due_date < CURDATE() AND status = 'ACTIVE' ORDER BY due_date ASC;

-- Get collection payment history
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

-- Monthly Claims Report
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

-- Collections Summary Report
SELECT 
    collection_type,
    COUNT(*) as total_collections,
    SUM(total_amount) as total_amount,
    SUM(remaining_amount) as outstanding_amount,
    SUM(total_amount - remaining_amount) as collected_amount
FROM collections
GROUP BY collection_type
ORDER BY outstanding_amount DESC;

-- Employee Wise Claims and Collections Summary
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

-- Example of approving a claim
-- UPDATE claims SET status = 'APPROVED', approved_date = CURDATE(), approved_by = 'Admin User' WHERE id = 1;

-- Example of rejecting a claim
-- UPDATE claims SET status = 'REJECTED', rejection_reason = 'Invalid receipt or documentation' WHERE id = 1;

-- Example of recording a payment
-- INSERT INTO collection_payments (collection_id, payment_amount, payment_date, payment_method, notes) VALUES (1, 1250.00, CURDATE(), 'salary_deduction', 'Monthly installment deduction');

-- Show all tables to verify creation
SHOW TABLES;

-- Show table structures
DESCRIBE claims;
DESCRIBE collections;
DESCRIBE collection_payments;
