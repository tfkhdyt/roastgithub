import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { usernameSchema } from "../schema/username";
import { fail, type Actions } from "@sveltejs/kit";
import { fetchGithubProfile } from "$lib/github/profile";
import { fetchGithubRepos } from "$lib/github/repo";
import { fetchGithubReadme } from "$lib/github/readme";
import { generateAnswer } from "$lib/gemini/prompt";
import { limiter } from "$lib/rate-limit";

export const load = async () => {
  const form = await superValidate(zod(usernameSchema));
  return { form };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(usernameSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      if (await limiter.isLimited(event)) {
        return message(
          form,
          { type: "error", text: "Too many requests, please try again later." },
          { status: 429 }
        );
      }

      const [profile, repos, readme] = await Promise.all([
        fetchGithubProfile(form.data.username, form.data.token),
        fetchGithubRepos(form.data.username, form.data.token),
        fetchGithubReadme(form.data.username),
      ]);

      const data = {
        name: profile.name,
        company: profile.company,
        blog: profile.blog,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        bio: profile.bio,
        location: profile.location,
        followers: profile.followers,
        following: profile.following,
        public_repos: profile.public_repos,
        repositories: repos
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            open_issues_count: repo.open_issues_count,
            license: repo.license,
            fork: repo.fork,
          }))
          .slice(0, 50),
        readme,
      };

      const answer = await generateAnswer({
        username: form.data.username,
        location: data.location,
        readme: data.readme,
        data,
      });

      return message(form, { type: "success", text: answer });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return message(
          form,
          { type: "error", text: error.message },
          { status: 400 }
        );
      }

      return message(
        form,
        { type: "error", text: String(error) },
        { status: 500 }
      );
    }
  },
} satisfies Actions;
