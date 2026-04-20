pipeline {
    agent any

    environment {
        // MongoDB connection for Docker container
        MONGO_URI = "mongodb://host.docker.internal:27017/urlShortener"
    }

    stages {

        // =========================
        // CHECKOUT CODE
        // =========================
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        // =========================
        // BUILD (INSTALL DEPENDENCIES)
        // =========================
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        // =========================
        // TEST
        // =========================
        stage('Test') 
        {
            steps {
                echo 'Skipping tests for now...'
                }
        }

        // =========================
        // DOCKER BUILD
        // =========================
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t url-shortener .'
            }
        }

        // =========================
        // DEPLOY
        // =========================
        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                bat '''
                docker stop url-container 2>nul
                docker rm url-container 2>nul
                docker run -d -p 3000:3000 ^
                -e MONGO_URI=%MONGO_URI% ^
                --name url-container ^
                url-shortener
                '''
            }
        }

        // =========================
        // MONITORING
        // =========================
        stage('Monitoring Check') {
            steps {
                echo 'Checking health endpoint...'
                bat '''
                timeout /t 5
                curl http://localhost:3000/health
                '''
            }
        }
    }

    // =========================
    // POST ACTIONS
    // =========================
    post {
        success {
            echo 'Pipeline completed successfully '
        }
        failure {
            echo 'Pipeline failed '
        }
    }
}