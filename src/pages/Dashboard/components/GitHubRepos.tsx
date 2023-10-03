import React, { useEffect, useState } from "react";
import axios from "axios";
import { ERROR_MESSAGES, INPUT_CLASS_NAME } from "@/constants";
import { initFacebookSDK } from "./facebookInit";
import RepoItem from "./RepoItem";
import { IRepository } from "@/api/api.type";
import ErrorMessage from "@/core/components/common/Form/ErrorMessage/ErrorMessage";

declare global {
  interface Window {
    FB: any; // Adjust this type as needed for specific SDK functions you use
    fbAsyncInit: () => void;
  }
}

const GitHubRepos: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State to keep track of the share counts for repositories
  const [shareCounts, setShareCounts] = useState<{
    [repoName: string]: { success: number; failure: number };
  }>({});

  useEffect(() => {
    // Initialize Facebook SDK once the SDK is loaded
    initFacebookSDK();
  }, []);

  const shareRepository = (repository: IRepository) => {
    const shareUrl = repository.html_url;
    const repoName = repository.full_name;
    window.FB.ui(
      {
        method: "share",
        href: shareUrl,
      },
      function (response: any) {
        if (response && !response.error_message) {
          // Link was posted successfully
          setShareCounts((prevShareCounts) => ({
            ...prevShareCounts,
            [repoName]: {
              success: (prevShareCounts[repoName]?.success || 0) + 1,
              failure: prevShareCounts[repoName]?.failure || 0,
            },
          }));
          console.log("Shared successfully!");
        } else {
          // Link posting failed
          setShareCounts((prevShareCounts) => ({
            ...prevShareCounts,
            [repoName]: {
              success: prevShareCounts[repoName]?.success || 0,
              failure: (prevShareCounts[repoName]?.failure || 0) + 1,
            },
          }));
          console.error(
            "Error occurred while posting:",
            response.error_message
          );
        }
      }
    );
  };

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(response.data);
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setErrorMessage(ERROR_MESSAGES.invalidUsername);
    }
  };

  return (
    <div className="w-full p-4 lg:w-3/5 mx-auto my-5 bg-white border border-gray-200 rounded-lg shadow">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        GitHub Public Repositories
      </h1>
      <div>
        <input
          type="text"
          placeholder="Enter GitHub username"
          className={`${INPUT_CLASS_NAME} mr-5 my-5 w-1/2 lg:w-1/4 inline`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={fetchRepositories}
          disabled={!username}
        >
          Load Repos
        </button>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div>
        {repositories && repositories.length > 0 ? (
          repositories.map((repo) => (
            <RepoItem
              key={repo.id}
              shareCounts={shareCounts}
              repo={repo}
              shareRepository={(repo) => shareRepository(repo)}
            />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export default GitHubRepos;
