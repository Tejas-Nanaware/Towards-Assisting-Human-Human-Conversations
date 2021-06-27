CREATE TABLE `users` (
  `ID` int primary key NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL unique,
  `Password` varchar(255) NOT NULL,
  `PasswordSalt` varchar(255) not NULL,
  `Age` int DEFAULT NULL,
  `GenderSelect` varchar(255) DEFAULT NULL,
  `GenderText` varchar(255) DEFAULT NULL,
  `Race` varchar(255) DEFAULT NULL,
  `NativeLanguageSelect` varchar(255) DEFAULT NULL,
  `NativeLanguageText` varchar(255) DEFAULT NULL,
  `Nationality` varchar(255) DEFAULT NULL,
  `Education` varchar(255) DEFAULT NULL,
  `FieldOfEducation` text,
  `MaritalStatus` varchar(255) DEFAULT NULL,
  `EmployementStatus` varchar(255) DEFAULT NULL,
  `WorkIndustry` text,
  `DisabilitySelect` varchar(255) DEFAULT NULL,
  `DisabilityText` varchar(255) DEFAULT NULL,
  `Recruited` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL
);

CREATE TABLE `errors` (
  `ID` int primary key NOT NULL AUTO_INCREMENT,
  `Message` text,
  `Location` varchar(255) DEFAULT NULL,
  `StackTrace` json DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL
);

CREATE TABLE `demographicQuestionnaire` (
  `ID` int primary key NOT NULL AUTO_INCREMENT,
  `ListName` varchar(255) NOT NULL,
  `ListValues` text,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL
);

CREATE TABLE `conversations` (
  `ID` int primary key NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `PeerID` int NOT NULL,
  `Messages` json DEFAULT NULL,
  `AdvisorStatus` json DEFAULT NULL,
  `ConversationStatus` json DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  FOREIGN KEY (UserID) REFERENCES users(ID)
);

CREATE TABLE `questionnaires` (
  `ID` int primary key NOT NULL AUTO_INCREMENT,
  `ConversationID` int NOT NULL unique,
  `ComfortableConversation` int NOT NULL,
  `FeltUncomfortable` int NOT NULL,
  `PartnerUnderstood` int NOT NULL,
  `IUnderstood` int NOT NULL,
  `AssistanceHelpful` int NOT NULL,
  `AssistanceAnnoying` int NOT NULL,
  `AssistanceAccurate` int NOT NULL,
  `AssistanceWillHelp` int NOT NULL,
  `IEnjoyed` int NOT NULL,
  `IRecommend` int NOT NULL,
  `BestParts` longtext,
  `UncomfortableAspects` longtext,
  `Suggestions` longtext,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  FOREIGN KEY (ConversationID) REFERENCES conversations(ID)
);
