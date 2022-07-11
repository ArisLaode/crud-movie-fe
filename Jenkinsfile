pipeline {
    agent { label 'central_logging_slave' }
    stages {
         stage("Setup Config Frontend") {
            steps {
               sh 'cp $configFrontend $configFrontendNew'
               sh 'cat $configFrontendNew'
            }
         }
        stage('Build Frontend with docker') {
            steps {
               sh 'docker stop fe_central_log'
               sh 'docker rm fe_central_log'
               sh 'docker rmi fe_central_logging'
               sh 'docker build --tag fe_central_logging .'
               sh 'docker run -d -p 3005:3000 --name fe_central_log fe_central_logging'
            }
        }
    }
}