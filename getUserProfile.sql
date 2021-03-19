CREATE PROCEDURE `getUserProfile`(userID INT)
BEGIN
SELECT COUNT(ID) as TotalConversations FROM conversations c WHERE UserID=userID;
SELECT COUNT(distinct PeerID) as TotalPeers FROM conversations WHERE UserID=userID AND PeerID!=0;
SELECT COUNT(Messages.senderID) as TotalMessagesSent FROM conversations,JSON_TABLE(Messages, '$[*]' COLUMNS (senderID INT PATH '$.senderID')) Messages WHERE UserID=userID AND senderID=userID;
SELECT COUNT(Messages.senderID) as TotalMessagesReceived FROM conversations,JSON_TABLE(Messages, '$[*]' COLUMNS (senderID INT PATH '$.senderID')) Messages WHERE UserID=userID AND senderID!=userID;
SELECT COUNT(AdvisorStatus.Status) as TimesBotHelpful FROM conversations,JSON_TABLE(AdvisorStatus, '$[*]' COLUMNS (Status VARCHAR(5) PATH '$.Status')) AdvisorStatus WHERE UserID=userID AND Status="up";
SELECT COUNT(AdvisorStatus.Status) as TimesBotNotHelpful FROM conversations,JSON_TABLE(AdvisorStatus, '$[*]' COLUMNS (Status VARCHAR(5) PATH '$.Status')) AdvisorStatus WHERE UserID=userID AND Status="down";
SELECT count(ConversationStatus.Status) as CountGoodConversations FROM conversations c,JSON_TABLE(c.ConversationStatus, '$[*]' COLUMNS (Status VARCHAR(40) PATH '$.Status')) ConversationStatus WHERE c.UserID=1 AND Status="up";
SELECT count(ConversationStatus.Status) as CountBadConversations FROM conversations c,JSON_TABLE(c.ConversationStatus, '$[*]' COLUMNS (Status VARCHAR(40) PATH '$.Status')) ConversationStatus WHERE c.UserID=1 AND Status="down";
SELECT * FROM users WHERE ID=userID;
END