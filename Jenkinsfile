pipeline {
    agent any

    environment {
        IMAGE_NAME = '3-tier-app'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    docker run --rm \
                      --user "$(id -u):$(id -g)" \
                      -e HOME=/tmp \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      oven/bun:1 \
                      bun install --frozen-lockfile
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    docker run --rm \
                      --user "$(id -u):$(id -g)" \
                      -e HOME=/tmp \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      oven/bun:1 \
                      bun run lint
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    docker run --rm \
                      --user "$(id -u):$(id -g)" \
                      -e HOME=/tmp \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      oven/bun:1 \
                      bun run test --passWithNoTests
                '''
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                    docker run --rm \
                      --user "$(id -u):$(id -g)" \
                      -e HOME=/tmp \
                      -e NITRO_PRESET=node-server \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      oven/bun:1 \
                      bun run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                      -t ${IMAGE_NAME}:latest .
                '''
            }
        }
        
    }

    post {
        success {
            echo 'SUCCESS: Application built and deployed to Kubernetes!'
            archiveArtifacts artifacts: '.output/**', allowEmptyArchive: true
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output.'
        }
    }
}
