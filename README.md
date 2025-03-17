# Threat Modeling Tool Single Page App (SPA) [![Terraform Deploy](https://github.com/zyusuf88/threat-composer/actions/workflows/terrafrom-deploy.yml/badge.svg)](https://github.com/zyusuf88/threat-composer/actions/workflows/terrafrom-deploy.yml)

This project delivers a **complete** CI/CD pipeline that revolutionises how you deploy containerised applications to AWS ECS. Built with **modularity** and **reusability** at its core, it streamlines the entire deployment lifecycle with **repeatable** workflow.

### The best part...
 The infrastructure provides a truly end-to-end solution with secure HTTPS, ALB, Target Groups, ECS Services and all necessary networking components in the terraform code meaning you can deploy virtually any containerised application through this pipeline without modifying the underlying code—just change the Docker image and everything else adapts automatically.

![image](https://github.com/user-attachments/assets/2fec4aea-6e1b-4278-926c-1ebf4a9b702a)


| Category | Technologies |
|----------|-------------|
| **Cloud Provider** | AWS - ECS Fargate (serverless), ALB with WAF protection, ACM for HTTPS |
| **Infrastructure as Code** | Terraform - modular design, state refreshing, resource isolation |
| **CI/CD** | GitHub Actions - parallel security scanning, artifact sharing, manual approvals |
| **Security Scanning** | Trivy (containers), Checkov (IaC), SonarQube (code quality)  |
| **Containerisation** | Docker - multistage builds, Alpine images, nonroot user execution |

# Why This Project is transformative 

This project sets up a **reliable, secure and scalable infrastructure** for the Threat Modeling Tool using **Terraform**. It’s designed to make deployment smooth, enable secure HTTPS access and provide a custom domain for easy access.

- **End-to-End Automation** - From container building to infrastructure provisioning and teardown, everything runs with a single click
- **Security** - Multiple layers of protection with Trivy, Checkov, and SonarQube catch vulnerabilities before they reach production
- **Modular, Reusable Components** - Deploy any containerized application with minimal configuration changes
- **Complete Lifecycle Management** - Build, scan, deploy, and clean up with purpose-built workflows
- **IaC** - Terraform modules designed for maximum flexibility and reusability
# Threat Modeling Tool - Terraform Infrastructure Setup

## Comprehensive Security Framework
The pipeline implements a defense-in-depth security approach:

- **Trivy** - Container vulnerability scanning for CVE detection and remediation
- **Checkov** - Infrastructure-as-Code static analysis to enforce security best practices
- **SonarQube** - Code quality and security scanning for continuous inspection
- **WAF Integration** - OWASP Top 10 protection with AWS Web Application Firewall

## DockerFile 

The Dockerfile implements several container best practices: **multi-stage builds** separate the build environment from the runtime, **non-root user execution** enhances security and **dependency caching** optimising the build times.It also includes **proper file permissions** and uses **Alpine-based images** to minimise security footprint.

> **Note**
> Small container images load faster, consume less bandwidth and present a reduced attack surface for improved security.

## Manual Triggers

![Manual Triggers ](https://github.com/user-attachments/assets/e5c99585-a0b2-4249-bc0d-a991b58ef842)
Manual triggers are essential because:

- **Deployment safety** - Explicit confirmation prevents accidental deployments to production environments
- **Version control** - Direct specification of container images ensures the right version gets deployed
- **Process flexibility** - Allows for human judgment when needed without sacrificing automation


## Build and Push to ECR Workflow [![Build and Push to ECR](https://github.com/zyusuf88/threat-composer/actions/workflows/build-and-push-to-ecr.yml/badge.svg)](https://github.com/zyusuf88/threat-composer/actions/workflows/build-and-push-to-ecr.yml) 
![Build and Push workflow](https://github.com/user-attachments/assets/9dbd92a3-a866-4408-865b-298f4bc4c950)

| Stage | Description |
|-------|-------------|
| **Build Docker Image** | Turns your code into a Docker image and tags it based on your Git commit or custom input. |
| **Security Scan** | Checks your container for security holes using Trivy before letting it proceed. |
| **Push to ECR** | Gets your image into ECR with proper tagging, creating the repo if needed. |


## Deploy Workflow [![Terraform Deploy](https://github.com/zyusuf88/threat-composer/actions/workflows/terrafrom-deploy.yml/badge.svg)](https://github.com/zyusuf88/threat-composer/actions/workflows/terrafrom-deploy.yml)
(![ITerraform Deploymage](https://github.com/user-attachments/assets/5add6df7-386e-493d-845a-16ba7dc116e1))

| Stage | Description |
|-------|-------------|
| **Security Checks** | Runs SonarQube, Checkov and Trivy scans to catch security issues before deploying anything. |
| **Terraform Plan** | Creates a deployment plan with state refreshing to avoid partial deployments and interruption errors. |
| **Terraform Apply** | Makes the actual changes to your AWS infrastructure based on the validated plan. |



## Destroy Workflow [![Terraform Destroy](https://github.com/zyusuf88/threat-composer/actions/workflows/terraform-destroy.yml/badge.svg)](https://github.com/zyusuf88/threat-composer/actions/workflows/terraform-destroy.yml)

![Terraform Destroy](https://github.com/user-attachments/assets/d19a8cc1-fb9e-4c0c-9341-d10e4709620c)

| Stage | Description |
|-------|-------------|
| **Destroy ALB** | Removes the ALB first since it's the most public-facing component that depends on other resources. |
| **Full Destroy** | Cleans up all remaining infrastructure after the ALB is gone to ensure a proper dependency chain. |
| **Delete ECR Images** | Gets rid of the container image that was used during deployment to leave no orphaned resources behind. |

## Prerequisites

To implement a similar solution, you would need:

- AWS Account with appropriate permissions
- GitHub repository
- Docker
- Basic understanding of Terraform and GitHub Actions


## License

This project is proprietary and is not available for public use or distribution without express permission.

Copyright © 2025 Zeynab Yusuf