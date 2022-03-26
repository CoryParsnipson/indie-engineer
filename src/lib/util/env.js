// export environment variables (source changes depending on production or dev)
export const env = {
  var: import.meta.env || process.env,
}
