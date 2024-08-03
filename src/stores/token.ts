import { writable } from "svelte/store";
import { browser } from "$app/environment";

let stored = "";
if (browser) {
  stored = localStorage.getItem("roast-github.github.token") || "";
}

export const token = writable(stored);

if (browser) {
  token.subscribe((value) =>
    localStorage.setItem("roast-github.github.token", value ?? "")
  );
}
