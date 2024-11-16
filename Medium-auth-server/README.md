# Medium-backend-server serverless  (Hosted on AWS ServerLess Lambda)
The Medium-auth-server project, created with [`aws-serverless-java-container`](https://github.com/aws/serverless-java-container).


The project folder also includes a `template.yml` file. You can use this [SAM](https://github.com/awslabs/serverless-application-model) file to deploy the project to AWS Lambda and Amazon API Gateway or test in local with the [SAM CLI](https://github.com/awslabs/aws-sam-cli). 

# Concepts / Frameworks / Library used in backend :
* # Input Validation:
    * Jakarta Validation with custom Exception Handling with Controller Advisors 
* # Authentication:
    * Once the inputs has been validated positively next comes the authentication bit  
    * Spring Security has been used to configure authentication across the routes 
    * Custom Filters (using filter class (OncePerRequestFilter)) to check if the jwtToken has been sent along with the blacklisted apis and then checking the authentication with authentication manager using authManager and  DaoAuthenticationProvider
    * [`io.jsonwebtoken`] library used for creating jwtTokens with custom claims
*  # Database Design for [`users`,`blogs`,`likes`,`comments`]
    *  Users -> One to Many with Blogs 
    *  Users -> One to Many with Likes
    *  Users -> One to Many with Comments
    *  Blogs -> One to many with Likes
    *  Blogs -> One to Many with comments


# Concepts / Frameworks / Library used in frontend :
* # React
* # For routing : React Router DOM
* # State Management : Recoil State Management