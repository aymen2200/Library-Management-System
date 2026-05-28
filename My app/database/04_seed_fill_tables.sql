USE LibraryDB;

INSERT INTO Authors (FullName) VALUES
('J.K. Rowling'),
('Suzanne Collins'),
('Paulo Coelho'),
('Gillian Flynn'),
('Stephen King'),
('Robin Sharma'),
('Dan Brown'),
('Yuval Noah Harari'),
('George Orwell'),
('Aldous Huxley'),
('Douglas Adams'),
('Ray Bradbury'),
('Matt Haig'),
('Tara Westover'),
('Napoleon Hill'),
('Orson Scott Card'),
('Ernest Cline'),
('Michelle Obama'),
('Robert T. Kiyosaki'),
('Malcolm Gladwell'),
('Veronica Roth'),
('James Dashner'),
('Stephenie Meyer'),
('John Green'),
('Jane Austen'),
('Sally Rooney'),
('Sarah J. Maas');

INSERT INTO BookAuthors (BookID, AuthorID) VALUES
((SELECT BookID FROM Books WHERE ISBN = '9780590353427'), (SELECT AuthorID FROM Authors WHERE FullName = 'J.K. Rowling')),
((SELECT BookID FROM Books WHERE ISBN = '9780439023528'), (SELECT AuthorID FROM Authors WHERE FullName = 'Suzanne Collins')),
((SELECT BookID FROM Books WHERE ISBN = '9780061122415'), (SELECT AuthorID FROM Authors WHERE FullName = 'Paulo Coelho')),
((SELECT BookID FROM Books WHERE ISBN = '9780307588371'), (SELECT AuthorID FROM Authors WHERE FullName = 'Gillian Flynn')),
((SELECT BookID FROM Books WHERE ISBN = '9781501142970'), (SELECT AuthorID FROM Authors WHERE FullName = 'Stephen King')),
((SELECT BookID FROM Books WHERE ISBN = '9780062515674'), (SELECT AuthorID FROM Authors WHERE FullName = 'Robin Sharma')),
((SELECT BookID FROM Books WHERE ISBN = '9780307474278'), (SELECT AuthorID FROM Authors WHERE FullName = 'Dan Brown')),
((SELECT BookID FROM Books WHERE ISBN = '9780345806789'), (SELECT AuthorID FROM Authors WHERE FullName = 'Stephen King')), -- The Shining
((SELECT BookID FROM Books WHERE ISBN = '9780062316097'), (SELECT AuthorID FROM Authors WHERE FullName = 'Yuval Noah Harari')),
((SELECT BookID FROM Books WHERE ISBN = '9780451526342'), (SELECT AuthorID FROM Authors WHERE FullName = 'George Orwell')),
((SELECT BookID FROM Books WHERE ISBN = '9780060850524'), (SELECT AuthorID FROM Authors WHERE FullName = 'Aldous Huxley')),
((SELECT BookID FROM Books WHERE ISBN = '9780345391803'), (SELECT AuthorID FROM Authors WHERE FullName = 'Douglas Adams')),
((SELECT BookID FROM Books WHERE ISBN = '9781451673319'), (SELECT AuthorID FROM Authors WHERE FullName = 'Ray Bradbury')),
((SELECT BookID FROM Books WHERE ISBN = '9780525559474'), (SELECT AuthorID FROM Authors WHERE FullName = 'Matt Haig')),
((SELECT BookID FROM Books WHERE ISBN = '9780399590504'), (SELECT AuthorID FROM Authors WHERE FullName = 'Tara Westover')),
((SELECT BookID FROM Books WHERE ISBN = '9781593302009'), (SELECT AuthorID FROM Authors WHERE FullName = 'Napoleon Hill')),
((SELECT BookID FROM Books WHERE ISBN = '9780765382030'), (SELECT AuthorID FROM Authors WHERE FullName = 'Orson Scott Card')),
((SELECT BookID FROM Books WHERE ISBN = '9780307887443'), (SELECT AuthorID FROM Authors WHERE FullName = 'Ernest Cline')),
((SELECT BookID FROM Books WHERE ISBN = '9781524763138'), (SELECT AuthorID FROM Authors WHERE FullName = 'Michelle Obama')),
((SELECT BookID FROM Books WHERE ISBN = '9781612680194'), (SELECT AuthorID FROM Authors WHERE FullName = 'Robert T. Kiyosaki')),
((SELECT BookID FROM Books WHERE ISBN = '9780316017930'), (SELECT AuthorID FROM Authors WHERE FullName = 'Malcolm Gladwell')),
((SELECT BookID FROM Books WHERE ISBN = '9780062024039'), (SELECT AuthorID FROM Authors WHERE FullName = 'Veronica Roth')),
((SELECT BookID FROM Books WHERE ISBN = '9780385737951'), (SELECT AuthorID FROM Authors WHERE FullName = 'James Dashner')),
((SELECT BookID FROM Books WHERE ISBN = '9780316015844'), (SELECT AuthorID FROM Authors WHERE FullName = 'Stephenie Meyer')),
((SELECT BookID FROM Books WHERE ISBN = '9780525478812'), (SELECT AuthorID FROM Authors WHERE FullName = 'John Green')),
((SELECT BookID FROM Books WHERE ISBN = '9780141439518'), (SELECT AuthorID FROM Authors WHERE FullName = 'Jane Austen')),
((SELECT BookID FROM Books WHERE ISBN = '9781984822178'), (SELECT AuthorID FROM Authors WHERE FullName = 'Sally Rooney')),
((SELECT BookID FROM Books WHERE ISBN = '9781619630345'), (SELECT AuthorID FROM Authors WHERE FullName = 'Sarah J. Maas'));

-- Create Copy #1 for every book
INSERT INTO BookCopies (BookID, Barcode, AvailabilityStatus)
SELECT BookID, CONCAT('BC-', ISBN, '-01'), 'available'
FROM Books;

-- Create Copy #2 for every book (giving your library a stock of 2 per book)
INSERT INTO BookCopies (BookID, Barcode, AvailabilityStatus)
SELECT BookID, CONCAT('BC-', ISBN, '-02'), 'available'
FROM Books;
