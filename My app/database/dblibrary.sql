-- ============================================================
--  Library Management System — MySQL Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS LibraryDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE LibraryDB;

-- ------------------------------------------------------------
-- Authors
-- ------------------------------------------------------------
CREATE TABLE Authors (
  AuthorID   INT          NOT NULL AUTO_INCREMENT,
  FullName   VARCHAR(255) NOT NULL,
  PRIMARY KEY (AuthorID)
);

-- ------------------------------------------------------------
-- Books
-- ------------------------------------------------------------
CREATE TABLE Books (
  BookID            INT           NOT NULL AUTO_INCREMENT,
  Title             VARCHAR(255)  NOT NULL,
  ISBN              VARCHAR(30)   UNIQUE,
  PublicationDate   DATE,
  Genre             VARCHAR(100),
  AdditionalDetails TEXT,
  Image             VARCHAR(500),
  CreatedAt         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  IsDeleted         BOOLEAN       NOT NULL DEFAULT FALSE,
  PRIMARY KEY (BookID)
);

-- ------------------------------------------------------------
-- BookAuthors  (many-to-many: Books <-> Authors)
-- ------------------------------------------------------------
CREATE TABLE BookAuthors (
  BookID    INT NOT NULL,
  AuthorID  INT NOT NULL,
  PRIMARY KEY (BookID, AuthorID),
  CONSTRAINT fk_ba_book   FOREIGN KEY (BookID)   REFERENCES Books(BookID)     ON DELETE CASCADE,
  CONSTRAINT fk_ba_author FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Users
-- ------------------------------------------------------------
CREATE TABLE Users (
  UserID        INT           NOT NULL AUTO_INCREMENT,
  Name          VARCHAR(150)  NOT NULL,
  Email         VARCHAR(255)  NOT NULL UNIQUE,
  PasswordHash  VARCHAR(255)  NOT NULL,
  Role          ENUM('member','librarian','admin') NOT NULL DEFAULT 'member',
  IsDeleted     BOOLEAN       NOT NULL DEFAULT FALSE,
  CreatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (UserID)
);

-- ------------------------------------------------------------
-- BookCopies  (physical copies of a book)
-- ------------------------------------------------------------
CREATE TABLE BookCopies (
  CopyID             INT          NOT NULL AUTO_INCREMENT,
  BookID             INT          NOT NULL,
  Barcode            VARCHAR(100) UNIQUE,
  AvailabilityStatus ENUM('available','borrowed','reserved','lost') NOT NULL DEFAULT 'available',
  PRIMARY KEY (CopyID),
  CONSTRAINT fk_copy_book FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Settings
-- ------------------------------------------------------------
CREATE TABLE Settings (
  SettingID          INT            NOT NULL AUTO_INCREMENT,
  DefaultBorrowDays  INT            NOT NULL DEFAULT 14,
  DefaultFinePerDay  DECIMAL(8, 2)  NOT NULL DEFAULT 0.50,
  PRIMARY KEY (SettingID)
);

-- ------------------------------------------------------------
-- BorrowingRecords
-- ------------------------------------------------------------
CREATE TABLE BorrowingRecords (
  BorrowingRecordID  INT       NOT NULL AUTO_INCREMENT,
  UserID             INT       NOT NULL,
  CopyID             INT       NOT NULL,
  BorrowingDate      DATE      NOT NULL DEFAULT (CURRENT_DATE),
  DueDate            DATE      NOT NULL,
  ActualReturnDate   DATE,
  Status ENUM('borrowed', 'returned', 'overdue', 'lost') NOT NULL DEFAULT 'borrowed',
  CreatedAt          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (BorrowingRecordID),
  CONSTRAINT fk_br_user FOREIGN KEY (UserID) REFERENCES Users(UserID)         ON DELETE RESTRICT,
  CONSTRAINT fk_br_copy FOREIGN KEY (CopyID) REFERENCES BookCopies(CopyID)    ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- Fines
-- ------------------------------------------------------------
CREATE TABLE Fines (
  FineID             INT            NOT NULL AUTO_INCREMENT,
  UserID             INT            NOT NULL,
  BorrowingRecordID  INT            NOT NULL,
  NumberOfLateDays   INT            NOT NULL DEFAULT 0,
  FineAmount         DECIMAL(8, 2)  NOT NULL DEFAULT 0.00,
  PaymentStatus      ENUM('unpaid','paid','waived') NOT NULL DEFAULT 'unpaid',
  CreatedAt          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (FineID),
  CONSTRAINT fk_fine_user   FOREIGN KEY (UserID)            REFERENCES Users(UserID)                       ON DELETE RESTRICT,
  CONSTRAINT fk_fine_record FOREIGN KEY (BorrowingRecordID) REFERENCES BorrowingRecords(BorrowingRecordID) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Favorit  (users save copies they like)
-- ------------------------------------------------------------
CREATE TABLE Favorit (
  FavoriteID  INT       NOT NULL AUTO_INCREMENT,
  UserID      INT       NOT NULL,
  CopyID      INT       NOT NULL,
  CreatedAt   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (FavoriteID),
  UNIQUE KEY uq_fav (UserID, CopyID),
  CONSTRAINT fk_fav_user FOREIGN KEY (UserID) REFERENCES Users(UserID)      ON DELETE CASCADE,
  CONSTRAINT fk_fav_copy FOREIGN KEY (CopyID) REFERENCES BookCopies(CopyID) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Seed default settings row
-- ------------------------------------------------------------
INSERT INTO Settings (DefaultBorrowDays, DefaultFinePerDay)
VALUES (14, 0.50);
