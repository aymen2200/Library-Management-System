-- ============================================================
--  Library Management System — Seed Data
--  Book covers served free from Open Library Covers API:
--  https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
-- ============================================================

USE LibraryDB;

-- ------------------------------------------------------------
-- AUTHORS  (real authors matching the real books below)
-- ------------------------------------------------------------
INSERT INTO Authors (AuthorID, FullName) VALUES
  (1,  'Kristin Hannah'),
  (2,  'Colleen Hoover'),
  (3,  'Andy Weir'),
  (4,  'Freida McFadden'),
  (5,  'James Clear'),
  (6,  'Frank Herbert'),
  (7,  'George Orwell'),
  (8,  'J.R.R. Tolkien'),
  (9,  'F. Scott Fitzgerald'),
  (10, 'Harper Lee'),
  (11, 'John Grisham'),
  (12, 'David Grann'),
  (13, 'Peter Attia'),
  (14, 'Barbara Kingsolver'),
  (15, 'Abraham Verghese');

-- ------------------------------------------------------------
-- BOOKS  (real titles, ISBNs, cover images via Open Library)
-- ------------------------------------------------------------
INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails, Image) VALUES
  (1,  'The Women',                   '9781250178633', '2024-02-06', 'Historical Fiction', 'A #1 NYT Bestseller. Story of a woman who served as a nurse in Vietnam.',                                      'https://covers.openlibrary.org/b/isbn/9781250178633-L.jpg'),
  (2,  'It Ends with Us',             '9781501110368', '2016-08-02', 'Romance',            'A deeply emotional story about love, choices, and breaking cycles.',                                           'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg'),
  (3,  'The Martian',                 '9780553418026', '2014-02-11', 'Science Fiction',    'An astronaut is stranded alone on Mars and must survive using science and wit.',                               'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg'),
  (4,  'The Housemaid',               '9781538741672', '2022-08-23', 'Thriller',           '#1 NYT Bestseller psychological thriller about secrets in a wealthy household.',                              'https://covers.openlibrary.org/b/isbn/9781538741672-L.jpg'),
  (5,  'Atomic Habits',               '9780735211292', '2018-10-16', 'Self-Help',          'A practical guide to building good habits and breaking bad ones.',                                             'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'),
  (6,  'Dune',                        '9780441013593', '1965-08-01', 'Science Fiction',    'Epic science fiction novel set on the desert planet Arrakis.',                                                'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg'),
  (7,  '1984',                        '9780451524935', '1949-06-08', 'Dystopian Fiction',  'A chilling portrait of a totalitarian society under constant surveillance.',                                  'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg'),
  (8,  'The Lord of the Rings',       '9780544003415', '1954-07-29', 'Fantasy',            'The complete epic fantasy trilogy: The Fellowship, The Two Towers, The Return of the King.',                 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg'),
  (9,  'The Great Gatsby',            '9780743273565', '1925-04-10', 'Classic Fiction',    'A classic American novel about wealth, love, and the American Dream.',                                        'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg'),
  (10, 'To Kill a Mockingbird',       '9780061935466', '1960-07-11', 'Classic Fiction',    'Pulitzer Prize winner. A story of racial injustice and moral growth in the American South.',                 'https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg'),
  (11, 'The Exchange',                '9780385548953', '2023-10-17', 'Legal Thriller',     'Sequel to The Firm. A high-stakes legal thriller by John Grisham.',                                          'https://covers.openlibrary.org/b/isbn/9780385548953-L.jpg'),
  (12, 'The Wager',                   '9780385534260', '2023-03-21', 'History',            'A gripping true story of shipwreck, mutiny and murder.',                                                      'https://covers.openlibrary.org/b/isbn/9780385534260-L.jpg'),
  (13, 'Outlive',                     '9780593236598', '2023-03-28', 'Health & Wellness',  'A groundbreaking guide to living longer and healthier by physician Peter Attia.',                             'https://covers.openlibrary.org/b/isbn/9780593236598-L.jpg'),
  (14, 'Demon Copperhead',            '9780063251922', '2022-10-18', 'Literary Fiction',   'Pulitzer Prize winner. A modern retelling of David Copperfield set in Appalachia.',                          'https://covers.openlibrary.org/b/isbn/9780063251922-L.jpg'),
  (15, 'The Covenant of Water',       '9780802162175', '2023-05-02', 'Historical Fiction', 'An epic multigenerational story set in South India spanning 77 years.',                                      'https://covers.openlibrary.org/b/isbn/9780802162175-L.jpg');

-- ------------------------------------------------------------
-- BOOKAUTHORS
-- ------------------------------------------------------------
INSERT INTO BookAuthors (BookID, AuthorID) VALUES
  (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
  (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
  (11, 11), (12, 12), (13, 13), (14, 14), (15, 15);

-- ------------------------------------------------------------
-- BOOKCOPIES  (2-3 copies per book)
-- ------------------------------------------------------------
INSERT INTO BookCopies (CopyID, BookID, Barcode, AvailabilityStatus) VALUES
  (1,  1,  'BC-0001', 'available'),
  (2,  1,  'BC-0002', 'borrowed'),
  (3,  2,  'BC-0003', 'available'),
  (4,  2,  'BC-0004', 'available'),
  (5,  3,  'BC-0005', 'borrowed'),
  (6,  3,  'BC-0006', 'available'),
  (7,  4,  'BC-0007', 'available'),
  (8,  4,  'BC-0008', 'borrowed'),
  (9,  5,  'BC-0009', 'available'),
  (10, 5,  'BC-0010', 'available'),
  (11, 6,  'BC-0011', 'borrowed'),
  (12, 6,  'BC-0012', 'available'),
  (13, 7,  'BC-0013', 'available'),
  (14, 7,  'BC-0014', 'available'),
  (15, 8,  'BC-0015', 'borrowed'),
  (16, 9,  'BC-0016', 'available'),
  (17, 9,  'BC-0017', 'available'),
  (18, 10, 'BC-0018', 'available'),
  (19, 10, 'BC-0019', 'borrowed'),
  (20, 11, 'BC-0020', 'available'),
  (21, 12, 'BC-0021', 'available'),
  (22, 12, 'BC-0022', 'borrowed'),
  (23, 13, 'BC-0023', 'available'),
  (24, 14, 'BC-0024', 'available'),
  (25, 15, 'BC-0025', 'available'),
  (26, 15, 'BC-0026', 'borrowed');

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
INSERT INTO Users (UserID, Name, Email, PasswordHash, Role, IsDeleted) VALUES
  (1,  'Admin Library',    'admin@library.com',    '$2b$10$hashedpassword001', 'admin',     FALSE),
  (2,  'Sarah Mitchell',   'sarah.m@email.com',    '$2b$10$hashedpassword002', 'member',    FALSE),
  (3,  'James Carter',     'james.c@email.com',    '$2b$10$hashedpassword003', 'member',    FALSE),
  (4,  'Layla Hassan',     'layla.h@email.com',    '$2b$10$hashedpassword004', 'member',    FALSE),
  (5,  'Omar Benali',      'omar.b@email.com',     '$2b$10$hashedpassword005', 'member',    FALSE),
  (6,  'Emma Wilson',      'emma.w@email.com',     '$2b$10$hashedpassword006', 'member',    FALSE),
  (7,  'Noah Thompson',    'noah.t@email.com',     '$2b$10$hashedpassword007', 'member',    FALSE),
  (8,  'Ines Boumediene',  'ines.b@email.com',     '$2b$10$hashedpassword008', 'member',    FALSE),
  (9,  'Youssef Khelil',   'youssef.k@email.com',  '$2b$10$hashedpassword009', 'member',    FALSE),
  (10, 'Maria Fernandez',  'maria.f@email.com',    '$2b$10$hashedpassword010', 'member',    FALSE),
  (11, 'David Nguyen',     'david.n@email.com',    '$2b$10$hashedpassword011', 'member',    FALSE),
  (12, 'Librarian Ali',    'ali.lib@library.com',  '$2b$10$hashedpassword012', 'librarian', FALSE);

-- ------------------------------------------------------------
-- BORROWINGRECORDS
-- ------------------------------------------------------------
INSERT INTO BorrowingRecords (BorrowingRecordID, UserID, CopyID, BorrowingDate, DueDate, ActualReturnDate, Status, CreatedAt) VALUES
  (1,  2,  2,  '2025-04-01', '2025-04-15', '2025-04-13', 'returned',  '2025-04-01 09:00:00'),
  (2,  3,  5,  '2025-04-05', '2025-04-19', NULL,           'borrowed',  '2025-04-05 10:30:00'),
  (3,  4,  8,  '2025-04-10', '2025-04-24', NULL,           'borrowed',  '2025-04-10 11:15:00'),
  (4,  5,  11, '2025-03-20', '2025-04-03', '2025-04-10', 'returned',  '2025-03-20 08:45:00'),
  (5,  6,  15, '2025-04-12', '2025-04-26', NULL,           'borrowed',  '2025-04-12 14:00:00'),
  (6,  7,  19, '2025-03-15', '2025-03-29', '2025-04-05', 'returned',  '2025-03-15 09:30:00'),
  (7,  8,  22, '2025-04-08', '2025-04-22', NULL,           'borrowed',  '2025-04-08 13:20:00'),
  (8,  9,  26, '2025-04-14', '2025-04-28', NULL,           'borrowed',  '2025-04-14 15:45:00'),
  (9,  10, 2,  '2025-03-01', '2025-03-15', '2025-03-14', 'returned',  '2025-03-01 10:00:00'),
  (10, 11, 5,  '2025-03-10', '2025-03-24', '2025-04-01', 'returned',  '2025-03-10 11:00:00');

-- ------------------------------------------------------------
-- FINES  (only for overdue returns)
-- ------------------------------------------------------------
INSERT INTO Fines (FineID, UserID, BorrowingRecordID, NumberOfLateDays, FineAmount, PaymentStatus) VALUES
  (1, 5, 4,  7,  3.50, 'unpaid'),
  (2, 7, 6,  7,  3.50, 'paid'),
  (3, 11, 10, 8,  4.00, 'unpaid');

-- ------------------------------------------------------------
-- FAVORIT
-- ------------------------------------------------------------
INSERT INTO Favorites (FavoriteID, UserID, BookID) VALUES
  (1,  2,  1),
  (2,  2,  9),
  (3,  3,  3),
  (4,  3,  13),
  (5,  4,  7),
  (6,  5,  11),
  (7,  6,  15),
  (8,  7,  12),
  (9,  8,  14),
  (10, 9,  15),
  (11, 10, 4),
  (12, 11, 6);

-- ------------------------------------------------------------
-- SETTINGS  (already seeded in schema, update values here)
-- ------------------------------------------------------------
UPDATE Settings SET DefaultBorrowDays = 14, DefaultFinePerDay = 0.50 WHERE SettingID = 1;
