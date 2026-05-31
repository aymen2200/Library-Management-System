-- ============================================================
--  04_replace_love_hypothesis.sql
--
--  Replaces "The Love Hypothesis" (Ali Hazelwood) with
--  "Old Man's War" (John Scalzi) — same BookID, same CopyIDs.
--  The author record is also updated.
-- ============================================================

USE LibraryDB;

-- ------------------------------------------------------------
--  STEP 1 — Add John Scalzi as an author
--  (use INSERT IGNORE in case he was already added)
-- ------------------------------------------------------------
INSERT IGNORE INTO Authors (FullName)
VALUES ('John Scalzi');

-- ------------------------------------------------------------
--  STEP 2 — Update the Book record
-- ------------------------------------------------------------
UPDATE Books
SET
    Title             = 'Old Man''s War',
    ISBN              = '9780765315014',
    PublicationDate   = '2005-01-27',
    Genre             = 'Science Fiction',
    AdditionalDetails = 'A 75-year-old man joins the Colonial Defense Forces and is given a new young body — but must fight brutal alien wars to earn citizenship.',
    Image             = 'https://covers.openlibrary.org/b/isbn/9780765315014-L.jpg'
WHERE Title = 'The Love Hypothesis';

-- ------------------------------------------------------------
--  STEP 3 — Swap the BookAuthors entry
-- ------------------------------------------------------------

-- Remove Ali Hazelwood's authorship link for this book
DELETE ba
FROM   BookAuthors ba
JOIN   Books       b  ON b.BookID   = ba.BookID
JOIN   Authors     a  ON a.AuthorID = ba.AuthorID
WHERE  b.Title  = 'Old Man''s War'
AND    a.FullName = 'Ali Hazelwood';

-- Also remove the wrong "Peter Attia" link visible in the screenshot
DELETE ba
FROM   BookAuthors ba
JOIN   Books       b  ON b.BookID   = ba.BookID
JOIN   Authors     a  ON a.AuthorID = ba.AuthorID
WHERE  b.Title  = 'Old Man''s War'
AND    a.FullName = 'Peter Attia';

-- Link John Scalzi to this book
INSERT INTO BookAuthors (BookID, AuthorID)
SELECT b.BookID, a.AuthorID
FROM   Books   b
JOIN   Authors a ON a.FullName = 'John Scalzi'
WHERE  b.Title = 'Old Man''s War';

-- ------------------------------------------------------------
--  STEP 4 — Verify (uncomment to run)
-- ------------------------------------------------------------
/*
SELECT b.BookID, b.Title, a.FullName AS Author, b.ISBN, b.Image
FROM   Books       b
JOIN   BookAuthors ba ON ba.BookID  = b.BookID
JOIN   Authors     a  ON a.AuthorID = ba.AuthorID
WHERE  b.Title = 'Old Man''s War';
*/
