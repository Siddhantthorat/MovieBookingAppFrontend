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
5. You can give any domain name you required, in my case I have given moviebookingapp-> while creating environment
6. Application code Info -> you can select sample code(upload .jar later) or upload the file prior.
7. Presets Info ->Single instance (free tier eligible)
8. If you are facing  error you're  indicates that the instance profile (which provides permissions for your EC2 instances in Elastic Beanstalk) is missing or not correctly set up. The instance profile aws-elasticbeanstalk-ec2-role is required to allow the EC2 instances to access AWS services like S3, CloudWatch, etc.
Here’s how to fix the issue by creating or attaching the necessary instance profile.
### Step-by-Step Fix
    1. Check if the Instance Profile Exists
    First, confirm whether the instance profile aws-elasticbeanstalk-ec2-role exists in your AWS account.
    
    Go to the IAM Console:
    
    Open the AWS IAM Console.
    In the left-hand menu, click Roles.
    Search for aws-elasticbeanstalk-ec2-role:
    
    If it exists, skip to Step 3 to associate it with your Elastic Beanstalk environment.
    2. Create the Instance Profile if It Doesn’t Exist
    If the aws-elasticbeanstalk-ec2-role doesn’t exist, you'll need to create it.
    
   ### Go to the IAM Console:
    
    Navigate to Roles from the left-hand menu.
    Create a New Role:
    
   ### Click Create Role.
    Select Trusted Entity:
    
    Under "Trusted entity type," select AWS Service.
    Choose EC2 as the service that will use this role.
    Attach Policies:
    
    Select the policy named AWSElasticBeanstalkWebTier and AWSElasticBeanstalkMulticontainerDocker (depending on your application type).
    Optionally, you can also add AmazonS3FullAccess or other policies if your application needs access to S3 or other AWS services.
    Role Name:
    
    Name the role aws-elasticbeanstalk-ec2-role.
    Create the Role:
    
 ###   Click Create Role to finalize the process.
    3. Attach the Instance Profile to the Elastic Beanstalk Environment
    Once the instance profile exists, you need to associate it with your Elastic Beanstalk environment.
    
    Go to the Elastic Beanstalk Console:
    
    Open the Elastic Beanstalk Console.
    Open Your Environment:
    
    Select the environment where you encountered the error.
    Update Configuration:
    
    Navigate to the Configuration tab.
    Under the Security section, click Modify.
    Assign the Role:
    
    In the EC2 instance profile dropdown, select the aws-elasticbeanstalk-ec2-role.
    Apply Changes:
    
    Save and apply the changes.
        
    4. Relaunch the Environment
    After associating the correct instance profile, try launching your environment again.
  NOTE: select role,select the key pairs if you have click on next
9. Set up networking, database, and tags: select proper vpc or create one , which consist of public access,make sure subnet should be public  .Let the rest setting be default.select the instsnce subnet and databse subnet that is public ,or you can create your own.
10.EC2 security groups -> select the public group name wizard that you have created , or you can take the default rest details are default.
11.Health reporting ->Basic , Managed updates ->uncheck this, rest is same , 
  ### In Environment properties
    -  Add the following key-value pair:
      Key: SPRING_DATA_MONGODB_URI
      Value: mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
    -  Key: PORT
      Value: 8081 (It enables my springboot application port to execute ,else it will take 5000 port number)

      review.
12. Once the env is running , upload and deploy your .jar file
13. Select your jar from target folder and give versioin as per your choice  like i have given moviebookingapp v1.0 upload once uploaded check the health is green 
14. now check it with the url  http://moviebookingapp.us-east-1.elasticbeanstalk.com/ -If it is working than good.
Note:
 Under *Application code*, upload your Spring Boot JAR file.
 To create .jar cmd->mvn clean install -DskipTests

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
### 2. Deploy Angular Frontend to S3
Step 1: Build the Angular Application
Before uploading the Angular application, ensure it is built for production:

    ng build --prod
This command creates a dist/ folder with the production-ready files.

Step 2: Create an S3 Bucket for Hosting
  Go to the AWS S3 Console.
  Click Create bucket.
  Name the bucket and ensure it has public access.
  Disable Block all public access.
Step 3: Upload Files to S3
  Upload the contents of the dist/ folder (from the Angular build) to your S3 bucket.
  Make sure all the files have public read permissions.
Step 4: Set Bucket Policy for Public Access
Add a bucket policy to allow public access to the contents:

```
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
}```

Replace YOUR_BUCKET_NAME with the actual name of your S3 bucket.

Step 5: Enable Static Website Hosting
  Go to the Properties tab of your S3 bucket.
  Scroll down to Static website hosting.
  Enable the option Use this bucket to host a website.
  Set index.html as the index document and optionally set an error document (e.g., 404.html).
Step 6: CORS Configuration (If Needed)
If your Angular app makes API calls to different domains, configure CORS in the S3 bucket:

xml
```
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>```
