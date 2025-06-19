pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = 'shop-sphere-jenkins'
    COMPOSE_FILE = 'docker-compose.yaml'
  }

  stages {
    stage('Clone App Repo') {
      steps {
        git url: 'https://github.com/muhammadusmanahmedx/PasswordManager.git', branch: 'main'
      }
    }

    stage('Inject Credentials') {
      environment {
        MONGODB_URI = credentials('MONGODB_URI')
        JWT_SECRET = credentials('JWT_SECRET')
      }
      steps {
        script {
          writeFile file: ".env", text: """MONGODB_URI=${env.MONGODB_URI}
JWT_SECRET=${env.JWT_SECRET}"""
        }
      }
    }

    stage('Clean up') {
      steps {
        sh '''
          docker rm -f shop-sphere-jenkins-web-1 || true
          docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE down --volumes --remove-orphans || true
          docker system prune -af || true
          docker volume prune -f || true
        '''
      }
    }

    stage('Build') {
      steps {
        sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE build --no-cache'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker rm -f shop-sphere-jenkins-web-1 || true
          docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up -d --remove-orphans
        '''
      }
    }

    stage('Clone Test Repo') {
      steps {
        dir('tests') {
          git url: 'https://github.com/muhammadusmanahmedx/testPassManager.git', branch: 'main'
        }
      }
    }

    stage('Run Selenium Tests in Docker') {
      steps {
        sh '''
          docker run --rm \
            -v ${WORKSPACE}/tests:/tests \
            -w /tests \
            selenium/standalone-chrome:latest \
            bash -c "apt-get update && apt-get install -y python3-pip && pip3 install -r requirements.txt && python3 test_app.py"
        '''
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline completed!'
    }
  }
}
