USE leave_management;

INSERT INTO leave_types (name, max_days, description) VALUES
('Annual Leave', 20, 'Yearly paid leave'),
('Sick Leave', 10, 'Medical and health related leave'),
('Casual Leave', 5, 'Short notice personal leave'),
('Maternity Leave', 90, 'Leave for new mothers'),
('Paternity Leave', 10, 'Leave for new fathers');

INSERT INTO users (name, email, password, role, department) VALUES
('Admin User', 'admin@company.com', '$2b$10$examplehashedpassword1', 'admin', 'HR'),
('Manager One', 'manager@company.com', '$2b$10$examplehashedpassword2', 'manager', 'Engineering'),
('Employee One', 'employee@company.com', '$2b$10$examplehashedpassword3', 'employee', 'Engineering');

INSERT INTO leave_balances (user_id, leave_type_id, total_days, used_days, remaining_days, year) VALUES
(3, 1, 20, 0, 20, 2024),
(3, 2, 10, 0, 10, 2024),
(3, 3, 5, 0, 5, 2024);

INSERT INTO holidays (name, date) VALUES
('New Year', '2024-01-01'),
('Republic Day', '2024-01-26'),
('Independence Day', '2024-08-15'),
('Gandhi Jayanti', '2024-10-02'),
('Christmas', '2024-12-25');
