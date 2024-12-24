#!/bin/bash

for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do
    apt-get remove -y $pkg
done

apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install node

n=$(which node)
n=${n%/bin/node}
chmod -R 755 $n/bin/*
sudo cp -r $n/{bin,lib,share} /usr/local

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

cd ~/"GasFein/backend" || { echo "Backend directory not found!"; exit 1; }

npm install --force
npm run build

docker run --rm \
  -v ~/"GasFein":/local openapitools/openapi-generator-cli generate \
  -i /local/docs/swagger/swagger.json \
  -g javascript \
  -o /local/frontend/api/generated-client \
  --skip-validate-spec

npm run start
