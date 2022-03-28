import fs from 'fs';
import parserFrontMatter from 'parser-front-matter';

// given a filepath string (in a git repo relative to the root) to a markdown file with frontmatter,
// read the contents and parse the frontmatter into metadata needed to populate a mailchimp email.
// Returns the frontmatter object.
export function getFrontmatterFromMarkdown(filepath) {
  let relativeFilePath = filepath.replace(/^\//, ''); // remove prefix slash if there is one

  const contents = fs.readFileSync(relativeFilePath);
  return parserFrontMatter.parseSync({ contents: contents }).data;
}
