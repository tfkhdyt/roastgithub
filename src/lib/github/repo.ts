import { GITHUB_TOKEN } from "$env/static/private";
import type { GitHubError } from "../../types/github";

type GithubRepo = {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  open_issues_count: number;
  license: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
};

export async function fetchGithubRepos(username: string, token: string | null) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`,
    {
      headers: {
        Authorization: `Bearer ${token ?? GITHUB_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const errorData: GitHubError = await response.json();
    throw new Error(errorData.message);
  }

  const data: GithubRepo[] = await response.json();
  if (!Array.isArray(data) || !response.ok) {
    throw new Error("Failed to fetch repositories from API");
  }

  return data;
}
