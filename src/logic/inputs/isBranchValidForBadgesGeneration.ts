import { error, getInput, info } from '@actions/core';

import { getCurrentBranch } from '../github/getCurrentBranch';

export const isBranchValidForBadgesGeneration = (): boolean => {
  const currentBranch = getCurrentBranch();
  if (!currentBranch) {
    error(
      `🔶 Unable to get current branch from github event. currentBranch is: ${currentBranch}`,
    );

    return false;
  }

  let branches = getInput('branches').split(',');
  if (branches.length === 1 && branches[0].length === 0) {
    info(`🔶 No branches specified, defaulting to master and main`);
    branches = ['master', 'main'];
  }

  return branches.includes(currentBranch);
};
