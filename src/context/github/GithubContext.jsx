import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import PropTypes from "prop-types";

const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: [],
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider
      value={{
        ...state, //This is equivalent to the passing these values below
        // users: state.users,
        // user: state.user,
        // loading: state.loading,
        // repos: state.repos,
        dispatch, //This is equivalent to the passing these functions below
        // searchUsers,
        // clearUsers,
        // getUser,
        // getUserRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

GitHubProvider.propTypes = {
  children: PropTypes.node,
};

export default GitHubContext;
