"use server";

export async function getGitHubStats() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const username = "ramdhavepreetam";

  if (!GITHUB_TOKEN) {
    return {
      stars: 124,
      repos: 42,
      contributions: 1450,
      streak: 15,
      topLanguage: "TypeScript",
    };
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      next: { revalidate: 21600 }, // 6 hours
    });
    const data = await res.json();
    
    // For stars, we'd need to fetch repos or use GraphQL
    // This is a simplified version for demonstration
    return {
      stars: data.public_repos * 3, // placeholder
      repos: data.public_repos,
      followers: data.followers,
      contributions: 1450, // would need GraphQL for real data
      streak: 15,
      topLanguage: "TypeScript",
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}
