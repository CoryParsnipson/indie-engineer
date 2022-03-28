---
title: This is a test post 1
author: Cory Parsnipson
summary: This is the first of two test posts to test the automated email blog post notification system.
date: Mon Mar 28 01:56:56 PM PDT 2022
categories:
  - test
  - dev
  - automated email
---

This is test post 1 being committed to the repo to test the automated published blog post notifications.

Testing steps:

1. Make sure the mailing list has 2 people in it.
1. Create a new blog post (in src/routes/blog). Commit this to the repo.
1. Push the commit to the heroku repo.
1. Wait for the build system to complete and look at the logs to confirm that the webhook detect a new blog post.
1. Check to see if an automated email was sent out and open it to verify correct contents.
1. Add one person in the dev mailing list to the suppression group.
1. Create a second blog post and commit this to the repo.
1. Push the commit to the heroku repo.
1. Wait for build to detect second post.
1. Check automated email to make sure one person got it and the other didn't.
1. Remove both blog posts and commit to repo.
