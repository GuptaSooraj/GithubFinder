import axios from "axios";
// const GitHub_URL = import.meta.env.VITE_TEST_GITHUB_URL; // // For Some Reason this is not working and I can"t figure out why

const GitHub_URL = "https://api.github.com";
const GitHub_TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GitHub_URL,
  Authorization: `token ${GitHub_TOKEN}`,
});

//Get Search Results
export const searchUsers = async (text) => {
  // const response = await fetch(`${GitHub_URL}/users`

  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;

  // const response = await fetch(
  //   `https://api.github.com/search/users?${params}`,
  //   {
  //     headers: {
  //       Authorization: `token ${GitHub_TOKEN}`,
  //     },
  //   }
  // );
  // const { items } = await response.json();
  // return items;
};

// Get User & Repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

// All the commented code was used to get data using fetch but now it is using axios
// // Get a Single User
// export const getUser = async (login) => {
//   const response = await fetch(`https://api.github.com/users/${login}`, {
//     headers: {
//       Authorization: `token ${GitHub_TOKEN}`,
//     },
//   });

//   if (response.status === "404") {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };

// // Get a User's Repos
// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });

//   const response = await fetch(
//     `https://api.github.com/users/${login}/repos?${params}`,
//     {
//       headers: {
//         Authorization: `token ${GitHub_TOKEN}`,
//       },
//     }
//   );

//   const data = await response.json();
//   return data;
// };
