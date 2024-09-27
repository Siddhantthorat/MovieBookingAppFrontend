Here is a well-formatted version of your file that can be uploaded as a GitHub README file:

# Movie Booking Application

Movie Booking App is an application that allows users to register, login, and search for released movies. Users can book tickets for the movies they wish to see. Admins can view the booked tickets and update the available tickets in the system. Guest users cannot book any tickets.

## Core Modules

1. **User Registration and Login**: Allows users to register and securely log in.
2. **Browse Movies and Theaters**: View released movies and available theaters.
3. **Book Tickets**: Users can book tickets for their desired movies.
4. **Admin Updates**: Admins can update the available ticket status based on the tickets booked.

---

# Spring Boot & Angular Deployment

This repository contains a **Spring Boot** backend and an **Angular** frontend. The backend is deployed on **AWS Elastic Beanstalk**, the frontend is deployed on **AWS S3**, and the application uses **MongoDB Atlas** for database storage.

---

## Prerequisites

Before starting the deployment, ensure you have the following:

- AWS account
- MongoDB Atlas account
- AWS CLI configured
- EC2 key pairs (for Elastic Beanstalk)
- Built Angular application ready for deployment

---

## Deployment Steps

### 1. Deploy Spring Boot Backend to AWS Elastic Beanstalk

#### Step 1: Create an Elastic Beanstalk Environment

1. Go to the **AWS Elastic Beanstalk Console**.
2. Click **Create a new environment**.
3. Choose **Web Server Environment**.
4. In the **Platform** section:
   - Choose **Java** and select **Java 17 (Corretto)**.
5. Set a domain name (e.g., `moviebookingapp`) during environment creation.
6. Application code info: Upload sample code or select the option to upload your `.jar` file later.
7. Select **Single instance** (free-tier eligible).
8. If you face an error related to the instance profile, follow these steps:
    1. Check if the instance profile `aws-elasticbeanstalk-ec2-role` exists under **IAM Roles**.
    2. If missing, create a new role with the required policies: `AWSElasticBeanstalkWebTier` and `AmazonS3FullAccess`.
    3. Assign the role to your Elastic Beanstalk environment.
9. Set up networking (ensure public access), select EC2 security groups, and set **Health Reporting** to **Basic**.
10. In **Environment Properties**, add:
    - `SPRING_DATA_MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>`
    - `PORT`: `8081` (to set the application port).

11. Once the environment is running, upload and deploy your `.jar` file.

12. After successful deployment, access your application using the environment URL, e.g., `http://moviebookingapp.us-east-1.elasticbeanstalk.com`.

#### Step 2: Configure EC2 and Networking

1. **Instance Settings**:
   - Select an **EC2 key pair** that you have already created.
2. **VPC & Subnet**:
   - Ensure the subnet is public to allow external access.
3. **Security Groups**:
   - Allow inbound traffic on **port 8081**.

#### Step 3: Configure MongoDB Atlas Connection

1. After the environment is created, go to **Configuration** in the Elastic Beanstalk environment.
2. Under **Software**, click **Modify**.
3. In **Environment Properties**, add:

   ```properties
   SPRING_DATA_MONGODB_URI: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
   PORT: 8081
   ```

### 2. Deploy Angular Frontend to AWS S3

#### Step 1: Build the Angular Application

Ensure the Elastic Beanstalk URL is correctly set in your Angular service.

Run the following command to build the Angular app:

```bash
ng build --prod
```

This command creates a `dist/` folder with the production-ready files.

#### Step 2: Create an S3 Bucket for Hosting

1. Go to the **AWS S3 Console**.
2. Click **Create Bucket**.
3. Name the bucket and ensure **public access** is enabled.
4. Disable **Block all public access**.

#### Step 3: Upload Files to S3

1. Upload the contents of the `dist/` folder (from the Angular build) to your S3 bucket.
2. Ensure all the files have **public read permissions**.

#### Step 4: Set Bucket Policy for Public Access

Add the following bucket policy to allow public access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

Replace `YOUR_BUCKET_NAME` with the actual name of your S3 bucket.

#### Step 5: Enable Static Website Hosting

1. Go to the **Properties** tab of your S3 bucket.
2. Scroll down to **Static Website Hosting**.
3. Enable the option and set `index.html` as the index document.
4. Optionally, set an error document like `404.html`.

#### Step 6: CORS Configuration (If Needed)

If your Angular app makes API calls to different domains, configure **CORS** in the S3 bucket:

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration> 
```

---

## Docker Configuration

To deploy the Spring Boot app using Docker:

1. **Build the JAR** file:
   ```bash
   mvn clean install -DskipTests
   ```
2. **Create Dockerfile** in your project root:
   ```dockerfile
   FROM openjdk:17-jdk-alpine
   COPY target/moviebookingapp.jar moviebookingapp.jar
   ENTRYPOINT ["java", "-jar", "moviebookingapp.jar"]
   ```
3. **Build Docker Image**:
   ```bash
   docker build -t moviebookingapp-image:m1 .
   ```
4. **Run the Docker Container**:
   ```bash
   docker run --name moviebookingapp-container -dp 8082:8081 moviebookingapp-image:m1
   ```

To connect MongoDB with Docker:

1. **Pull MongoDB Image**:
   ```bash
   docker pull mongo
   ```
2. **Run MongoDB Container**:
   ```bash
   docker run -d --name mongodb-container -p 27017:27017 mongo
   ```

## Conclusion

This guide walks you through the deployment of a Movie Booking App with Spring Boot and Angular, using AWS Elastic Beanstalk, S3, MongoDB Atlas, and Docker. The backend handles movie management and booking functionality, while the frontend interacts via API endpoints.
