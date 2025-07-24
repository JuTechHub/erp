-- Claims and Collections Database Schema for ERP System (No Triggers Version)
-- Execute these queries in MySQL Workbench to create the database structure

-- 1. Create Claims Table
CREATE TABLE IF NOT EXISTS claims (
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
CREATE TABLE IF NOT EXISTS collections (
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
CREATE TABLE IF NOT EXISTS collection_payments (
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
CREATE INDEX IF NOT EXISTS idx_claims_employee_status ON claims(employee_id, status);
CREATE INDEX IF NOT EXISTS idx_claims_date_range ON claims(claim_date, status);
CREATE INDEX IF NOT EXISTS idx_collections_employee_status ON collections(employee_id, status);
CREATE INDEX IF NOT EXISTS idx_collections_due_status ON collections(due_date, status);
CREATE INDEX IF NOT EXISTS idx_payments_collection_date ON collection_payments(collection_id, payment_date);

-- Show all tables to verify creation
SHOW TABLES;

-- Show table structures
DESCRIBE claims;
DESCRIBE collections;
DESCRIBE collection_payments;
