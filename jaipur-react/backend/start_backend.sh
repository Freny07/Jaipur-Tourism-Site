#!/bin/bash
# Load environment variables from .env safely (handles spaces in values like Gmail app passwords)
if [ -f .env ]; then
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ $key =~ ^#.*$ || -z $key ]] && continue
        export "$key=$value"
    done < .env
fi

# Kill any existing instance
pkill -f 'backend-0.0.1-SNAPSHOT.jar' 2>/dev/null || true
sleep 2

# Run the JAR in the background
nohup java -Dserver.port=8080 \
  -Dserver.forward-headers-strategy=native \
  "-Dspring.datasource.url=jdbc:mysql://localhost:3306/jaipur_tourism?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true" \
  -Dspring.datasource.username=root \
  "-Dspring.datasource.password=$DB_PASSWORD" \
  "-Dspring.mail.username=$MAIL_USERNAME" \
  "-Dspring.mail.password=$MAIL_APP_PASSWORD" \
  "-Dgemini.api.key=$GEMINI_API_KEY" \
  "-Dspring.security.oauth2.client.registration.google.client-id=$GOOGLE_CLIENT_ID" \
  "-Dspring.security.oauth2.client.registration.google.client-secret=$GOOGLE_CLIENT_SECRET" \
  "-Dspring.security.oauth2.client.registration.google.redirect-uri=http://35.154.74.197.nip.io/login/oauth2/code/google" \
  "-Dapp.frontend.url=$FRONTEND_URL" \
  -jar backend-0.0.1-SNAPSHOT.jar > backend.log 2>&1 &

echo "Backend started with PID $!"
