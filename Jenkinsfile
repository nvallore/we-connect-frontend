pipeline {
  agent any
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage('SonarQube analysis') {
      steps {
        script {
          scannerHome = tool 'sonarqube'
        }
        withSonarQubeEnv(installationName: 'sonarqube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Build artifacts') {
      steps {
        sh 'mkdir -p test-reports'
        sh 'npm install --force'
        sh 'npm run build'
      }
    }
    stage('Unit test') {
      steps {
        sh 'npm run unit-test'
        sh 'echo Unit-Test'
      }
    }
    stage('Integration test') {
      steps {
        sh 'npm run integration-test'
        // sh 'npm run generate-report'
        sh 'echo Integration-Test'
      }
    }
    stage('Deploy to staging') {
      steps {
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/we-connect-frontend/*'
        sh 'scp -r build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-staging/webapps/we-connect-frontend/'
      }
    }
        stage('Deploy to production') {
      steps {
        input message: 'Push to prod? (Click "Proceed" to continue)'
        sh 'rm -rf /Users/ashank661/Desktop/apache-tomcat-10.0.22-production/webapps/we-connect-frontend/*'
        sh 'scp -r build/* /Users/ashank661/Desktop/apache-tomcat-10.0.22-production/webapps/we-connect-frontend/'
      }
    }
  }
}
