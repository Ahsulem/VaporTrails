pipeline {
    agent any

    environment {
        APP_IMAGE = 'vaportrails-app'
        SELENIUM_IMAGE = 'vaportrails-selenium'
        APP_PORT = '3000'
        CONTAINER_NAME = 'vaportrails-container'
    }

    stages {

        // ─────────────────────────────────────────
        // STAGE 1: CODE BUILD
        // ─────────────────────────────────────────
        stage('Code Build') {
            steps {
                echo '>>> Building VaporTrails Next.js App...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
                sh 'npm run build'
                echo '>>> Build successful!'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 2: UNIT TESTING
        // ─────────────────────────────────────────
        stage('Unit Testing') {
            steps {
                echo '>>> Running Unit Tests...'
                sh 'npm test -- --watchAll=false --passWithNoTests'
                echo '>>> Unit Tests passed!'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 3: CONTAINERIZED DEPLOYMENT
        // ─────────────────────────────────────────
        stage('Containerized Deployment') {
            steps {
                echo '>>> Building Docker image for VaporTrails...'

                // Stop and remove any existing container
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''

                // Build the app Docker image
                sh 'docker build -t ${APP_IMAGE} -f Dockerfile.app .'

                // Run the container
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        --env-file .env.local \
                        ${APP_IMAGE}
                '''

                // Wait for app to be ready
                sh 'sleep 10'

                echo '>>> App deployed in container on port ${APP_PORT}!'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 4: CONTAINERIZED SELENIUM TESTING
        // ─────────────────────────────────────────
        stage('Containerized Selenium Testing') {
            steps {
                echo '>>> Building Selenium Docker image...'
                sh 'docker build -t ${SELENIUM_IMAGE} -f Dockerfile.selenium .'

                echo '>>> Running Selenium tests in container...'
                sh '''
                    docker run --rm \
                        --network host \
                        -e APP_URL=http://localhost:${APP_PORT} \
                        ${SELENIUM_IMAGE}
                '''
                echo '>>> Selenium tests passed!'
            }
        }
    }

    post {
        always {
            echo '>>> Pipeline finished. Cleaning up...'
            sh 'docker stop ${CONTAINER_NAME} || true'
            sh 'docker rm ${CONTAINER_NAME} || true'
        }
        success {
            echo '>>> ✅ All stages passed successfully!'
        }
        failure {
            echo '>>> ❌ Pipeline failed. Check logs above.'
            sh 'docker stop ${CONTAINER_NAME} || true'
            sh 'docker rm ${CONTAINER_NAME} || true'
        }
    }
}
