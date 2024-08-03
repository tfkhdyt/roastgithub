import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { usernameSchema } from "../schema/username";
import { fail, type Actions } from "@sveltejs/kit";
import { fetchGithubProfile } from "$lib/github/profile";
import { fetchGithubRepos } from "$lib/github/repo";
import { fetchGithubReadme } from "$lib/github/readme";
import { genAI } from "$lib/gemini";

export const load = async () => {
  const form = await superValidate(zod(usernameSchema));
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(usernameSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const profile = await fetchGithubProfile(
        form.data.username,
        form.data.token
      );
      const repos = await fetchGithubRepos(form.data.username, form.data.token);
      const readme = await fetchGithubReadme(form.data.username);

      const data = {
        name: profile.name,
        bio: profile.bio,
        company: profile.company,
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

      let prompt = `Berikan roasting singkat dengan kejam dan menyindir dalam bahasa gaul untuk profile github berikut: ${
        form.data.username
      }. Berikut detailnya: "${JSON.stringify(data)}"`;
      if (data.location != null && !data.location.includes("Indonesia")) {
        prompt = `Give a short and harsh roasting for the following github profile: ${
          form.data.username
        }. Here are the details: "${JSON.stringify(data)}"`;
      }

      if (data.readme) {
        prompt += ", Profile Markdown: ```" + data.readme + "```";
      } else {
        prompt += `, Profile Markdown: Not Found`;
      }

      if (data.location == null || data.location.includes("Indonesia")) {
        prompt += `. (Berikan response dalam bahasa indonesia dan jangan berikan pujian atau saran serta jangan berikan kata-kata terlalu kasar)`;
      } else {
        prompt += `. (Provide the response in English and do not provide praise or advice and do not use explicit words)`;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      return message(form, { type: "success", text: response });
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
