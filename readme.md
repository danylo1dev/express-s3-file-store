# AWS S3 with Express

This application is built using Express and utilizes AWS S3. It stores images on Amazon servers, which is now the standard for most modern applications.

## Motivation

I created this application because S3 and AWS are influential and important services in the modern internet. Storing files in S3 is the standard, so I wanted to learn and master its integration.

## What I was learn

I have learned how to use and configure AWS S3 in Express, and how to interact with the frontend.

---

# Installing

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/danylo1dev/express-s3-file-store.git
   ```

2. Install all dependencies:

   ```bash
   npm ci
   ```

## Environment Configuration

The repository includes an `.env.example` file. You should create the following environment files:

- `.env`: Default environment for new scripts

You can use the `.env.example` file as a template.

## Running the Application

To run the application, use the following commands:

- **Development**:

  ```bash
  npm run start:dev
  ```

- **Production**:

  ```bash
  npm run start
  ```

Once the application is running, you can access it via `http://localhost:3000/`.
