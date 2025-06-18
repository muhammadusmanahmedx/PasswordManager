version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: shop-sphere-jenkins_web:latest
    ports:
      - "5100:3000"
    env_file:
      - .env
    environment:
      NODE_ENV: production

  selenium:
    image: seleniarm/standalone-chromium:latest
    ports:
      - "4444:4444"
    shm_size: 2g
    environment:
      - SE_NODE_MAX_SESSIONS=1
      - SE_NODE_OVERRIDE_MAX_SESSIONS=true
