import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/layouts/Spinner";
import RepoList from "../components/repos/RepoList";
import GitHubContext from "../context/github/GithubContext";
import { getUserAndRepos } from "../context/github/GithubActions";

function User() {
  const { user, loading, repos, dispatch } = useContext(GitHubContext);

  const params = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login);
      dispatch({ type: "GET_USER_AND_REPOS", payload: userData });
    };
    getUserData();

    // //The code below was using fetch
    // const getUserData = async () => {
    //   const userData = await getUser(params.login);
    //   dispatch({ type: "GET_USER", payload: userData });

    //   const userRepoData = await getUserRepos(params.login);
    //   dispatch({ type: "GET_REPOS", payload: userRepoData });
    // };
    // getUserData();
  }, [dispatch, params.login]);

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back to Search
          </Link>
        </div>
        <div className="grid grid-cols-1  xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            {/* <div className="rounded-lg shadow-xl card image-full"> */}
            <div className="rounded-lg shadow-xl card">
              <figure>
                <img src={avatar_url} alt={name} />
              </figure>
              <div className="card-body justify-end user-text">
                <h2 className="card-title mb-0">{name}</h2>
                <p>{login}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success text-center mt-2">
                  {type}
                </div>
                {hireable && (
                  <div className="mx-1 badge badge-info text-center mt-2">
                    Hireable
                  </div>
                )}
              </h1>
              <p className="mt-2">{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit GitHub Profile
                </a>
              </div>
              <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                {location && (
                  <div className="stat">
                    <div className="stat-title text=md">Location</div>
                    <div className="text-lg stat-value">{location}</div>
                  </div>
                )}

                {blog && (
                  <div className="stat">
                    <div className="stat-title text=md">Website</div>
                    <div className="text-lg stat-value">
                      <a
                        href={`https://${blog}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {blog}
                      </a>
                    </div>
                  </div>
                )}

                {twitter_username && (
                  <div className="stat">
                    <div className="stat-title text=md">Twitter</div>
                    <div className="text-lg stat-value">
                      <a
                        href={`https://twitter.com/${twitter_username}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {twitter_username}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-title pr-5 text-3xl md:text-4xl">
              {followers}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-title pr-5 text-3xl md:text-4xl">
              {following}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Repos</div>
            <div className="stat-title pr-5 text-3xl md:text-4xl">
              {public_repos}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Gist</div>
            <div className="stat-title pr-5 text-3xl md:text-4xl">
              {public_gists}
            </div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>
    </>
  );
}

export default User;

// Alternate Styling
// <h1 className="text-3xl card-title">{name}</h1>
//               <div className="ml-2 mr-1 badge bg-gray-900 text-success p-3 mt-3 text-center">
//                 {type}
//               </div>
//               {hireable && (
//                 <div className="mx-1 badge bg-gray-900 text-info p-3 mt-3 text-center">
//                   Hireable
//                 </div>
//               )}
