import { GITHUB_TOKEN } from "$env/static/private";
import type { GitHubError } from "../../types/github";

type GithubProfile = {
  name: string;
  bio: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  blog: string;
  created_at: string;
  updated_at: string;
  repositories: unknown[];
};

export async function fetchGithubProfile(
  username: string,
  token: string | null
): Promise<GithubProfile> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token ?? GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorData: GitHubError = await response.json();
    throw new Error(errorData.message);
  }

  const data: GithubProfile = await response.json();

  return data;
}
