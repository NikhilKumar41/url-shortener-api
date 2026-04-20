pipeline {
    agent any

environment {
    MONGO_URI = "mongodb://localhost:27017/urlShortener"
}

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Security Check') {
            steps {
                echo 'Checking vulnerabilities...'
                bat 'npm audit'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t url-shortener .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                bat '''
                docker stop url-container || exit 0
                docker rm url-container || exit 0
                docker run -d -p 3000:3000 ^
                -e MONGO_URI=%MONGO_URI% ^
                --name url-container ^
                url-shortener
                '''
            }
        }

        stage('Monitoring Check') {
            steps {
                echo 'Checking health endpoint...'
                bat 'curl http://localhost:3000/health'
            }
        }
    }
}