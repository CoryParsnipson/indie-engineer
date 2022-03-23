export default function remarkDataToFrontmatter() {
  let visit;

  return async function transformer(tree, vFile) {
    if (!visit) {
      visit = (await import('unist-util-visit')).visit;
    }

    for (const [key, value] of Object.entries(vFile.data)) {
      if (key == "fm") continue;
      vFile.data.fm[key] = value;
    }
  }
}
