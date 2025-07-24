-- RBAC Features for Claims and Collections
-- Execute this after creating the main claims and collections tables

-- Insert Claims and Collections features into the features table
INSERT INTO features (feature_key, feature_name, category, description, icon, route_path) VALUES
-- Claims features
('claims_view', 'View Claims', 'Claims Management', 'View all claims and claim history', '📋', '/superadmin/claims'),
('claims_create', 'Create Claims', 'Claims Management', 'Submit new expense claims', '➕', '/superadmin/claims'),
('claims_edit', 'Edit Claims', 'Claims Management', 'Edit existing claims', '✏️', '/superadmin/claims'),
('claims_delete', 'Delete Claims', 'Claims Management', 'Delete claims', '🗑️', '/superadmin/claims'),
('claims_approve', 'Approve Claims', 'Claims Management', 'Approve or reject employee claims', '✅', '/superadmin/claims'),
('claims_my_claims', 'My Claims', 'Claims Management', 'View my submitted claims', '👤', '/employee/claims'),

-- Collections features
('collections_view', 'View Collections', 'Collections Management', 'View all collections and payment tracking', '💰', '/superadmin/collections'),
('collections_create', 'Create Collections', 'Collections Management', 'Create new collections for employees', '➕', '/superadmin/collections'),
('collections_edit', 'Edit Collections', 'Collections Management', 'Edit existing collections', '✏️', '/superadmin/collections'),
('collections_delete', 'Delete Collections', 'Collections Management', 'Delete collections', '🗑️', '/superadmin/collections'),
('collections_payment', 'Record Payments', 'Collections Management', 'Record collection payments', '💳', '/superadmin/collections'),
('collections_my_collections', 'My Collections', 'Collections Management', 'View my collections and payment status', '👤', '/employee/collections'),

-- Reports features
('claims_reports', 'Claims Reports', 'Reports', 'Generate claims reports and analytics', '📊', '/superadmin/reports/claims'),
('collections_reports', 'Collections Reports', 'Reports', 'Generate collections reports and analytics', '📊', '/superadmin/reports/collections');

-- Note: After inserting these features, you need to assign them to users through the Master Data Config interface
-- or by directly inserting into the user_feature_permissions table.

-- Example: Grant all claims and collections permissions to a super admin user (adjust user ID as needed)
-- Replace '1' with the actual user ID of your super admin
/*
INSERT INTO user_feature_permissions (user_id, feature_id, granted_by_user_id, granted_at, is_active)
SELECT 1, f.id, 1, NOW(), true
FROM features f
WHERE f.feature_key IN (
    'claims_view', 'claims_create', 'claims_edit', 'claims_delete', 'claims_approve',
    'collections_view', 'collections_create', 'collections_edit', 'collections_delete', 'collections_payment',
    'claims_reports', 'collections_reports'
);
*/

-- Example: Grant employee-level permissions to an employee (adjust user ID as needed)
-- Replace '2' with the actual user ID of your employee
/*
INSERT INTO user_feature_permissions (user_id, feature_id, granted_by_user_id, granted_at, is_active)
SELECT 2, f.id, 1, NOW(), true
FROM features f
WHERE f.feature_key IN (
    'claims_my_claims', 'collections_my_collections'
);
*/

-- Verify the features were inserted
SELECT * FROM features WHERE category IN ('Claims Management', 'Collections Management') ORDER BY category, feature_name;
