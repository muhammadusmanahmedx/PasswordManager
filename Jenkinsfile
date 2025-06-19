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
          docker image rm shop-sphere-jenkins_web:latest || true
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
        sh """
          docker run --rm \
            -v \${WORKSPACE}/tests:/tests \
            -w /tests \
            --network=host \
            python:3.10-slim \
            bash -c "apt-get update && \
                     apt-get install -y wget unzip gnupg && \
                     wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
                     echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
                     apt-get update && \
                     apt-get install -y google-chrome-stable && \
                     wget https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/130.0.6723.69/linux64/chromedriver-linux64.zip && \
                     unzip chromedriver-linux64.zip && \
                     mv chromedriver-linux64/chromedriver /usr/local/bin/ && \
                     chmod +x /usr/local/bin/chromedriver && \
                     pip install -r requirements.txt && \
                     python3 test_app.py > test_output.log 2>&1 || (cat test_output.log && exit 1)"
        """
        archiveArtifacts artifacts: 'tests/test_output.log', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline completed!'
    }
  }
}
