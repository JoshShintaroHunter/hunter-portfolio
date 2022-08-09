# Pantheon

## Adding the Pantheon

From Pantheon find "clone with git"
Copy the `ssh://...` part of the snippet

From:
`git clone ssh://codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931@codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931.drush.in:2222/~/repository.git mbl`

We need:
`ssh://codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931@codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931.drush.in:2222/~/repository.git`

Set a new origin inside your repo root

`git remote add origin-pantheon ssh://codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931@codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931.drush.in:2222/~/repository.git`

Confirm with `git remote -v`
```
origin  git@github.com:sandstormdesign/mbl.git (fetch)
origin  git@github.com:sandstormdesign/mbl.git (push)
origin-pantheon ssh://codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931@codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931.drush.in:2222/~/repository.git (fetch)
origin-pantheon ssh://codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931@codeserver.dev.14758ff7-dc19-4b4f-a1c9-89ac684b7931.drush.in:2222/~/repository.git (push)
```

## Deployments to dev

### Backup
- Make a backup in Pantheon or using `lando terminus backup:create mbl.dev`
- Optionally, only back up the database with `lando terminus backup:create mbl.dev --element=db`

### Prep the front-end assets

Note, libraries attached in `web/themes/_custom/sd/sd.theme` (see `web/themes/_custom/sd/sd.libraries.yml`)
- Drupal on local uses `sd/global` (untracked files in `dist`)
- dev, test, and live all use `global_stage` (tracked files in `dist-stage`)
- `lando front-end-stage` uses `web/themes/_custom/sd/webpack.stage.config.js`

```
git checkout dev
lando front-end-stage
(you should see new css and/or js files in `dist-stage`)
(add and commit these files)
git commit -m "Front-end build assets"
git push origin dev
```

### Push to dev

**First backup and run through "Prep the front-end assets"**

```
git checkout master
git merge dev
git push origin master
// Confirm Pantheon dev env is set to git mode
git push origin-pantheon master
// Pushing to origin-pantheon runs composer install but not cr, cim, updb
// Check the Pantheon UI to confirm the files have moved over
lando drush @pantheon.mbl.dev cr
lando drush @pantheon.mbl.dev updb
lando drush @pantheon.mbl.dev cim
lando drush @pantheon.mbl.dev cr
```

### Push to test

**First backup**

From the Pantheon UI under the "test" environment tab

- Add a message under "Deploy Log Message", I usually do "sprint - list of tickets". (Sprint 3 Priority 1 - MBL-237, MBL-299, MBL-305, MBL-247, MBL-298, MBL-175)
- Click deploy code and wait for it to complete

```
lando drush @pantheon.mbl.test cr
lando drush @pantheon.mbl.test updb
lando drush @pantheon.mbl.test cim
lando drush @pantheon.mbl.test cr
```

### Push to live

**First backup**

From the Pantheon UI under the "live" environment tab

- Add a message under "Deploy Log Message", I usually do "sprint - list of tickets". (Sprint 3 Priority 1 - MBL-237, MBL-299, MBL-305, MBL-247, MBL-298, MBL-175)
- Click deploy code and wait for it to complete

```
lando drush @pantheon.mbl.live cr
lando drush @pantheon.mbl.live updb
lando drush @pantheon.mbl.live cim
lando drush @pantheon.mbl.live cr
```
