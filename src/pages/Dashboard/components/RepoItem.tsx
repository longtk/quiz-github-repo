import React from "react";
import ShareButton from "./ShareButton";
import { IRepository } from "@/api/api.type";

interface ShareCounts {
  [fullName: string]: {
    success: number;
    failure: number;
  };
}

interface RepoItemProps {
  repo: IRepository;
  shareCounts: ShareCounts;
  shareRepository: (repo: IRepository) => void;
}

const RepoItem = ({ repo, shareCounts, shareRepository }: RepoItemProps) => {
  return (
    <div className="items-center mt-3 bg-gray-50 rounded-lg shadow sm:flex ">
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.full_name}
          </a>
        </h3>
        <p className="mt-3 mb-4 font-light text-gray-500 ">
          {repo.description}
        </p>
        <div className="flex items-center mb-3">
          <div className="mr-2">Share on:</div>
          <ShareButton repo={repo} onClick={() => shareRepository(repo)} />
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="text-green-500">
            Success: {shareCounts[repo.full_name]?.success || 0}
          </div>
          <div className="text-red-500">
            Failure: {shareCounts[repo.full_name]?.failure || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
