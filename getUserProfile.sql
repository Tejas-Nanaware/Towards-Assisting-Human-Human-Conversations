CREATE PROCEDURE `getUserProfile`(userID INT)
BEGIN
SELECT COUNT(ID) as TotalConversations FROM conversations c WHERE c.UserID=userID;
SELECT COUNT(distinct PeerID) as TotalPeers FROM conversations c WHERE c.UserID=userID AND c.PeerID!=0;
SELECT COUNT(c.Messages.senderID) as TotalMessagesSent FROM conversations c,JSON_TABLE(c.Messages, '$[*]' COLUMNS (senderID INT PATH '$.senderID')) Messages WHERE c.UserID=userID AND senderID=userID;
SELECT COUNT(c.Messages.senderID) as TotalMessagesReceived FROM conversations c,JSON_TABLE(c.Messages, '$[*]' COLUMNS (senderID INT PATH '$.senderID')) Messages WHERE c.UserID=userID AND senderID!=userID;
SELECT COUNT(c.AdvisorStatus.Status) as TimesBotHelpful FROM conversations c,JSON_TABLE(c.AdvisorStatus, '$[*]' COLUMNS (Status VARCHAR(5) PATH '$.Status')) AdvisorStatus WHERE c.UserID=userID AND Status="up";
SELECT COUNT(c.AdvisorStatus.Status) as TimesBotNotHelpful FROM conversations c,JSON_TABLE(c.AdvisorStatus, '$[*]' COLUMNS (Status VARCHAR(5) PATH '$.Status')) AdvisorStatus WHERE c.UserID=userID AND Status="down";
SELECT count(c.ConversationStatus.Status) as CountGoodConversations FROM conversations c,JSON_TABLE(c.ConversationStatus, '$[*]' COLUMNS (Status VARCHAR(40) PATH '$.Status')) ConversationStatus WHERE c.UserID=userID AND Status="up";
SELECT count(c.ConversationStatus.Status) as CountBadConversations FROM conversations c,JSON_TABLE(c.ConversationStatus, '$[*]' COLUMNS (Status VARCHAR(40) PATH '$.Status')) ConversationStatus WHERE c.UserID=userID AND Status="down";
SELECT * FROM users u WHERE u.ID=userID;
END