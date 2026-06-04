USE librarydb;

UPDATE Users SET Passwordhash = '$2b$12$zu0/inKtMi5O2n2kyKxBC.OUc9JEGxUsiz0JICqMn1mO/WciMW5Z6'
WHERE UserID = 1;

-- To login with the admin role:
-- Email = admin@library.com
-- Password = Admin@1234
