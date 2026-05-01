#!/bin/bash
echo "Starting Royal Deployment..."
sudo apt update
sudo apt install openjdk-17-jdk mysql-server nginx unzip -y

# Database Setup
sudo systemctl start mysql
sudo mysql -e "CREATE DATABASE IF NOT EXISTS jaipur_tourism;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'Assignment56@';"
sudo mysql -e "GRANT ALL PRIVILEGES ON jaipur_tourism.* TO 'root'@'localhost';"
sudo mysql -e "CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'Assignment56@';"
sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;"
sudo mysql -e "FLUSH PRIVILEGES;"

# MySQL Remote Config
echo "[mysqld]" | sudo tee /etc/mysql/conf.d/allow_remote.cnf
echo "bind-address = 0.0.0.0" | sudo tee -a /etc/mysql/conf.d/allow_remote.cnf
sudo systemctl restart mysql

# Tomcat Setup
TOMCAT_VERSION="10.1.20"
if [ ! -d "/opt/tomcat" ]; then
    wget https://archive.apache.org/dist/tomcat/tomcat-10/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz
    sudo mkdir /opt/tomcat
    sudo tar xzvf apache-tomcat-$TOMCAT_VERSION.tar.gz -C /opt/tomcat --strip-components=1
    sudo chown -R $USER:$USER /opt/tomcat
    chmod +x /opt/tomcat/bin/*.sh
fi

# Nginx Config
cat <<EOF | sudo tee /etc/nginx/sites-available/jaipur
server {
    listen 80;
    server_name _;
    root /var/www/jaipur/frontend;
    index index.html;
    location / { try_files \$uri \$uri/ /index.html; }
    location /api { proxy_pass http://localhost:8080/api; proxy_set_header Host \$host; }
    location /login { proxy_pass http://localhost:8080/login; proxy_set_header Host \$host; }
    location /oauth2 { proxy_pass http://localhost:8080/oauth2; proxy_set_header Host \$host; }
}
EOF
[ ! -L /etc/nginx/sites-enabled/jaipur ] && sudo ln -s /etc/nginx/sites-available/jaipur /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# Move Files
if [ -f /home/ubuntu/backend.war ]; then
    sudo rm -rf /opt/tomcat/webapps/ROOT*
    sudo mv /home/ubuntu/backend.war /opt/tomcat/webapps/ROOT.war
fi
if [ -f /home/ubuntu/dist.zip ]; then
    sudo mkdir -p /var/www/jaipur/frontend
    sudo unzip -o /home/ubuntu/dist.zip -d /var/www/jaipur/frontend
fi


# Restart Tomcat
sudo /opt/tomcat/bin/shutdown.sh
sudo /opt/tomcat/bin/startup.sh

echo "Royal Deployment Complete!"
