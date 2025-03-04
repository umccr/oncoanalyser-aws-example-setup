# AWS Setup

A guide for creating a best practice AWS setup for laboratories using Oncoanalyser.

## Preparation

AWS requires a unique email address for each account created. These “root” email addresses should
be attached to mailing lists rather than any individual. Various messages about the status
of the accounts (“service has been automatically rebooted” etc) will be sent by AWS
to the email addresses, so it is best that the mailing list is an IT focussed administration list.

The very first account that is created (the “org” account) is special and should only
be associated with a mailing list of super users \- as it can be used to initiate a password
reset cycle of the super admin user.

Our walkthrough will assume emails
- user@company.com
- user+security@company.com

## Account Setup

| Click-ops | Control Tower | CDK | SST | Terraform |
| :---- | :---- | :---- | :---- | :---- |
| Doable in an hour or two. Can cover 100% of tasks. Less repeatable than other mechanisms but these are tasks that only really need to be done once per org. | The AWS preferred mechanism for setting up organisations. Will create a base organisation structure and audit/log accounts. Allows repeatable templating of workload accounts (for instance) so is good in that regard. Seems overly complex and requires a fair bit of planning as it will lock-down your setup. | AWS preferred technique for applications but struggles with some aspects of infrastructure (for instance, where installation of a service requires people to click on a link in an email \- it obviously has to wait for that).  | It can do more than the CDK option as it uses direct access to the service API instead of through CloudFormation. Perhaps should have the same problem of the wait-click email task. |  |

Application Setup

| CDK | SST |
| :---- | :---- |
| Preferred AWS technique for deploying applications. | \+ Faster deployment time \+ No stack-resource concept, managed resource as you like\+ More resource variety as it uses SDK API \- Rely on the SST framework to manage states (the main reason for not preferred due to relying on external parties) \- No self-hosted UI for resources deployed (SST provide service for this but requires to give them access) \- Less fancy component than CDK (e.g. the L3 construct, or `grantRead` function) |

AWS setup:

- Org  
- Security account  
- Workload  
- Gmail  
- SSO

Process:

(need a set of unique email addresses for administrator group)

**Documentation of Steps:**

### Create a new AWS account [https://signin.aws.amazon.com/signup?request\_type=register](https://signin.aws.amazon.com/signup?request_type=register)  

  * Specify a root email and username  
      ![](image1.png)  
  * Verify the email address  
      ![](image2.png)  
  * Create a password  
      ![](image3.png)  
  * Enter contact info  
      ![](image4.png)  
  * Enter card details  
    ![][image5]  
  * Add phone number  
    ![][image6]  
  * Confirm code  
    ![][image7]  
  * Complete sign up  
    ![][image8]  
  * Click “Go to the AWS Management Console”  
    ![][image9]  
* Once in the management console, initially an AWS organization should be set up, with some starting accounts. Once the base accounts are created, they should be used for everything, rather than the root account.  
* First, go to AWS Organizations in the search bar in the top left  
  * ![][image10]  
  * Click “Create an organization” on the right side  
  * ![][image11]  
  * Click “Add an AWS account”  
  * ![][image12]  
  * Create a “Management” account, with a new email address, and click “Create AWS account”. A new email should be used \- \+ aliases are convenient to send the mail to the same inbox.  
  * ![][image13]  
  * Repeat the steps for a “Security” and “Workload” account  
  * ![][image14]  
  * ![][image15]  
  * The organization should now have 4 accounts in total  
  * ![][image16]  
* After the accounts are created, go to the “IAM Identity Center” in the search bar to add users that are able to login using SSO. To separate concerns, and avoid using the root account for administrative actions. The management account will be delegated to perform general organizational admin tasks, and the security account will be delegated to perform admin tasks related to security. The workload account will be given permissions to perform tasks like creating applications or pipelines using CDK.

### 

### Guard Duty

1. Go to the ”GuardDuty” AWS service from the search bar and click on the “Enable” button.  
2. Delegate the security account to manage GuardDuty  
   1. On the left side bar click on “Settings”  
   2. On the “Delegate Administrator” box, enter the account number for the security account, then click on “Delegate” button

   ![][image17]

### Cloud Trail

1. Go to the ”Cloud Trail” AWS service from the search bar and click on the “Create a trail” button.  
2. Click on the Create trail button

### Security Hub

1. Go to the ”Security Hub” AWS service from the search bar and click on the “Go to Security Hub” button.  
2. Set the security hub standard to the following list:  
- Enable AWS Foundational Security Best Practices v1.0.0  
- Enable CIS AWS Foundations Benchmark v3.0.0  
3. Set the Delegate administrator to the security account number  
4. Click on the “Enable Security Hub” button

![][image18]

### 

### 

### IAM Identity Center

1. Go to the IAM Identity Center service by using the search bar on top of the page.  
     
   ![][image19]

2. Select the appropriate region (e.g. `ap-southeast-2` ) on the navigation bar on the top right of the page. Click on the “Enable” button in the region.  
3. ![][image20]

#### Create Groups

Create 3 groups to group users

- `admin`  
- `researcher`  
- `security`

	  
	Repeat the steps below until all groups described above are created.

1. On the left side bar select “Groups”  
2. Select “Create group”

   ![](image21.png)

3. Enter the Group name as described in the group name above  
4. Click on the “Create group” button at the bottom of the page

#### Create Permission Sets

Create 3 permission sets so that it could be delegated for each group

- `AdministratorAccess`  
- `PowerUserAccess`  
- `SecurityAudit`  
  Repeat the steps below until all permission sets described above are created.  
    
1. On the left side bar of the service, select the `Permission sets`![](image22.png)  
2. Click on the `Create permission set` button  
3. Follow the wizard prompt to create the permission set  
   1.  Step 1 \- Select permission set type  
      1. Select the `Predefined permission set` for the “Permission set type”  
      2. Select the permission set name that matches the one listed above

         

   2. Step 2 \- Specify permission set details  
      1. Extend the session duration in the permission set details to 12 hours ![](image23.png)  
   3. Step 3 \- Review and create  
      1. Click on the “Create” button

   

4. Assign the permission sets to the account

#### Assign permissions to accounts

	Assign groups and permissions to the respective account.

- Management  
  - Groups: `admin`,  
  - Permission sets: `AdministratorAccess`  
- Security  
  - Groups: `security`  
  - Permission sets: `SecurityAudit`  
- Workload  
  - Groups: `researcher`  
  - Permission sets:  `PowerUserAccess`

	Repeat the steps below for each AWS account.

1. On the left side bar select “AWS accounts”  
2. Select on the AWS Account mentioned in the list above  
3. Click on “Assign users or groups”  
4. Select the groups according to the respective account  
5. Select the Permission sets according to the respective account  
6. Click “Submit” to apply the configuration![](image24.png)

#### Delegate Management account

Delegate the management accounts

1. Click on “Settings” on the side bar  
2. Click the management tab  
3. Click on “Register account” in the “Delegated administrator” box  
4. Select the “management” account from the selection list  
5. Click on the “Register account” at the bottom of the page  
   ![](image25.png)

