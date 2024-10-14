# Threat Modeling Tool Single Page App (SPA)

Built on top of the Threat Composer Tool by Amazon (<https://awslabs.github.io/threat-composer/workspaces/default/dashboard>)
This version consolidates the 2 original projects (threat-composer & threat-composer-app)  into a single project and removes the 3rd project entirely (threat-composer-infra) as we will be using a different deployment topology.
It also adds a new dependency @projectstorm/react-diagrams, for further development of a DFD builder.

![image](https://github.com/user-attachments/assets/2fec4aea-6e1b-4278-926c-1ebf4a9b702a)



# Threat Modeling Tool - Terraform Infrastructure Setup

This project sets up a **reliable, secure, and scalable infrastructure** for the Threat Modeling Tool using **Terraform**. It’s designed to make deployment smooth, enable secure HTTPS access, and provide a custom domain for easy access.

## Why This Setup?

### **Consistency & Automation with Terraform**
- **Infrastructure as Code (IaC)**: Defining everything in code makes deployments consistent, repeatable, and reduces human error.
- **Version Control**: Changes are tracked, so we know what’s deployed and when.
  
### **Secure Access with HTTPS**
- **AWS Certificate Manager (ACM)**: HTTPS is enforced to secure data in transit, protecting user interactions and ensuring privacy.
- **Why It Matters**: HTTPS builds trust and is now a requirement for secure, professional applications.

### **Custom Domain & Fast Access**
- **Domain**: Access the tool at `https://tm.zeynabyusuf.com`, managed via **Cloudflare**.
- **DNS & Caching**: Cloudflare provides fast DNS resolution and caching to boost app performance.
- **Why It Matters**: A custom domain makes the tool easy to remember, and caching improves load times.

### **Scalable, Cost-Effective Architecture on AWS**
- **AWS Fargate & ALB**: Containers run on Fargate, automatically scaling as traffic increases, with an Application Load Balancer (ALB) distributing traffic for reliability.
- **Why It Matters**: Fargate’s serverless design means lower costs—only pay for what you use—and ALB ensures high availability.


---

## Setup

1. **Clone and Install**:
   ```bash
   git clone [repo-url]
   cd [repo-directory]
   ```

2. 

```bash
yarn install
yarn build
yarn start
http://localhost:3000/workspaces/default/dashboard

## or
yarn global add serve
serve -s build
```


3. **Deploy with Terraform**

``` terraform init
terraform apply -auto-approve
```



## Future Enhancements

- **Modularised Terraform**: Breaking code into modules (e.g., ECS, VPC) for easier management and reusability.
- **Auto-Scaling Policies**: Implementing auto-scaling for better cost efficiency during fluctuating demand.
- **CI/CD Integration**: Adding a CI/CD pipeline for faster, automated updates directly to production.

These updates will keep the infrastructure adaptable and ready for growth.
