pipeline {
    agent { label 'movie_app_slave' }
    stages {
         stage("Setup Config Frontend") {
            steps {
               sh 'cp $configFrontend $configFrontendNew'
               sh 'cat $configFrontendNew'
            }
         }
        stage('Build Frontend with docker') {
            steps {
               sh 'docker stop movie_app'
               sh 'docker rm movie_app'
               sh 'docker rmi fe_movie_app'
               sh 'docker build --tag fe_movie_app .'
               sh 'docker run -d -p 3005:3000 --name movie_app fe_movie_app'
            }
        }
    }
}