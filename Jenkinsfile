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
          writeFile file: ".env", text: """
            MONGODB_URI=$MONGODB_URI
            JWT_SECRET=$JWT_SECRET
          """
        }
      }
    }

    stage('Clean up') {
      steps {
        sh '''
          docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE down --volumes || true
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
        sh 'docker-compose -p $COMPOSE_PROJECT_NAME -f $COMPOSE_FILE up -d'
      }
    }

    // 🧪 Clone the test repo
    stage('Clone Test Repo') {
      steps {
        dir('tests') {
          git url: 'https://github.com/muhammadusmanahmedx/testPassManager.git' // 🔁 update this
        }
      }
    }

    // 🧪 Install Chrome, Chromedriver & Selenium
    stage('Install Test Dependencies') {
      steps {
        sh '''
          sudo apt update
          sudo apt install -y python3-pip chromium-browser chromium-chromedriver
          pip3 install -r tests/requirements.txt
        '''
      }
    }

    // 🧪 Run the Python Selenium test cases
    stage('Run Selenium Tests') {
      steps {
        sh 'python3 tests/test_app.py'
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline finished.'
    }
    success {
      mail to: 'your-email@example.com',
           subject: "✅ Tests Passed - ${env.JOB_NAME}",
           body: "All test cases passed successfully!"
    }
    failure {
      mail to: 'your-email@example.com',
           subject: "❌ Tests Failed - ${env.JOB_NAME}",
           body: "Some test cases failed. Please check Jenkins logs for details."
    }
  }
}
