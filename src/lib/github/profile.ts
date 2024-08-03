type GithubProfile = {
  name: string;
  bio: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  repositories: unknown[];
};

export async function fetchGithubProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data: GithubProfile = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch profile", { cause: error });
  }
}
