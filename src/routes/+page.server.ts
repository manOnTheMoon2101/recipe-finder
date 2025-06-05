import { SPOON } from "$env/static/private";

export const load = async ({ url }) => {
  const query = url.searchParams.get("query") || "";
  if (!query) return { recipes: [] };

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOON}`
  );
  const data = await response.json();

  const recipesWithInfo = await Promise.all(
    data.results.map(async (recipe: any) => {
      const infoResponse = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${SPOON}`
      );
      const info = await infoResponse.json();
      return {
        ...recipe,
        information: info
      };
    })
  );

  return {
    recipes: recipesWithInfo || [],
  };
};
