CREATE DATABASE LibraryDB;
USE LibraryDB;

-- =========================
-- Books Table
-- =========================
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    ISBN VARCHAR(50),
    PublicationDate DATE,
    Genre VARCHAR(50),
    AdditionalDetails VARCHAR(1000)
);

-- =========================
-- BookCopies Table
-- =========================
CREATE TABLE BookCopies (
    CopyID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    AvailabilityStatus BIT DEFAULT 1,
    
    CONSTRAINT FK_BookCopies_Books
    FOREIGN KEY (BookID)
    REFERENCES Books(BookID)
    ON DELETE CASCADE
);

-- =========================
-- Users Table
-- =========================
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    ContactInformation VARCHAR(255),
    LibraryCardNumber VARCHAR(50)
);

-- =========================
-- BorrowingRecords Table
-- =========================
CREATE TABLE BorrowingRecords (
    BorrowingRecordID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    CopyID INT NOT NULL,
    BorrowingDate DATE,
    DueDate DATE,
    ActualReturnDate DATE,

    CONSTRAINT FK_Borrowing_User
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID),

    CONSTRAINT FK_Borrowing_Copy
    FOREIGN KEY (CopyID)
    REFERENCES BookCopies(CopyID)
);

-- =========================
-- Reservations Table
-- =========================
CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    CopyID INT NOT NULL,
    ReservationDate DATE,

    CONSTRAINT FK_Reservation_User
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID),

    CONSTRAINT FK_Reservation_Copy
    FOREIGN KEY (CopyID)
    REFERENCES BookCopies(CopyID)
);

-- =========================
-- Fines Table
-- =========================
CREATE TABLE Fines (
    FineID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    BorrowingRecordID INT NOT NULL,
    NumberOfLateDays INT,
    FineAmount DECIMAL(10,2),
    PaymentStatus BIT DEFAULT 0,

    CONSTRAINT FK_Fine_User
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID),

    CONSTRAINT FK_Fine_Borrowing
    FOREIGN KEY (BorrowingRecordID)
    REFERENCES BorrowingRecords(BorrowingRecordID)
);

-- =========================
-- Settings Table
-- =========================
CREATE TABLE Settings (
    DefaultBorrowDays TINYINT,
    DefaultFinePerDay TINYINT
);
