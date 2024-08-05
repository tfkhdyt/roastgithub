export async function fetchGithubReadme(username: string) {
  try {
    const readmes = await Promise.any([
      fetch(
        `https://raw.githubusercontent.com/${username}/${username}/main/README.md`
      ),
      fetch(
        `https://raw.githubusercontent.com/${username}/${username}/master/README.md`
      ),
    ]);

    return readmes.text();
  } catch {
    return null;
  }
}
