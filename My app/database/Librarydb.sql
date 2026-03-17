-- ========================================================
-- LIBRARY MANAGEMENT SYSTEM - FINAL "PERFECT" VERSION
-- ========================================================
DROP DATABASE IF EXISTS LibraryDB;
CREATE DATABASE LibraryDB;
USE LibraryDB;

-- 1. Authors Table
CREATE TABLE Authors (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(150) NOT NULL UNIQUE
);

-- 2. Books Table (Base information)
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    ISBN VARCHAR(20) UNIQUE NOT NULL,
    PublicationDate DATE,
    Genre VARCHAR(50),
    AdditionalDetails TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE -- Soft delete to preserve history
);

-- 3. BookAuthors (Many-to-Many Junction)
CREATE TABLE BookAuthors (
    BookID INT,
    AuthorID INT,
    PRIMARY KEY (BookID, AuthorID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID) ON DELETE CASCADE
);

-- 4. BookCopies Table (Physical Inventory)
CREATE TABLE BookCopies (
    CopyID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    Barcode VARCHAR(50) UNIQUE NOT NULL, -- Physical ID (Scanner)
    AvailabilityStatus ENUM('Available', 'Borrowed', 'Reserved', 'Maintenance') DEFAULT 'Available',
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE
);

-- 5. Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    LibraryCardNumber VARCHAR(50) UNIQUE NOT NULL,
    Role TINYINT NOT NULL DEFAULT 1, -- 0 = Admin, 1 = User
    IsDeleted BOOLEAN DEFAULT FALSE,  -- Soft delete to preserve audit trails
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. BorrowingRecords Table (The transaction log)
CREATE TABLE BorrowingRecords (
    BorrowingRecordID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    CopyID INT NOT NULL,
    BorrowingDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    ActualReturnDate DATE NULL, -- NULL until the book is actually back
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- RESTRICT prevents deleting a User/Copy if a record depends on it
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE RESTRICT,
    FOREIGN KEY (CopyID) REFERENCES BookCopies(CopyID) ON DELETE RESTRICT
);

-- 7. Reservations Table
CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    CopyID INT NOT NULL,
    ReservationDate DATE NOT NULL,
    ExpiryDate DATE,
    Status ENUM('Pending', 'Fulfilled', 'Cancelled', 'Expired') DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CopyID) REFERENCES BookCopies(CopyID) ON DELETE CASCADE
);

-- 8. Fines Table
CREATE TABLE Fines (
    FineID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    BorrowingRecordID INT NOT NULL,
    NumberOfLateDays INT DEFAULT 0,
    FineAmount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PaymentStatus ENUM('Pending', 'Paid') DEFAULT 'Pending',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE RESTRICT,
    FOREIGN KEY (BorrowingRecordID) REFERENCES BorrowingRecords(BorrowingRecordID) ON DELETE CASCADE
);

-- 9. Settings Table (Global configuration)
CREATE TABLE Settings (
    SettingID INT PRIMARY KEY DEFAULT 1,
    DefaultBorrowDays INT DEFAULT 14,
    DefaultFinePerDay DECIMAL(10,2) DEFAULT 2.00,
    -- Ensures only one row can ever exist
    CONSTRAINT SingleRowCheck CHECK (SettingID = 1)
);

-- Initial Setup
INSERT INTO Settings (SettingID, DefaultBorrowDays, DefaultFinePerDay) VALUES (1, 14, 2.00);
