
pipeline {
    agent {
        docker {
            image 'oven/bun:1'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo Source code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'bun --version'
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Lint') {
            steps {
                sh 'bun run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'bun run test --passWithNoTests'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'bun run build'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'dist/**',
                             allowEmptyArchive: false
            echo 'Frontend build completed successfully'
        }

        failure {
            echo 'Build failed. Check Console Output.'
        }
    }
}
