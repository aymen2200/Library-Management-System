USE LibraryDB;

-- 1. Fill Settings (SettingID must be 1 due to our CHECK constraint)
-- We use REPLACE to avoid errors if the default row already exists
REPLACE INTO Settings (SettingID, DefaultBorrowDays, DefaultFinePerDay) 
VALUES (1, 14, 2.00);

-- 2. Fill Authors
-- Normalized: Authors are created first so we can link them to books later
INSERT INTO Authors (AuthorID, FullName) VALUES
(1, 'F. Scott Fitzgerald'),
(2, 'George Orwell'),
(3, 'Robert C. Martin'),
(4, 'J.R.R. Tolkien');

-- 3. Fill Books (Removed Author column, added IsDeleted)
INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails) VALUES
(1, 'The Great Gatsby', '9780743273565', '1925-04-10', 'Classic', 'A story of wealth and love.'),
(2, '1984', '9780451524935', '1949-06-08', 'Dystopian', 'Big Brother is watching you.'),
(3, 'Clean Code', '9780132350884', '2008-08-01', 'Programming', 'A handbook of agile software craftsmanship.'),
(4, 'The Hobbit', '9780547928227', '1937-09-21', 'Fantasy', 'There and back again.');

-- 4. Link Books to Authors (The Junction Table)
INSERT INTO BookAuthors (BookID, AuthorID) VALUES
(1, 1), -- Gatsby -> Fitzgerald
(2, 2), -- 1984 -> Orwell
(3, 3), -- Clean Code -> Martin
(4, 4); -- Hobbit -> Tolkien

-- 5. Fill Users (Added Email, PasswordHash, and LibraryCardNumber)
-- PasswordHash usually contains a Bcrypt string, using 'hashed_pass' as a placeholder
INSERT INTO Users (UserID, Name, Email, PasswordHash, Phone, LibraryCardNumber, Role) VALUES
(1, 'Ahmed Admin', 'admin@library.com', 'hashed_admin_pass', '123456', 'LIB-000', 0),
(2, 'John Doe', 'john@email.com', 'hashed_pass_1', '555-0101', 'LIB-001', 1),
(3, 'Jane Smith', 'jane@email.com', 'hashed_pass_2', '555-0102', 'LIB-002', 1),
(4, 'Michael Brown', 'michael@email.com', 'hashed_pass_3', '555-0103', 'LIB-003', 1),
(5, 'Emily Davis', 'emily@email.com', 'hashed_pass_4', '555-0104', 'LIB-004', 1);

-- 6. Fill BookCopies (Added unique Barcodes and ENUM status)
INSERT INTO BookCopies (CopyID, BookID, Barcode, AvailabilityStatus) VALUES
(101, 1, 'BC-GATS-001', 'Available'),
(102, 1, 'BC-GATS-002', 'Borrowed'),
(201, 2, 'BC-1984-001', 'Available'),
(301, 3, 'BC-CC-001', 'Borrowed'),
(401, 4, 'BC-HOB-001', 'Available');

-- 7. Fill BorrowingRecords
INSERT INTO BorrowingRecords (BorrowingRecordID, UserID, CopyID, BorrowingDate, DueDate, ActualReturnDate) VALUES
(1, 2, 102, '2024-01-01', '2024-01-15', NULL),
(2, 3, 301, '2023-12-01', '2023-12-15', '2023-12-20');

-- 8. Fill Fines (Status changed to ENUM 'Pending')
INSERT INTO Fines (FineID, UserID, BorrowingRecordID, NumberOfLateDays, FineAmount, PaymentStatus) VALUES
(1, 3, 2, 5, 10.00, 'Pending');

-- 9. Fill Reservations (Added Status and ExpiryDate)
INSERT INTO Reservations (ReservationID, UserID, CopyID, ReservationDate, ExpiryDate, Status) VALUES
(1, 4, 102, '2024-01-05', '2024-01-12', 'Pending'),
(2, 5, 301, '2024-01-10', '2024-01-17', 'Pending');
