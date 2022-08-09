# Hunter Portfolio

## Prep
1. Set up a Pantheon account and add your keys: Log in > Account > SSH Keys > Add key
2. Create a Pantheon [Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/) from User Dashboard > Account > Machine Tokens. (make sure you save this in a secure place!)
3. Pull the repo github (**not from pantheon**)
  - `git clone git@github.com:sandstormdesign/mbl.git`
4. [Install Lando](https://docs.lando.dev/basics/installation.html#macos)

## Local Setup
1. `ssh-add`
2. `lando start` (this may take a bit)
3. `lando terminus auth:login --machine-token=‹machine-token›` [docs](https://pantheon.io/docs/terminus/install#authenticate)
4. `lando pull` (this will pull the DB and files)
  - you will need to enter in your [Machine Token](https://dashboard.pantheon.io/login?destination=%2Fuser#account/tokens/create/terminus/)
  - you may need to enter your ssh key password, up to 3 times. If it looks like it's hanging, see if you see a prompt to enter your password and enter it again.
5. `$ lando front-end`

## Before starting a new branch

1. `$ git pull origin dev`
2. `$ lando pull`
3. `$ lando composer install`
4. `$ lando drush cim`
5. `$ lando front-end`
6. `$ lando drush cr`
7. `$ git checkout -b feature-branch-name`

## Running commands

### Drush
`$ lando drush status`
`$ lando drush cr`
`$ lando drush cex`
`$ lando drush cim`

### Composer
`$ lando composer install`
`$ lando composer require drupal/module-name`

### Front-end
`$ lando front-end` (installs and builds once)
`$ lando front-end-watch` (installs and builds and watches)

### Tooling extra notes
[Lando tooling](https://docs.lando.dev/config/tooling.html) (aka custom commands and overides)
- type `lando` to list commands
- `lando front-end` - Installs dependencies for the front-end and builds the CSS
- `lando front-end-stage` - Installs dependencies for the front-end and builds the CSS
- `lando front-end-watch` - Runs lando front-end task and watch task, builds CSS and JS on changes
- `lando pull` - pulls DB and content files from dev
  - to pull from test, modify the defaults in `.lando.yml` under `pull`

Drupal Commands
- prefix with `lando` - `lando drush cex`, `lando composer install`, etc
-----
# Composer-enabled Drupal template

This is Pantheon's recommended starting point for forking new [Drupal](https://www.drupal.org/) upstreams
that work with the Platform's Integrated Composer build process. It is also the
Platform's standard Drupal 9 upstream.

Unlike with earlier Pantheon upstreams, files such as Drupal Core that you are
unlikely to adjust while building sites are not in the main branch of the
repository. Instead, they are referenced as dependencies that are installed by
Composer.

For more information and detailed installation guides, please visit the
Integrated Composer Pantheon documentation: https://pantheon.io/docs/integrated-composer

## Contributing

Contributions are welcome in the form of GitHub pull requests. However, the
`pantheon-upstreams/drupal-project` repository is a mirror that does not
directly accept pull requests.

Instead, to propose a change, please fork [pantheon-systems/drupal-project](https://github.com/pantheon-systems/drupal-project)
and submit a PR to that repository.

