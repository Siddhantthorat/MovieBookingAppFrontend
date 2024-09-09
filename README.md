# Spring Boot & Angular Deployment

This repository contains a *Spring Boot* backend application and an *Angular* frontend. The Spring Boot application is deployed on *AWS Elastic Beanstalk, and the Angular frontend is deployed to **AWS S3. The backend also connects to **MongoDB Atlas* for database storage.

---

## Prerequisites

Before starting the deployment, ensure you have the following:

- AWS account
- MongoDB Atlas account
- AWS CLI configured
- EC2 key pairs (for Elastic Beanstalk)
- Angular application built and ready for deployment

---

## Deployment Steps

### 1. Deploy Spring Boot Backend to AWS Elastic Beanstalk

#### Step 1: Create an Elastic Beanstalk Environment

1. Go to the *AWS Elastic Beanstalk Console*.
2. Click *Create a new environment*.
3. Choose *Web Server Environment*.
4. In the *Platform* section:
   - Choose *Java* and select *Java 17*. you can choose coretto 17
5. You can give any domain name you required, in my case I have given moviebookingapp
6.  change the bucket policy as below and write your arn{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::moviebookingapp-s3bucket/*"
        }
    ]
}
7.
8.  Under *Application code*, upload your Spring Boot JAR file.
9. . To create .jar cmd->mvn clean install -DskipTests

#### Step 2: Configure EC2 and Networking

1. *Instance Settings*:
   - Select an *EC2 key pair* that you have already created.
2. *VPC & Subnet*:
   - Ensure the subnet is public to allow external access to the environment.
3. *Security Groups*:
   - Allow inbound traffic on *port 5000* or *port 8080* based on your configuration.

#### Step 3: Configure MongoDB Atlas Connection

1. After the environment is created, go to *Configuration* in the Elastic Beanstalk environment.
2. Under *Software, click **Modify*.
3. In the *Environment Properties* section, add the following:

   ```properties
   Key: SPRING_DATA_MONGODB_URI
   Value: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
