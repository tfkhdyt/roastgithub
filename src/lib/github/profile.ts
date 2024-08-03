import { GITHUB_TOKEN } from "$env/static/private";

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
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    const data: GithubProfile = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch profile from API");
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch profile", { cause: error });
  }
}
