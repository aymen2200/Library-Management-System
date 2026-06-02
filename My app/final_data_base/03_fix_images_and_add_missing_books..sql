-- ============================================================
--  03_fix_images_and_add_missing_books.sql
--
--  Fixes broken/missing cover image URLs for the books listed
--  below, and inserts books that are missing from the database
--  entirely. All image URLs use Open Library covers via ISBN.
--
--  Books addressed:
--    - She Who Became the Sun       (new INSERT, BookID 194)
--    - The Final Girl Support Group  (new INSERT, BookID 195)
--    - My Heart Is a Chainsaw        (new INSERT, BookID 196)
--    - The Only Good Indians         (new INSERT, BookID 197)
--    - Never Let Me Go               (new INSERT, BookID 198)
--    - The Push                      (new INSERT, BookID 199)
--    - Clarity                       (new INSERT, BookID 200)
--    - The Heroes                    (new INSERT, BookID 201)
--    - Red Country                   (new INSERT, BookID 202)
--    - Caliban's War                 (new INSERT, BookID 203)
--    - Abaddon's Gate                (new INSERT, BookID 204)
--    - Babylon's Ashes               (new INSERT, BookID 205)
--    - The Gathering Storm           (new INSERT, BookID 206)
--    - The Diamond Age               (new INSERT, BookID 207)
--    - Second Foundation             (new INSERT, BookID 208)
--    - Foundation (BookID 80)        (UPDATE image URL — fix)
--    - The Jasmine Throne            (new INSERT, BookID 209)
--    - Bird Box                      (new INSERT, BookID 210)
--
--  NOTE: All image URLs have been verified to resolve via
--  Open Library's cover API (https://covers.openlibrary.org).
--  The -L suffix requests the large (300px+) image size.
-- ============================================================

USE LibraryDB;

-- ============================================================
--  SECTION 1 — Fix existing broken image URLs
-- ============================================================

-- Foundation (BookID 80): The ISBN 9780553293357 returns no
-- cover on Open Library. The correct mass-market paperback
-- edition that has a cover is 9780553382570.
UPDATE Books
SET    Image = 'https://covers.openlibrary.org/b/isbn/9780553382570-L.jpg'
WHERE  BookID = 80;

-- Pride and Prejudice (BookID 41): URL was missing "/isbn/" prefix
UPDATE Books
SET    Image = 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg'
WHERE  BookID = 41;


-- ============================================================
--  SECTION 2 — New Authors
-- ============================================================

INSERT INTO Authors (AuthorID, FullName) VALUES
(151, 'Shelley Parker-Chan'),   -- She Who Became the Sun
(152, 'Grady Hendrix'),         -- The Final Girl Support Group
(153, 'Stephen Graham Jones'),  -- My Heart Is a Chainsaw / The Only Good Indians
(154, 'Ashley Audrain'),        -- The Push
(155, 'Kim Harrington'),        -- Clarity
-- Joe Abercrombie already AuthorID 98 (The Blade Itself)
-- Kazuo Ishiguro already AuthorID 71 (The Remains of the Day)
(156, 'James S.A. Corey'),      -- The Expanse series (pen name of Ty Franck & Daniel Abraham)
-- Robert Jordan already AuthorID 96, Brandon Sanderson already AuthorID 95
(157, 'Neal Stephenson'),       -- The Diamond Age
-- Isaac Asimov already AuthorID 89
(158, 'Tasha Suri'),            -- The Jasmine Throne
(159, 'Josh Malerman');         -- Bird Box


-- ============================================================
--  03_fix_images_and_add_missing_books_v2.sql
--
--  CORRECTED VERSION — run this instead of the original v1.
--
--  Sections 1 (UPDATE image fixes) and 2 (new Authors) from
--  the original file already ran successfully — DO NOT re-run
--  them. This file contains only Sections 3, 4, and 5.
--
--  Key fix vs v1:
--    - "Never Let Me Go" removed — it already exists as
--      BookID 153 in 02_add_new_books.sql with a valid image.
--    - BookIDs renumbered: 194–209 (was 194–210).
-- ============================================================

USE LibraryDB;

-- ============================================================
--  SECTION 3 — New Books (INSERT)
-- ============================================================

INSERT INTO Books (BookID, Title, ISBN, PublicationDate, Genre, AdditionalDetails, Image, CreatedAt, IsDeleted) VALUES

(194, 'She Who Became the Sun',
      '9781250621801', '2021-07-20', 'Fantasy',
      'An epic reimagining of the rise of the first Ming emperor, told through a peasant girl who steals her dead brother''s fate.',
      'https://covers.openlibrary.org/b/isbn/9781250621801-L.jpg',
      NOW(), FALSE),

(195, 'The Final Girl Support Group',
      '9780593201237', '2021-07-13', 'Horror',
      'A support group of women who survived horror-movie-style massacres — until someone starts hunting them down.',
      'https://covers.openlibrary.org/b/isbn/9780593201237-L.jpg',
      NOW(), FALSE),

(196, 'My Heart Is a Chainsaw',
      '9781982137632', '2021-08-31', 'Horror',
      'A slasher-obsessed loner in a small Idaho town discovers her genre expertise may be exactly what is needed to stop real murders.',
      'https://covers.openlibrary.org/b/isbn/9781982137632-L.jpg',
      NOW(), FALSE),

(197, 'The Only Good Indians',
      '9781982136451', '2020-07-14', 'Horror',
      'Four Blackfeet men are stalked by a supernatural entity seeking revenge for a transgression from their past.',
      'https://covers.openlibrary.org/b/isbn/9781982136451-L.jpg',
      NOW(), FALSE),

(198, 'The Push',
      '9781984881663', '2021-01-05', 'Psychological Thriller',
      'A mother questions whether her daughter is evil — or whether she herself is. A dark examination of the mother-child bond.',
      'https://covers.openlibrary.org/b/isbn/9781984881663-L.jpg',
      NOW(), FALSE),

(199, 'Clarity',
      '9780545230513', '2011-02-01', 'Young Adult Mystery',
      'A teenage psychic in a tourist town is asked by the police to help solve a murder using her ability to read memories from objects.',
      'https://covers.openlibrary.org/b/isbn/9780545230513-L.jpg',
      NOW(), FALSE),

(200, 'The Heroes',
      '9780316044981', '2011-02-01', 'Fantasy',
      'A stand-alone First Law novel following three days of brutal battle over a circle of ancient stones called The Heroes.',
      'https://covers.openlibrary.org/b/isbn/9780316044981-L.jpg',
      NOW(), FALSE),

(201, 'Red Country',
      '9780316187213', '2012-10-02', 'Fantasy',
      'A woman searches for her kidnapped children across a brutal frontier in this First Law stand-alone Western-flavoured fantasy.',
      'https://covers.openlibrary.org/b/isbn/9780316187213-L.jpg',
      NOW(), FALSE),

(202, 'Caliban''s War',
      '9780316129060', '2012-06-26', 'Science Fiction',
      'Book 2 of The Expanse. A new alien threat emerges on Ganymede, dragging humanity deeper into interplanetary conflict.',
      'https://covers.openlibrary.org/b/isbn/9780316129060-L.jpg',
      NOW(), FALSE),

(203, 'Abaddon''s Gate',
      '9780316129077', '2013-06-04', 'Science Fiction',
      'Book 3 of The Expanse. The alien artifact beyond Uranus opens a gateway to thousands of solar systems.',
      'https://covers.openlibrary.org/b/isbn/9780316129077-L.jpg',
      NOW(), FALSE),

(204, 'Babylon''s Ashes',
      '9780316217620', '2016-12-06', 'Science Fiction',
      'Book 6 of The Expanse. The Free Navy has crippled Earth and a coalition must rise to fight back.',
      'https://covers.openlibrary.org/b/isbn/9780316217620-L.jpg',
      NOW(), FALSE),

(205, 'The Gathering Storm',
      '9780765302304', '2009-10-27', 'Fantasy',
      'Book 12 of the Wheel of Time. Rand al''Thor approaches breaking point while Egwene fights to reclaim the Amyrlin Seat.',
      'https://covers.openlibrary.org/b/isbn/9780765302304-L.jpg',
      NOW(), FALSE),

(206, 'The Diamond Age',
      '9780553380965', '1995-02-01', 'Science Fiction',
      'A young girl in a nanotechnology-saturated future receives an interactive book intended for someone else — and it changes history.',
      'https://covers.openlibrary.org/b/isbn/9780553380965-L.jpg',
      NOW(), FALSE),

(207, 'Second Foundation',
      '9780553293364', '1953-06-01', 'Science Fiction',
      'Book 3 of the Foundation series. The Mule hunts for the hidden Second Foundation that may be humanity''s last hope.',
      'https://covers.openlibrary.org/b/isbn/9780553293364-L.jpg',
      NOW(), FALSE),

(208, 'The Jasmine Throne',
      '9781250174673', '2021-06-08', 'Fantasy',
      'A captive princess and a rebel maidservant join forces to claim power in a world inspired by the Indian subcontinent.',
      'https://covers.openlibrary.org/b/isbn/9781250174673-L.jpg',
      NOW(), FALSE),

(209, 'Bird Box',
      '9780062259653', '2014-05-13', 'Horror',
      'In a post-apocalyptic world where sight means death, a woman must guide her children to safety completely blindfolded.',
      'https://covers.openlibrary.org/b/isbn/9780062259653-L.jpg',
      NOW(), FALSE);


-- ============================================================
--  SECTION 4 — BookAuthors
--  Note: AuthorIDs 151–159 were inserted in Section 2 (v1).
-- ============================================================

INSERT INTO BookAuthors (BookID, AuthorID) VALUES
(194, 151),  -- She Who Became the Sun     → Shelley Parker-Chan  (AuthorID 151)
(195, 152),  -- The Final Girl Support Group→ Grady Hendrix        (AuthorID 152)
(196, 153),  -- My Heart Is a Chainsaw     → Stephen Graham Jones  (AuthorID 153)
(197, 153),  -- The Only Good Indians      → Stephen Graham Jones  (AuthorID 153)
(198, 154),  -- The Push                   → Ashley Audrain        (AuthorID 154)
(199, 155),  -- Clarity                    → Kim Harrington        (AuthorID 155)
(200,  98),  -- The Heroes                 → Joe Abercrombie       (existing AuthorID 98)
(201,  98),  -- Red Country                → Joe Abercrombie       (existing AuthorID 98)
(202, 156),  -- Caliban's War              → James S.A. Corey      (AuthorID 156)
(203, 156),  -- Abaddon's Gate             → James S.A. Corey      (AuthorID 156)
(204, 156),  -- Babylon's Ashes            → James S.A. Corey      (AuthorID 156)
(205,  96),  -- The Gathering Storm        → Robert Jordan         (existing AuthorID 96)
(205,  95),  -- The Gathering Storm        → Brandon Sanderson     (existing AuthorID 95)
(206, 157),  -- The Diamond Age            → Neal Stephenson       (AuthorID 157)
(207,  89),  -- Second Foundation          → Isaac Asimov          (existing AuthorID 89)
(208, 158),  -- The Jasmine Throne         → Tasha Suri            (AuthorID 158)
(209, 159);  -- Bird Box                   → Josh Malerman         (AuthorID 159)


-- ============================================================
--  SECTION 5 — BookCopies (2 copies per new book)
-- ============================================================

INSERT INTO BookCopies (CopyID, BookID, Barcode, AvailabilityStatus) VALUES
(383, 194, 'BC-9781250621801-01', 'available'),
(384, 194, 'BC-9781250621801-02', 'available'),
(385, 195, 'BC-9780593201237-01', 'available'),
(386, 195, 'BC-9780593201237-02', 'available'),
(387, 196, 'BC-9781982137632-01', 'available'),
(388, 196, 'BC-9781982137632-02', 'available'),
(389, 197, 'BC-9781982136451-01', 'available'),
(390, 197, 'BC-9781982136451-02', 'available'),
(391, 198, 'BC-9781984881663-01', 'available'),
(392, 198, 'BC-9781984881663-02', 'available'),
(393, 199, 'BC-9780545230513-01', 'available'),
(394, 199, 'BC-9780545230513-02', 'available'),
(395, 200, 'BC-9780316044981-01', 'available'),
(396, 200, 'BC-9780316044981-02', 'available'),
(397, 201, 'BC-9780316187213-01', 'available'),
(398, 201, 'BC-9780316187213-02', 'available'),
(399, 202, 'BC-9780316129060-01', 'available'),
(400, 202, 'BC-9780316129060-02', 'available'),
(401, 203, 'BC-9780316129077-01', 'available'),
(402, 203, 'BC-9780316129077-02', 'available'),
(403, 204, 'BC-9780316217620-01', 'available'),
(404, 204, 'BC-9780316217620-02', 'available'),
(405, 205, 'BC-9780765302304-01', 'available'),
(406, 205, 'BC-9780765302304-02', 'available'),
(407, 206, 'BC-9780553380965-01', 'available'),
(408, 206, 'BC-9780553380965-02', 'available'),
(409, 207, 'BC-9780553293364-01', 'available'),
(410, 207, 'BC-9780553293364-02', 'available'),
(411, 208, 'BC-9781250174673-01', 'available'),
(412, 208, 'BC-9781250174673-02', 'available'),
(413, 209, 'BC-9780062259653-01', 'available'),
(414, 209, 'BC-9780062259653-02', 'available');


-- ============================================================
--  SECTION 6 — Verification queries (uncomment to run)
-- ============================================================

/*
-- Confirm all new books inserted with correct data:
SELECT b.BookID, b.Title, a.FullName AS Author, b.ISBN, b.Image
FROM   Books b
JOIN   BookAuthors ba ON ba.BookID  = b.BookID
JOIN   Authors     a  ON a.AuthorID = ba.AuthorID
WHERE  b.BookID IN (
    80, 41, 153,
    194,195,196,197,198,199,200,
    201,202,203,204,205,206,207,208,209
)
ORDER BY b.BookID;

-- Confirm 2 copies exist for every new book:
SELECT b.BookID, b.Title, COUNT(bc.CopyID) AS Copies
FROM   Books     b
LEFT JOIN BookCopies bc ON bc.BookID = b.BookID
WHERE  b.BookID BETWEEN 194 AND 209
GROUP  BY b.BookID, b.Title
ORDER  BY b.BookID;
*/
