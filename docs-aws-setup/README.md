# AWS Setup

A guide for creating a best practice AWS setup for laboratories using Oncoanalyser.

## Preparation

AWS requires a unique email address for each account created. These “root” email addresses should be attached to mailing
lists rather than any individual. Various messages about the status of the accounts (“service has been automatically
rebooted” etc) will be sent by AWS to the email addresses, so it is best that the mailing list is an IT focussed
administration list.

The very first account that is created (the “org” account) is special and should only be associated with a mailing list
of super users \- as it can be used to initiate a password reset cycle of the super admin user.

Our walkthrough will assume the following emails:

-   company+aws.org@gmail.com
-   company+aws.security@gmail.com
-   company+aws.management@gmail.com
-   company+aws.workload@gmail.com

Here we are using the "plus-addressing" feature of `gmail` to create unique emails all associated with a single mailing
address.

## Account Setup

For AWS account setup, we considered the following options:

| Click-ops                                                                                                                                                   | Control Tower                                                                                                                                                                                                                                                                                                     | CDK                                                                                                                                                                                                                             | SST                                                                                                                                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Doable in an hour or two. Can cover 100% of tasks. Less repeatable than other mechanisms but these are tasks that only really need to be done once per org. | The AWS preferred mechanism for setting up organisations. Will create a base organisation structure and audit/log accounts. Allows repeatable templating of workload accounts (for instance) so is good in that regard. Seems overly complex and requires a fair bit of planning as it will lock-down your setup. | AWS preferred technique for applications but struggles with some aspects of infrastructure (for instance, where installation of a service requires people to click on a link in an email \- it obviously has to wait for that). | It can do more than the CDK option as it uses direct access to the service API instead of through CloudFormation. Perhaps should have the same problem of the wait-click email task. |

And for the application setup (i.e. oncoanalyser itself) we considered:

| CDK                                                 | SST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preferred AWS technique for deploying applications. | **Pros:**<br/> Faster deployment time<br/>No stack-resource concept, managed resource as you like<br/>More resource variety as it uses SDK API<br/>**Cons:**<br/> Rely on the SST framework to manage states (the main reason for not preferred due to relying on external parties)<br/> No self-hosted UI for resources deployed (SST provide service for this but requires to give them access)<br/>Less fancy component than CDK (e.g. the L3 construct, or `grantRead` function) |

For the AWS account setup this guide will walkthrough a ClickOps process, as it is the most straightforward way to
create an AWS organization and it only needs to be performed once. For oncoanalyser itself we recommend using CDK, as it
is the AWS-recommended way to setup workloads and applications.

The AWS account setup involves creating an AWS Organization with multiple accounts for different purposes, SSO and
security. The steps below guide through the process.

**Documentation of Steps:**

1. [Create starting account](sign-up-steps.md)
2. [Create organisation](aws-orgs-steps.md)
3. [Setup SSO](iam-steps.md)
4. [Enable CloudTrail logs](cloudtrail-steps.md)
5. [Enable GuardDuty](guardduty-steps.md)
6. [Enable SecurityHub](securityhub-steps.md)
7. [Enable AccessAnalyzer](accessanalyzer-steps.md)

After completing the steps, the accounts should be ready to use.
