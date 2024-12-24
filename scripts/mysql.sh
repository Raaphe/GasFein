#!/bin/bash

# Requirements: apt install sudo && chmod +x install-mysql.sh

export DEBIAN_FRONTEND=noninteractive

apt-get update && apt-get upgrade -y

timedatectl set-timezone America/Chicago

apt-get -y install ufw
ufw enable
ufw allow 22
ufw allow 3306

apt-get -y install zsh htop wget lsb-release gnupg

mkdir -p ~/mysql
cd ~/mysql

wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-server_8.0.35-1debian12_amd64.deb-bundle.tar

tar -xf mysql-server_8.0.35-1debian12_amd64.deb-bundle.tar

dpkg -i mysql-{common,community-client-plugins,community-client-core,community-client,client,community-server-core,community-server,server}_*.deb

apt-get -f install -y

echo "mysql-server mysql-server/root_password password abc-123" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password abc-123" | debconf-set-selections

apt-get -y install mysql-server

mysql -uroot -pabc-123 -e "USE mysql; UPDATE user SET Host='%' WHERE User='root' AND Host='localhost'; DELETE FROM user WHERE Host != '%' AND User='root';"
mysql -uroot -pabc-123 -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'abc-123' WITH GRANT OPTION; FLUSH PRIVILEGES;"

systemctl restart mysql

systemctl status mysql --no-pager

mysql -uroot -pabc-123 -e "CREATE DATABASE testdb;"
