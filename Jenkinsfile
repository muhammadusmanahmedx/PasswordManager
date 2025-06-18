pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = 'shop-sphere-jenkins'
    COMPOSE_FILE = 'docker-compose.yaml'
  }

  stages {
    stage('Clone Main App Repo') {
      steps {
        git url: 'https://github.com/muhammadusmanahmedx/PasswordManager.git', branch: 'main'
      }
    }

    stage('Inject Environment Variables') {
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
          docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE down --volumes || true
          docker system prune -af || true
          docker volume prune -f || true
        '''
      }
    }

    stage('Build App') {
      steps {
        sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE build --no-cache'
      }
    }

    stage('Deploy App') {
      steps {
        sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up -d'
      }
    }

    stage('Clone Test Repo') {
      steps {
        dir('test-code') {
          git url: 'https://github.com/muhammadusmanahmedx/testPassManager.git', branch: 'main'
        }
      }
    }

    stage('Run Selenium Tests in Docker') {
      steps {
        sh """
          docker pull your-dockerhub-username/selenium-chrome-python:latest
          docker run --rm \
            -u root \
            -v ${WORKSPACE}/test-code:/tests \
            -w /tests \
            your-dockerhub-username/selenium-chrome-python:latest \
            bash -c "pip install -r requirements.txt && python3 test_app.py"
        """
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline completed!'
    }
  }
}
