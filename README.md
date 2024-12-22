# GasFein 

This is an app for finding the best gas prices near you!

#### Get Started

To get started **locally** you will need to do a couple of things.

1. Configure the Environment variables on both projects

backend - `.env`
```dotenv
# Server
PORT=3005
NODE_ENV=<development | production> 
BASE_PATH=/api/v1

# Production DB
MYSQL_DB_TYPE=mysql
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
MYSQL_DB_USERNAME=root
MYSQL_DB_PASSWORD=abc-123
MYSQL_DB_NAME=testdb
PRIVATE_LOCAL_IP=<YOUR_PRIVATE_LOCAL_IP>

# JWT
JWT_PRIVATE_KEY=5cf04a18b008aadfe5dbc9750df56621

#Map 
GASFEIN_TOKEN=5b3ce3597851110001cf6248a9793b825c994cb1860795dd9da21586
```

frontend - `app.json`
```json
{
  "expo": {
    [...],
    "extra": {
      "GASFEIN_TOKEN": "5b3ce3597851110001cf6248a9793b825c994cb1860795dd9da21586",
      "BACKEND_IP": "http://<YOUR_LOCAL_PRIVATE_IP>:<BACKEND_PORT>"
    },
    [...]
  }
}
```
2. Install, Build, Generate and Start the Backend

```bash
npm i --force
npm run build
npm run code-gen
npm run start
```

3. Install and Start the frontend

```bash
npm i --force
npm run start
```

4. Install Expo Go on your Phone and scan the QR Code

Enjoy ! 🫰

## Contributors

Thanks to these amazing contributors:

#### Technologies Used

<!-- readme: contributors -start --> 
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Raaphe">
            <img src="https://private-avatars.githubusercontent.com/u/120033739?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQ2MDQ2MjAsIm5iZiI6MTczNDYwMzQyMCwicGF0aCI6Ii91LzEyMDAzMzczOSJ9.DFOsyERf_MMKoA0V7vGFUCAHNS1mJyvCCcOsnOe8Ybc&v=4" width="100;" alt="Raaphe"/>
            <br />
            <sub><b>Raph</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/hasilon88">
            <img src="https://private-avatars.githubusercontent.com/u/109122423?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQ2MDUwNDAsIm5iZiI6MTczNDYwMzg0MCwicGF0aCI6Ii91LzEwOTEyMjQyMyJ9.aUh4TcEAtngdAeBCThzGgTN7-3reNhu8oDCZejRMXA4&v=4" width="100;" alt="hasilon88"/>
            <br />
            <sub><b>Harjot Singh</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Schn777">
            <img src="https://private-avatars.githubusercontent.com/u/113941848?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQ2MDQ2ODAsIm5iZiI6MTczNDYwMzQ4MCwicGF0aCI6Ii91LzExMzk0MTg0OCJ9.oib9M1kstS8Q2qvznKuJc4-iJ2bTF5P7CMYwNlMfLYM&v=4" width="100;" alt="Schn777"/>
            <br />
            <sub><b>Schn777</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->
