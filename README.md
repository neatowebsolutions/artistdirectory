# Artist Directory

## Overview

This monorepo is a collection of applications, services, packages, and infrastructure as code comprising the entirety of an artist directory app.

## Links

- [Tasks](https://trello.com/b/pumtPrnj/artist-directory)
- [Test environment](https://test.artistdirectory.co/)
- [Production environment](https://artistdirectory.co/)
- Designs
  - [Private access, with more detail](https://app.zeplin.io/project/6185cf219478b92fa4e09cef)
  - [Public access](https://scene.zeplin.io/project/6185cf219478b92fa4e09cef)

## Dependencies

If you are struggling and need help setting anything up, please ask for help.

### Node.js

The Node version is specified in the top-level `.node-version` file; please install and use this version on your system. We are currently using Node 14.17.0, so we cannot use features from higher versions. For example, optional chaining cannot be used in our Node code.

[nvm](https://github.com/nvm-sh/nvm) and [avn](https://github.com/wbyoung/avn) are recommended for easily managing and using Node versions.

### Yarn

Yarn is used as the package manager. Please install this globally.

### Lerna

[Lerna](https://lerna.js.org/) is used to manage this monorepo. Lerna is installed automatically when installing dependencies.

### MongoDB

Version 4.2 or higher is required as multi-document transactions on replica sets are used. Please only used features supported by 4.6 and lower.

If upgrading from 3.x to 4.x, it might be easiest to dump your databases one by one, remove your MongoDB data directory, upgrade MongoDB, and then restore your databases.

To dump a database:

    mongodump --archive --uri mongodb://localhost:27017/database-name | gzip -9 -c > database-name.gz

And to restore a database:

    mongorestore --gzip --archive=database-name.gz

During development, a local replica set is required as transactions may be used. Please follow [this gist](https://gist.github.com/davisford/bb37079900888c44d2bbcb2c52a5d6e8) for setup instructions. Alternatively, you can use [run-rs](https://www.npmjs.com/package/run-rs).

## Development

### Getting started

1. Review designs, and understand the purpose and facets of this application.
1. Follow steps below under Setup to get the application running.
1. Ask for your first task.

### Setup

1. Clone this repository.
1. Create a top-level `.env` file by copying `.env.example` and fill in values.
1. Create symlinks (e.g., `ln -s ../../.env .`) to the top-level `.env` file within each `applications/` and `services/` subdirectory.
1. Ask Chad to create an AWS IAM account for you and give you your credentials.
1. Add AWS credentials to `~/.aws/credentials`:
   ```
   [avenueforthearts]
   aws_access_key_id = <your key>
   aws_secret_access_key = <your secret key>
   ```
1. Create `~/.aws/config` if it doesn't exist:
   ```
   [default]
   region = us-east-1
   ```
1. Run `yarn global add lerna`.
1. Run `yarn start`. This automatically does the following:
   1. Installs dependencies.
   1. Runs Lerna bootstrapping.
   1. Builds packages.
   1. Starts all applications, services, and package build watching.

Please use the `master` branch for main development.

## Package Management

### Adding a shared dependency for all projects

To add a dependency shared by all packages, simply run `yarn add foo -W`. To remove a dependency, run `yarn add foo`.

Note that `lerna add foo` will add `foo` to package.json in all packages and _not_ to the high-level `package.json`.

### Adding dependencies for packages

To add a dependency for an individual package, use the following command:

    lerna add foo --scope @org-name/application-name

For example:

    lerna add http-status-codes --scope @artistdirectory/artistdirectory-directory

Please find more examples [here](https://github.com/lerna/lerna/tree/master/commands/add#examples).

### Removing dependencies for packages

Unfortunately [there is no](https://github.com/lerna/lerna/issues/1886) `lerna remove` command. Here are possible workarounds for removing dependencies from individual package:

1. Run `lerna exec 'yarn remove foo' --scope @org-name/application-name`.
1. Manually remove dependencies from `application-name/package.json` and then run `lerna bootstrap --scope @org-name/application-name --force-local`.

### Troubleshooting

#### Ports already in use

Sometimes Node processes hang and become "zombie" processes, and then you receive error messages about ports being in use. To remedy this, try running `killall -9 node`.

#### ngrok not starting

Occasionally ngrok tunnels will fail to start because ngrok is running in the background. In this case, try running `killall -9 ngrok`.

### Tooling

The following are used:

- Node.js
- React (with hooks)
- Next.js
- REST
- Lerna
- webpack
- Mongoose
- Serverless

### Coding Conventions

The following coding conventions are adhered to except in special cases:

- Prettier and ESLint for automatic code formatting.
- kebab-case for names of repositories, applications, packages, and services.
- PascalCase for names of component file and exported components.
- camelCase for variable names.
- camelCase for code file names (except for pages, which must use hyphens).
- snake_case for Terraform resource names.
- Hyphens for image and media file names.
- Hyphens for directory names.
- Default exports are used for modules and components (with the exception of index.js files).

Code consistency is important. In order to maintain consistency, convention changes should be openly discussed and decisions made as a team. Please do your best to respect conventions established throughout this code base.

## Deployment

### Setup

1. Ensure the domain name (e.g., example.com) exists in AWS within Route 53 with nameserver DNS set up correctly.
1. Create a `ci` IAM account with administrator access.
1. Create a `server` account with the following inline policy:
   ```
   {
      "Version": "2012-10-17",
      "Statement": [
         {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": "route53:*",
               "Resource": "*"
         },
         {
               "Sid": "VisualEditor1",
               "Effect": "Allow",
               "Action": "s3:*",
               "Resource": [
                  "arn:aws:s3:::neatowebsolutions-artistdirectory-backups",
                  "arn:aws:s3:::neatowebsolutions-artistdirectory-backups/*"
               ]
         }
      ]
   }
   ```
1. Set the following in `infrastructure/config/[environment].tfvars`, and commit these changes:
   1. `hosted_zone_id` (get this from Route 53 for the domain)
1. Configure the following secrets [here](https://github.com/neatowebsolutions/artistdirectory/settings/secrets/actions) in GitHub:
   1. `MONGODB_APP_PASSWORD` (the app account MongoDB password)

### Triggering

Simply push to the appropriate branch.

GitHub Actions is used for deployment. Deployment is automatic when Git pushes occur to branches corresponding to environments:

- `test`
- `production`

Initial deployments should occur in the following order:

1. `infrastructure`
1. `services/logs`
1. `services/artists-api`
1. `services/email`
1. `services/directory-api`
1. `applications/directory`

## Infrastructure

All infrastructure is managed via Serverless, Terraform, and Ansible with each deployment. Linux and AWS are used for hosting. The following AWS services are used:

- Lambda
- API Gateway
- EC2
- SNS
- SQS
- S3
- CloudFront
- CloudWatch Events
- SES
- SSM
- ACM

## Architecture

A microservice architecture is used. Please refer to [this diagram](https://docs.google.com/drawings/d/TODO).

## Requirements

### Internationalization and Localization

Internationalization and localization are used for currencies and dates.

### Accessibility

We should always aim for a Lighthouse (Chrome audit) score of >= 90 for accessibility.

_All_ images _must_ have `alt` tags with non-empty values.

### Browser Support

We support the following browsers:

- Google Chrome
- Firefox
- Edge
- Safari
- iOS Safari

Internet Explorer is not supported.

### Licensing

All licenses are permissive free software licenses imposing minimal restrictions on the use and distribution of covered software. Run `npx license-checker --summary` to check licenses for dependencies.
