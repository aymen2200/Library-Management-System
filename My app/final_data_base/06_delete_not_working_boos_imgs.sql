USE librarydb;

START TRANSACTION;

-- 1. Delete associated fines first (since they depend on borrowing records)
DELETE FROM Fines 
WHERE BorrowingRecordID IN (
    SELECT BorrowingRecordID 
    FROM BorrowingRecords br
    JOIN BookCopies bc ON br.CopyID = bc.CopyID
    JOIN Books b ON bc.BookID = b.BookID
    WHERE b.Title IN (
        'The housemaid', 'To kill a mockingbird', 'purple hibiscus', 'Me Before you', 
        'the snowman', 'The eye of the world', 'where the crawdads sing', 'anxious people', 
        'One Flew Over the Cuckoo\'s Nest', 'little fires everywhere', 'elon musk', 
        'the outsiders', 'happy place', 'The Seven Husbands of Evelyn Hugo', 
        'the light we carry', 'the atlas six', 'clarity'
    )
);

-- 2. Delete the borrowing records tied to those book copies
DELETE FROM BorrowingRecords 
WHERE CopyID IN (
    SELECT bc.CopyID 
    FROM BookCopies bc
    JOIN Books b ON bc.BookID = b.BookID
    WHERE b.Title IN (
        'The housemaid', 'To kill a mockingbird', 'purple hibiscus', 'Me Before you', 
        'the snowman', 'The eye of the world', 'where the crawdads sing', 'anxious people', 
        'One Flew Over the Cuckoo\'s Nest', 'little fires everywhere', 'elon musk', 
        'the outsiders', 'happy place', 'The Seven Husbands of Evelyn Hugo', 
        'the light we carry', 'the atlas six', 'clarity'
    )
);

-- 3. Now delete the books. 
-- This will automatically cascade to BookAuthors, BookCopies, Favorites, and PopularBooks.
DELETE FROM Books 
WHERE Title IN (
    'The housemaid', 'To kill a mockingbird', 'purple hibiscus', 'Me Before you', 
    'the snowman', 'The eye of the world', 'where the crawdads sing', 'anxious people', 
    'One Flew Over the Cuckoo\'s Nest', 'little fires everywhere', 'elon musk', 
    'the outsiders', 'happy place', 'The Seven Husbands of Evelyn Hugo', 
    'the light we carry', 'the atlas six', 'clarity'
);
