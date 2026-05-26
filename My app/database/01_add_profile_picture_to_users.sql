USE librarydb
  
ALTER TABLE Users 
ADD COLUMN ProfilePicture VARCHAR(500) DEFAULT NULL AFTER PasswordHash;
