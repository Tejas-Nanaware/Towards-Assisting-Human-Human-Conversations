pm2 serve -s ChatFramework/client/dist 5000 --name chat-vue
pm2 start ChatFramework/server/src/app.js --name chat-node
pm2 start API/application.py --name chat-flask --interpreter=python3
sudo nginx -t
sudo systemctl restart nginx
sudo lsof -i -P -n | grep LISTEN
