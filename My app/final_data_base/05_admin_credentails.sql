USE librarydb;

UPDATE Users SET Passwordhash = '$2a$12$e0MYzB18bJ/T3LgE8H9K9u7B4X5eF7mQ8vR2yZ3wX4uB5c6d7e8fG'
WHERE UserID = 1;

-- To login with the admin role:
-- Email = admin@library.com
-- Password = Admin@1234
