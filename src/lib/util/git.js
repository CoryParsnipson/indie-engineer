import fs from 'fs';
import path from 'path';
import os from 'os';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web/index.js';
import Base64 from 'crypto-js/enc-base64.js';
import Utf8 from 'crypto-js/enc-utf8.js';
import { env } from '$lib/util/env';

const TAG_PREFIX = "build-";
const BLOG_POSTS_DIR = "src/routes/blog";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));

function generateTagName() {
  return TAG_PREFIX + (new Date()).toISOString().replaceAll(':', '_');
}

function tagNameToDate(tag) {
  return new Date(tag.replaceAll(TAG_PREFIX, '').replaceAll('_', ':'));
}

function isBuildTag(tag) {
  if (!tag.startsWith(TAG_PREFIX)) {
    return false;
  }

  let tokens = tag.split(TAG_PREFIX);
  if (tokens.length !== 2) {
    return false;
  }

  let d = tagNameToDate(tokens[1]);
  return d instanceof Date && !isNaN(d);
}

function sortTagsByTime(tags) {
  const buildTagsOnly = tags.filter(tag => isBuildTag(tag));
  return buildTagsOnly.sort();
}

export async function writeBuildTagToRepo() {
  // create new build tag
  let newBuildTag = generateTagName();
  await git.tag({ fs, object: 'HEAD', dir, ref: newBuildTag });

  // push new build tag to heroku repo
  await git.push({
    fs,
    http,
    dir,
    ref: newBuildTag,
    // heroku needs basic HTTP authentication with blank string for username and heroku API token as password
    headers: { 'Authorization': "Basic " + Base64.stringify(Utf8.parse(':' + env.var.VITE_HEROKU_API_TOKEN)) },
  });
}

async function cloneHerokuRepo() {
  return git.clone({
    fs,
    http,
    dir,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: env.var.VITE_HEROKU_REPO,
    ref: 'main',
    // heroku needs basic HTTP authentication with blank string for username and heroku API token as password
    headers: { 'Authorization': "Basic " + Base64.stringify(Utf8.parse(':' + env.var.VITE_HEROKU_API_TOKEN)) },
  });
}

async function getCommitOfLastBuildTag() {
  let tags = await git.listTags({ fs, dir });
  let buildTags = sortTagsByTime(tags);

  let lastBuildCommit;
  if (!buildTags || buildTags.length == 0) {
    // if there are no build tags, use the first commit
    let commits = await git.log({fs, dir});
    lastBuildCommit = commits[commits.length - 1]; // the last entry in the commit array is earliest
  } else {
    // get commit of the latest tag (the last entry in the buildtags array is latest)
    let commits = await git.log({ fs, dir, depth: 1, ref: buildTags[buildTags.length - 1] });
    lastBuildCommit = commits[0];
  }

  return lastBuildCommit;
}

function diffFilter(statuses, subdirectory, types = ['equal', 'add', 'remove', 'modify']) {
  return statuses.filter((status) => status?.path.startsWith(subdirectory) && types.includes(status?.type));
}

// this is done in place; older files are at the beginning
function sortFilesByAge(files) {
  files.sort((a, b) => {
    let actime = fs.statSync(a.path).ctime;
    let bctime = fs.statSync(b.path).ctime;
    
    if (actime === bctime) {
      return 0;
    }
    return (actime < bctime) ? -1 : 1;
  });
}

// copied from:
// https://isomorphic-git.org/docs/en/snippets#git-diff---name-status-commithash1-commithash2
//
// NOTE: needed to make some changes to check for null for some reason.
async function getFileStateChanges(commitHash1, commitHash2, dir) {
  return git.walk({
    fs,
    dir,
    trees: [git.TREE({ ref: commitHash1 }), git.TREE({ ref: commitHash2 })],
    map: async function(filepath, [A, B]) {
      // ignore directories
      if (filepath === '.') {
        return
      }
      if ((A !== null && await A.type()) === 'tree' || (B !== null && await B.type()) === 'tree') {
        return
      }

      // generate ids
      const Aoid = A !== null ? await A.oid() : undefined;
      const Boid = B !== null ? await B.oid() : undefined;

      // determine modification type
      let type = 'equal'
      if (Aoid !== Boid) {
        type = 'modify'
      }
      if (Aoid === undefined) {
        type = 'add'
      }
      if (Boid === undefined) {
        type = 'remove'
      }
      if (Aoid === undefined && Boid === undefined) {
        console.log('Something weird happened:')
        console.log(A)
        console.log(B)
      }

      return {
        path: `/${filepath}`,
        type: type,
      }
    },
  })
}

export async function checkForNewBlogPost(commitHash) {
  await cloneHerokuRepo();

  let lastBuildCommit = await getCommitOfLastBuildTag();
  console.log("Starting new blog post check from " + lastBuildCommit.oid);

  let diffs = await getFileStateChanges(lastBuildCommit.oid, commitHash, dir);
  let newBlogPosts = diffFilter(diffs, '/' + BLOG_POSTS_DIR, ['add'])

  let newBlogPost;
  if (!newBlogPosts || newBlogPosts.length < 1) {
    console.log("Did not detect any new files in '" + BLOG_POSTS_DIR + "'. Exiting with no action.");
    return;
  } else if (newBlogPosts.length == 1) {
    newBlogPost = newBlogPosts[0];
  } else {
    console.log("WARNING: multiple new files detected in '" + BLOG_POSTS_DIR + "'. Only processesing *newest* post:");
    console.log(newBlogPosts);

    sortFilesByAge(newBlogPosts);
    newBlogPost = newBlogPosts[newBlogPosts.length - 1];
  }

  return newBlogPost.path;
}
