# Jaipur Tourism Backend Run Script
# This script downloads a portable Maven and runs the Spring Boot application.

$MAVEN_VERSION = "3.9.6"
$MAVEN_DIR = "$PSScriptRoot\.maven"
$MAVEN_ZIP = "$PSScriptRoot\maven.zip"
$MAVEN_URL = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$MAVEN_VERSION/apache-maven-$MAVEN_VERSION-bin.zip"

if (-not (Test-Path "$MAVEN_DIR\apache-maven-$MAVEN_VERSION")) {
    echo "Downloading portable Maven $MAVEN_VERSION..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $MAVEN_URL -OutFile $MAVEN_ZIP
    
    echo "Extracting Maven..."
    Expand-Archive -Path $MAVEN_ZIP -DestinationPath $MAVEN_DIR
    Remove-Item $MAVEN_ZIP
}

echo "Starting Spring Boot Application..."
& "$MAVEN_DIR\apache-maven-$MAVEN_VERSION\bin\mvn.cmd" spring-boot:run
