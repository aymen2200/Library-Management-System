use Librarydb;
-- 1. Fill Settings
INSERT INTO Settings (DefaultBorrowDays, DefaultFinePerDay) VALUES (14, 2);

-- 2. Fill Users (Role 0 = Admin, Role 1 = User)
INSERT INTO Users (UserID, Name, ContactInformation, LibraryCardNumber, Role) VALUES
(1, 'Ahmed Admin', 'admin@library.com', 'LIB-000', 0),
(2, 'John Doe', 'john@email.com', 'LIB-001', 1),
(3, 'Jane Smith', 'jane@email.com', 'LIB-002', 1),
(4, 'Michael Brown', 'michael@email.com', 'LIB-003', 1),
(5, 'Emily Davis', 'emily@email.com', 'LIB-004', 1);

-- 3. Fill Books
INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails) VALUES
(1, 'The Great Gatsby', '9780743273565', '1925-04-10', 'Classic', 'A story of wealth and love.'),
(2, '1984', '9780451524935', '1949-06-08', 'Dystopian', 'Big Brother is watching you.'),
(3, 'Clean Code', '9780132350884', '2008-08-01', 'Programming', 'A handbook of agile software craftsmanship.'),
(4, 'The Hobbit', '9780547928227', '1937-09-21', 'Fantasy', 'There and back again.');

-- 4. Fill BookCopies
INSERT INTO BookCopies (CopyID, BookID, AvailabilityStatus) VALUES
(101, 1, 1), -- Gatsby Copy 1 (Available)
(102, 1, 0), -- Gatsby Copy 2 (Borrowed)
(201, 2, 1), -- 1984 Copy 1 (Available)
(301, 3, 0), -- Clean Code Copy 1 (Borrowed)
(401, 4, 1); -- Hobbit Copy 1 (Available)

-- 5. Fill BorrowingRecords
-- Note: User 2 borrowed Copy 102, User 3 borrowed Copy 301
INSERT INTO BorrowingRecords (BorrowingRecordID, UserID, CopyID, BorrowingDate, DueDate, ActualReturnDate) VALUES
(1, 2, 102, '2024-01-01', '2024-01-15', NULL),
(2, 3, 301, '2023-12-01', '2023-12-15', '2023-12-20'); -- Returned late

-- 6. Fill Fines (For Record #2 which was returned late)
INSERT INTO Fines (FineID, UserID, BorrowingRecordID, NumberOfLateDays, FineAmount, PaymentStatus) VALUES
(1, 3, 2, 5, 10.00, 0); -- 5 days late, $10 fine, unpaid

-- 7. Fill Reservations
INSERT INTO Reservations (ReservationID, UserID, CopyID, ReservationDate) VALUES
(1, 4, 102, '2024-01-05'), -- User 4 waiting for Gatsby
(2, 5, 301, '2024-01-10'); -- User 5 waiting for Clean Code
