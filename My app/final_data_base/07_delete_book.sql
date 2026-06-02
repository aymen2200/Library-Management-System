USE librarydb;

START TRANSACTION;

DELETE FROM Fines
WHERE BorrowingRecordID IN (
    SELECT br.BorrowingRecordID
    FROM BorrowingRecords br
    JOIN BookCopies bc ON br.CopyID = bc.CopyID
    JOIN Books b ON bc.BookID = b.BookID
    WHERE b.Title = 'the notebook'
);

DELETE FROM BorrowingRecords
WHERE CopyID IN (
    SELECT bc.CopyID
    FROM BookCopies bc
    JOIN Books b ON bc.BookID = b.BookID
    WHERE b.Title = 'the notebook'
);

DELETE FROM Books
WHERE Title = 'the notebook';

COMMIT;
