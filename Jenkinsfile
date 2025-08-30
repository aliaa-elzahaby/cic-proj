pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'aliaaahmed432'
        IMAGE_NAME = 'k8s-web-server-cic'
    }

    triggers {
        githubPush()   // runs automatically on GitHub push
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aliaa-elzahaby/cic-proj.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USERNAME',
                                                 passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:latest'
            }
        }
    }

    post {
        success {
            emailext (
                to: 'aliaa.amohamed203@gmail.com',
                subject: "✅ Jenkins Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Good news! The build for ${env.JOB_NAME} #${env.BUILD_NUMBER} succeeded.\nCheck details: ${env.BUILD_URL}"
            )
        }
        failure {
            emailext (
                to: 'aliaa.amohamed203@gmail.com',
                subject: "❌ Jenkins Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Oops! The build for ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\nCheck details: ${env.BUILD_URL}"
            )
        }
    }
}
