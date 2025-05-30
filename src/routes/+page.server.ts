import { SPOON } from "$env/static/private";

export const load = async ({ url }) => {
  const query = url.searchParams.get("query");
  console.log(query);
  if (!query) {
    return {
      recipes: [],
    };
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOON}`
  );
  const data = await response.json();

  return {
    recipes: data.results || [],
  };
};
