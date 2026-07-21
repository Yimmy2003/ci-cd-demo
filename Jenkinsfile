pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "ci-cd-demo:${env.BUILD_NUMBER}"
                    sh "docker build -t ${imageTag} ."
                    sh "docker tag ${imageTag} ci-cd-demo:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker stop ci-cd-demo || true'
                    sh 'docker rm ci-cd-demo || true'
                    sh 'docker run -d --name ci-cd-demo -p 3000:3000 ci-cd-demo:latest'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker image prune -f'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado exitosamente'
        }
        failure {
            echo 'Falló la ejecución del pipeline'
        }
    }
}
