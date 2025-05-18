pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = 'shop-sphere-jenkins'
    COMPOSE_FILE = 'docker-compose.yaml'
    MONGODB_URI = credentials('MONGODB_URI')
    JWT_SECRET = credentials('JWT_SECRET')
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
      }
    }

    stage('Build & Deploy') {
      steps {
        sh '''
        export MONGODB_URI=$MONGODB_URI
        export JWT_SECRET=$JWT_SECRET
        docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE build
        docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up -d
        '''
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
