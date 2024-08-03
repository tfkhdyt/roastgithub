export async function fetchGithubReadme(username: string) {
  const readmes = await Promise.allSettled([
    fetch(
      `https://raw.githubusercontent.com/${username}/${username}/main/README.md`
    ),
    fetch(
      `https://raw.githubusercontent.com/${username}/${username}/master/README.md`
    ),
  ]);

  for (const readme of readmes) {
    if (readme.status === "fulfilled" && readme.value.status === 200) {
      return readme.value.text();
    }
  }

  throw new Error("Failed to fetch README");
}
