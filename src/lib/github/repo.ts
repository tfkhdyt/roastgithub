import { GITHUB_TOKEN } from "$env/static/private";

type GithubRepo = {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  open_issues_count: number;
  license: string;
  fork: boolean;
};

export async function fetchGithubRepos(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    );
    const data: GithubRepo[] = await response.json();
    if (!Array.isArray(data) || !response.ok) {
      throw new Error("Failed to fetch repositories from API");
    }

    return data;
  } catch (error) {
    throw new Error("Failed to fetch repositories", { cause: error });
  }
}
