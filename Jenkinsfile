#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                script {
                    echo 'Initial stage'
                }
            }
        }
        stage('Build stage') {
            steps {
                script {
                    sh 'docker build -f Dockerfile-prod -t ramon101/my-repo:wtch-twr_frntnd .'
                }
            }
        }
        stage('Push to docker hub'){
            steps {
                script {
                    sh 'docker push ramon101/my-repo:wtch-twr_frntnd'
                }
            }
        }
        stage('Deploy image'){
            steps {
                script {
                    echo 'deploying to production..'
                    sh "ssh b_one@38.105.209.235 /home/b_one/sites/watchtower-frontend-deploy"

                }
            }
        }
    }
}