-- ============================================================
--  2. seed.sql
-- ============================================================

USE LibraryDB;

-- ------------------------------------------------------------
-- Settings
-- ------------------------------------------------------------
INSERT INTO Settings (SettingID, DefaultBorrowDays, DefaultFinePerDay) VALUES
(1, 14, 0.50);

-- ------------------------------------------------------------
-- Authors
-- ------------------------------------------------------------
INSERT INTO Authors (AuthorID, FullName) VALUES
(1, 'Kristin Hannah'),
(2, 'Colleen Hoover'),
(3, 'Andy Weir'),
(4, 'Freida McFadden'),
(5, 'James Clear'),
(6, 'Frank Herbert'),
(7, 'George Orwell'),
(8, 'J.R.R. Tolkien'),
(9, 'F. Scott Fitzgerald'),
(10, 'Harper Lee'),
(11, 'John Grisham'),
(12, 'David Grann'),
(13, 'Peter Attia'),
(14, 'Barbara Kingsolver'),
(15, 'Abraham Verghese'),
(16, 'J.K. Rowling'),
(17, 'Suzanne Collins'),
(18, 'Paulo Coelho'),
(19, 'Gillian Flynn'),
(20, 'Stephen King'),
(21, 'Robin Sharma'),
(22, 'Dan Brown'),
(23, 'Yuval Noah Harari'),
(24, 'Aldous Huxley'),
(25, 'Douglas Adams'),
(26, 'Ray Bradbury'),
(27, 'Matt Haig'),
(28, 'Tara Westover'),
(29, 'Napoleon Hill'),
(30, 'Orson Scott Card'),
(31, 'Ernest Cline'),
(32, 'Michelle Obama'),
(33, 'Robert T. Kiyosaki'),
(34, 'Malcolm Gladwell'),
(35, 'Veronica Roth'),
(36, 'James Dashner'),
(37, 'Stephenie Meyer'),
(38, 'John Green'),
(39, 'Jane Austen'),
(40, 'Sally Rooney'),
(41, 'Sarah J. Maas');

-- ------------------------------------------------------------
-- Books
-- ------------------------------------------------------------
INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails, Image, CreatedAt, IsDeleted) VALUES
(1, 'The Women', '9781250178633', '2024-02-06', 'Historical Fiction', 'A #1 NYT Bestseller. Story of a woman who served as a nurse in Vietnam.', 'https://covers.openlibrary.org/b/isbn/9781250178633-L.jpg', NOW(), FALSE),
(2, 'It Ends with Us', '9781501110368', '2016-08-02', 'Romance', 'A deeply emotional story about love, choices, and breaking cycles.', 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg', NOW(), FALSE),
(3, 'The Martian', '9780553418026', '2014-02-11', 'Science Fiction', 'An astronaut is stranded alone on Mars and must survive using science and wit.', 'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg', NOW(), FALSE),
(4, 'The Housemaid', '9781538741672', '2022-08-23', 'Thriller', '#1 NYT Bestseller psychological thriller about secrets in a wealthy household.', 'https://covers.openlibrary.org/b/isbn/9781538741672-L.jpg', NOW(), FALSE),
(5, 'Atomic Habits', '9780735211292', '2018-10-16', 'Self-Help', 'A practical guide to building good habits and breaking bad ones.', 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg', NOW(), FALSE),
(6, 'Dune', '9780441013593', '1965-08-01', 'Science Fiction', 'Epic science fiction novel set on the desert planet Arrakis.', 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg', NOW(), FALSE),
(7, '1984', '9780451524935', '1949-06-08', 'Dystopian Fiction', 'A chilling portrait of a totalitarian society under constant surveillance.', 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg', NOW(), FALSE),
(8, 'The Lord of the Rings', '9780544003415', '1954-07-29', 'Fantasy', 'The complete epic fantasy trilogy: The Fellowship, The Two Towers, The Return of the King.', 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg', NOW(), FALSE),
(9, 'The Great Gatsby', '9780743273565', '1925-04-10', 'Classic Fiction', 'A classic American novel about wealth, love, and the American Dream.', 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', NOW(), FALSE),
(10, 'To Kill a Mockingbird', '9780061935466', '1960-07-11', 'Classic Fiction', 'Pulitzer Prize winner. A story of racial injustice and moral growth in the American South.', 'https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg', NOW(), FALSE),
(11, 'The Exchange', '9780385548953', '2023-10-17', 'Legal Thriller', 'Sequel to The Firm. A high-stakes legal thriller by John Grisham.', 'https://covers.openlibrary.org/b/isbn/9780385548953-L.jpg', NOW(), FALSE),
(12, 'The Wager', '9780385534260', '2023-03-21', 'History', 'A gripping true story of shipwreck, mutiny and murder.', 'https://covers.openlibrary.org/b/isbn/9780385534260-L.jpg', NOW(), FALSE),
(13, 'Outlive', '9780593236598', '2023-03-28', 'Health & Wellness', 'A groundbreaking guide to living longer and healthier by physician Peter Attia.', 'https://covers.openlibrary.org/b/isbn/9780593236598-L.jpg', NOW(), FALSE),
(14, 'Demon Copperhead', '9780063251922', '2022-10-18', 'Literary Fiction', 'Pulitzer Prize winner. A modern retelling of David Copperfield set in Appalachia.', 'https://covers.openlibrary.org/b/isbn/9780063251922-L.jpg', NOW(), FALSE),
(15, 'The Covenant of Water', '9780802162175', '2023-05-02', 'Historical Fiction', 'An epic multigenerational story set in South India spanning 77 years.', 'https://covers.openlibrary.org/b/isbn/9780802162175-L.jpg', NOW(), FALSE),
(16, 'Harry Potter and the Sorcerer''s Stone', '9780590353427', '1998-09-01', 'Fantasy', 'The fundamental story of a young wizard discovering his heritage.', 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg', NOW(), FALSE),
(17, 'The Hunger Games', '9780439023528', '2008-09-14', 'Dystopian', 'A young girl is forced to fight to the death on live television.', 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg', NOW(), FALSE),
(18, 'The Alchemist', '9780061122415', '1988-01-01', 'Fiction', 'A heartwarming story about following your dreams and listening to your heart.', 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg', NOW(), FALSE),
(19, 'Gone Girl', '9780307588371', '2012-06-05', 'Thriller', 'A suspenseful psychological thriller about a marriage gone terribly wrong.', 'https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg', NOW(), FALSE),
(20, 'It', '9781501142970', '1986-09-15', 'Horror', 'A group of childhood friends reunite to fight a shape-shifting monster.', 'https://covers.openlibrary.org/b/isbn/9781501142970-L.jpg', NOW(), FALSE),
(21, 'The Monk Who Sold His Ferrari', '9780062515674', '1997-04-15', 'Self-Help', 'A modern fable about fulfilling your dreams and reaching your destiny.', 'https://covers.openlibrary.org/b/isbn/9780062515674-L.jpg', NOW(), FALSE),
(22, 'The Da Vinci Code', '9780307474278', '2003-03-18', 'Thriller', 'A symbologist unravels secrets hidden within famous works of art.', 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg', NOW(), FALSE),
(23, 'The Shining', '9780345806789', '1977-01-28', 'Horror', 'A family stays in an isolated hotel with a dark and terrifying past.', 'https://covers.openlibrary.org/b/isbn/9780345806789-L.jpg', NOW(), FALSE),
(24, 'Sapiens', '9780062316097', '2011-01-01', 'History', 'A brief history of humankind spanning from early humans to the present.', 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg', NOW(), FALSE),
(25, 'Animal Farm', '9780451526342', '1945-08-17', 'Classic Fiction', 'An allegorical novella detailing a group of farm animals who rebel.', 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg', NOW(), FALSE),
(26, 'Brave New World', '9780060850524', '1932-01-01', 'Dystopian', 'A prophetic vision of a futuristic, highly controlled, technological society.', 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg', NOW(), FALSE),
(27, 'The Hitchhiker''s Guide to the Galaxy', '9780345391803', '1979-10-12', 'Science Fiction', 'A comedic space odyssey following the last surviving human.', 'https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg', NOW(), FALSE),
(28, 'Fahrenheit 451', '9781451673319', '1953-10-19', 'Dystopian', 'A dystopian novel about a future society where books are outlawed and burned.', 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg', NOW(), FALSE),
(29, 'The Midnight Library', '9780525559474', '2020-09-29', 'Fantasy', 'A novel exploring choices, regrets, and what truly makes life worth living.', 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg', NOW(), FALSE),
(30, 'Educated', '9780399590504', '2018-02-20', 'Biography', 'A memoir about a young girl who leaves her survivalist family to pursue an education.', 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg', NOW(), FALSE),
(31, 'Think and Grow Rich', '9781593302009', '1937-03-01', 'Self-Help', 'The classic philosophy of personal achievement and financial success.', 'https://covers.openlibrary.org/b/isbn/9781593302009-L.jpg', NOW(), FALSE),
(32, 'Ender''s Game', '9780765382030', '1985-01-15', 'Science Fiction', 'A gifted child is recruited into a military academy to prepare for an alien invasion.', 'https://covers.openlibrary.org/b/isbn/9780765382030-L.jpg', NOW(), FALSE),
(33, 'Ready Player One', '9780307887443', '2011-08-16', 'Science Fiction', 'A quest for a massive fortune inside a virtual reality universe.', 'https://covers.openlibrary.org/b/isbn/9780307887443-L.jpg', NOW(), FALSE),
(34, 'Becoming', '9781524763138', '2018-11-13', 'Biography', 'An intimate and inspiring memoir by the former First Lady of the United States.', 'https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg', NOW(), FALSE),
(35, 'Rich Dad Poor Dad', '9781612680194', '1997-04-01', 'Self-Help', 'What the rich teach their kids about money that the poor and middle class do not.', 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg', NOW(), FALSE),
(36, 'Outliers', '9780316017930', '2008-11-18', 'Psychology', 'An examination of the factors that contribute to high levels of success.', 'https://covers.openlibrary.org/b/isbn/9780316017930-L.jpg', NOW(), FALSE),
(37, 'Divergent', '9780062024039', '2011-04-25', 'Dystopian', 'A society divided into five factions based on personality traits.', 'https://covers.openlibrary.org/b/isbn/9780062024039-L.jpg', NOW(), FALSE),
(38, 'The Maze Runner', '9780385737951', '2009-10-06', 'Dystopian', 'A group of boys try to escape an ever-changing, dangerous labyrinth.', 'https://covers.openlibrary.org/b/isbn/9780385737951-L.jpg', NOW(), FALSE),
(39, 'Twilight', '9780316015844', '2005-10-05', 'Fantasy', 'The romance between a teenage girl and a century-old vampire.', 'https://covers.openlibrary.org/b/isbn/9780316015844-L.jpg', NOW(), FALSE),
(40, 'The Fault in Our Stars', '9780525478812', '2012-01-10', 'Drama', 'The moving story of two teenage cancer patients who fall in love.', 'https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg', NOW(), FALSE),
(41, 'Pride and Prejudice', '9780141439518', '1813-01-28', 'Classic Fiction', 'A romantic masterpiece dealing with manners, upbringing, and marriage.', 'https://covers.openlibrary.org/b/141439518-L.jpg', NOW(), FALSE),
(42, 'Normal People', '9781984822178', '2018-08-28', 'Drama', 'An exploration of the subtle complexities of love and friendship over time.', 'https://covers.openlibrary.org/b/isbn/9781984822178-L.jpg', NOW(), FALSE),
(43, 'Throne of Glass', '9781619630345', '2012-08-07', 'Fantasy', 'A young assassin serves a tyrannical king while uncovering dark magical secrets.', 'https://covers.openlibrary.org/b/isbn/9781619630345-L.jpg', NOW(), FALSE);

-- ------------------------------------------------------------
-- BookAuthors
-- ------------------------------------------------------------
INSERT INTO BookAuthors (BookID, AuthorID) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), 
(19, 19), (20, 20), (21, 21), (22, 22), (23, 20), (24, 23), (25, 7), (26, 24), 
(27, 25), (28, 26), (29, 27), (30, 28), (31, 29), (32, 30), (33, 31), (34, 32), 
(35, 33), (36, 34), (37, 35), (38, 36), (39, 37), (40, 38), (41, 39), (42, 40), 
(43, 41);

-- ------------------------------------------------------------
-- BookCopies
-- ------------------------------------------------------------
INSERT INTO BookCopies (CopyID, BookID, Barcode, AvailabilityStatus) VALUES
(1, 1, 'BC-0001', 'available'),
(2, 1, 'BC-0002', 'borrowed'),
(3, 2, 'BC-0003', 'available'),
(4, 2, 'BC-0004', 'available'),
(5, 3, 'BC-0005', 'borrowed'),
(6, 3, 'BC-0006', 'available'),
(7, 4, 'BC-0007', 'available'),
(8, 4, 'BC-0008', 'borrowed'),
(9, 5, 'BC-0009', 'available'),
(10, 5, 'BC-0010', 'available'),
(11, 6, 'BC-0011', 'borrowed'),
(12, 6, 'BC-0012', 'available'),
(13, 7, 'BC-0013', 'available'),
(14, 7, 'BC-0014', 'available'),
(15, 8, 'BC-0015', 'borrowed'),
(16, 9, 'BC-0016', 'available'),
(17, 9, 'BC-0017', 'available'),
(18, 10, 'BC-0018', 'available'),
(19, 10, 'BC-0019', 'borrowed'),
(20, 11, 'BC-0020', 'available'),
(21, 12, 'BC-0021', 'available'),
(22, 12, 'BC-0022', 'borrowed'),
(23, 13, 'BC-0023', 'available'),
(24, 14, 'BC-0024', 'available'),
(25, 15, 'BC-0025', 'available'),
(26, 15, 'BC-0026', 'borrowed'),
(27, 16, 'BC-9780590353427-01', 'available'),
(28, 16, 'BC-9780590353427-02', 'available'),
(29, 17, 'BC-9780439023528-01', 'available'),
(30, 17, 'BC-9780439023528-02', 'available'),
(31, 18, 'BC-9780061122415-01', 'available'),
(32, 18, 'BC-9780061122415-02', 'available'),
(33, 19, 'BC-9780307588371-01', 'available'),
(34, 19, 'BC-9780307588371-02', 'available'),
(35, 20, 'BC-9781501142970-01', 'available'),
(36, 20, 'BC-9781501142970-02', 'available'),
(37, 21, 'BC-9780062515674-01', 'available'),
(38, 21, 'BC-9780062515674-02', 'available'),
(39, 22, 'BC-9780307474278-01', 'available'),
(40, 22, 'BC-9780307474278-02', 'available'),
(41, 23, 'BC-9780345806789-01', 'available'),
(42, 23, 'BC-9780345806789-02', 'available'),
(43, 24, 'BC-9780062316097-01', 'available'),
(44, 24, 'BC-9780062316097-02', 'available'),
(45, 25, 'BC-9780451526342-01', 'available'),
(46, 25, 'BC-9780451526342-02', 'available'),
(47, 26, 'BC-9780060850524-01', 'available'),
(48, 26, 'BC-9780060850524-02', 'available'),
(49, 27, 'BC-9780345391803-01', 'available'),
(50, 27, 'BC-9780345391803-02', 'available'),
(51, 28, 'BC-9781451673319-01', 'available'),
(52, 28, 'BC-9781451673319-02', 'available'),
(53, 29, 'BC-9780525559474-01', 'available'),
(54, 29, 'BC-9780525559474-02', 'available'),
(55, 30, 'BC-9780399590504-01', 'available'),
(56, 30, 'BC-9780399590504-02', 'available'),
(57, 31, 'BC-9781593302009-01', 'available'),
(58, 31, 'BC-9781593302009-02', 'available'),
(59, 32, 'BC-9780765382030-01', 'available'),
(60, 32, 'BC-9780765382030-02', 'available'),
(61, 33, 'BC-9780307887443-01', 'available'),
(62, 33, 'BC-9780307887443-02', 'available'),
(63, 34, 'BC-9781524763138-01', 'available'),
(64, 34, 'BC-9781524763138-02', 'available'),
(65, 35, 'BC-9781612680194-01', 'available'),
(66, 35, 'BC-9781612680194-02', 'available'),
(67, 36, 'BC-9780316017930-01', 'available'),
(68, 36, 'BC-9780316017930-02', 'available'),
(69, 37, 'BC-9780062024039-01', 'available'),
(70, 37, 'BC-9780062024039-02', 'available'),
(71, 38, 'BC-9780385737951-01', 'available'),
(72, 38, 'BC-9780385737951-02', 'available'),
(73, 39, 'BC-9780316015844-01', 'available'),
(74, 39, 'BC-9780316015844-02', 'available'),
(75, 40, 'BC-9780525478812-01', 'available'),
(76, 40, 'BC-9780525478812-02', 'available'),
(77, 41, 'BC-9780141439518-01', 'available'),
(78, 41, 'BC-9780141439518-02', 'available'),
(79, 42, 'BC-9781984822178-01', 'available'),
(80, 42, 'BC-9781984822178-02', 'available'),
(81, 43, 'BC-9781619630345-01', 'available'),
(82, 43, 'BC-9781619630345-02', 'available');

-- ------------------------------------------------------------
-- Users
-- ------------------------------------------------------------
INSERT INTO Users (UserID, Name, Email, PasswordHash, ProfilePicture, Role, IsDeleted, CreatedAt) VALUES
(1, 'Admin Library', 'admin@library.com', '$2b$10$hashedpassword001', NULL, 'admin', FALSE, NOW()),
(2, 'Sarah Mitchell', 'sarah.m@email.com', '$2b$10$hashedpassword002', NULL, 'member', FALSE, NOW()),
(3, 'James Carter', 'james.c@email.com', '$2b$10$hashedpassword003', NULL, 'member', FALSE, NOW()),
(4, 'Layla Hassan', 'layla.h@email.com', '$2b$10$hashedpassword004', NULL, 'member', FALSE, NOW()),
(5, 'Omar Benali', 'omar.b@email.com', '$2b$10$hashedpassword005', NULL, 'member', FALSE, NOW()),
(6, 'Emma Wilson', 'emma.w@email.com', '$2b$10$hashedpassword006', NULL, 'member', FALSE, NOW()),
(7, 'Noah Thompson', 'noah.t@email.com', '$2b$10$hashedpassword007', NULL, 'member', FALSE, NOW()),
(8, 'Ines Boumediene', 'ines.b@email.com', '$2b$10$hashedpassword008', NULL, 'member', FALSE, NOW()),
(9, 'Youssef Khelil', 'youssef.k@email.com', '$2b$10$hashedpassword009', NULL, 'member', FALSE, NOW()),
(10, 'Maria Fernandez', 'maria.f@email.com', '$2b$10$hashedpassword010', NULL, 'member', FALSE, NOW()),
(11, 'David Nguyen', 'david.n@email.com', '$2b$10$hashedpassword011', NULL, 'member', FALSE, NOW()),
(12, 'Librarian Ali', 'ali.lib@library.com', '$2b$10$hashedpassword012', NULL, 'librarian', FALSE, NOW());

-- ------------------------------------------------------------
-- BorrowingRecords
-- ------------------------------------------------------------
INSERT INTO BorrowingRecords (BorrowingRecordID, UserID, CopyID, BorrowingDate, DueDate, ActualReturnDate, Status, CreatedAt) VALUES
(1, 2, 2, '2025-04-01', '2025-04-15', '2025-04-13', 'returned', '2025-04-01 09:00:00'),
(2, 3, 5, '2025-04-05', '2025-04-19', NULL, 'borrowed', '2025-04-05 10:30:00'),
(3, 4, 8, '2025-04-10', '2025-04-24', NULL, 'borrowed', '2025-04-10 11:15:00'),
(4, 5, 11, '2025-03-20', '2025-04-03', '2025-04-10', 'returned', '2025-03-20 08:45:00'),
(5, 6, 15, '2025-04-12', '2025-04-26', NULL, 'borrowed', '2025-04-12 14:00:00'),
(6, 7, 19, '2025-03-15', '2025-03-29', '2025-04-05', 'returned', '2025-03-15 09:30:00'),
(7, 8, 22, '2025-04-08', '2025-04-22', NULL, 'borrowed', '2025-04-08 13:20:00'),
(8, 9, 26, '2025-04-14', '2025-04-28', NULL, 'borrowed', '2025-04-14 15:45:00'),
(9, 10, 2, '2025-03-01', '2025-03-15', '2025-03-14', 'returned', '2025-03-01 10:00:00'),
(10, 11, 5, '2025-03-10', '2025-03-24', '2025-04-01', 'returned', '2025-03-10 11:00:00');

-- ------------------------------------------------------------
-- Fines
-- ------------------------------------------------------------
INSERT INTO Fines (FineID, UserID, BorrowingRecordID, NumberOfLateDays, FineAmount, PaymentStatus, CreatedAt) VALUES
(1, 5, 4, 7, 3.50, 'unpaid', NOW()),
(2, 7, 6, 7, 3.50, 'paid', NOW()),
(3, 11, 10, 8, 4.00, 'unpaid', NOW());

-- ------------------------------------------------------------
-- Favorites
-- ------------------------------------------------------------
INSERT INTO Favorites (FavoriteID, UserID, BookID, CreatedAt) VALUES
(1, 2, 1, NOW()),
(2, 2, 9, NOW()),
(3, 3, 3, NOW()),
(4, 3, 13, NOW()),
(5, 4, 7, NOW()),
(6, 5, 11, NOW()),
(7, 6, 15, NOW()),
(8, 7, 12, NOW()),
(9, 8, 14, NOW()),
(10, 9, 15, NOW()),
(11, 10, 4, NOW()),
(12, 11, 6, NOW());

-- ------------------------------------------------------------
-- PopularBooks
-- ------------------------------------------------------------
INSERT INTO PopularBooks (PopularBookID, BookID, CreatedAt, IsDeleted) VALUES
(1, 16, NOW(), FALSE),
(2, 6, NOW(), FALSE),
(3, 17, NOW(), FALSE),
(4, 18, NOW(), FALSE),
(5, 5, NOW(), FALSE),
(6, 19, NOW(), FALSE),
(7, 20, NOW(), FALSE),
(8, 9, NOW(), FALSE),
(9, 7, NOW(), FALSE),
(10, 21, NOW(), FALSE),
(11, 22, NOW(), FALSE),
(12, 23, NOW(), FALSE),
(13, 24, NOW(), FALSE),
(14, 8, NOW(), FALSE),
(15, 25, NOW(), FALSE),
(16, 26, NOW(), FALSE),
(17, 27, NOW(), FALSE),
(18, 28, NOW(), FALSE),
(19, 29, NOW(), FALSE),
(20, 30, NOW(), FALSE),
(21, 31, NOW(), FALSE),
(22, 32, NOW(), FALSE),
(23, 3, NOW(), FALSE);
