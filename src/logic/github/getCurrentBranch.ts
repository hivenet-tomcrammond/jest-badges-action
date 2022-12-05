import { error, info } from '@actions/core';
import { readFileSync } from 'fs-extra';

import { GithubEvent } from '../../types/github';

export const getCurrentBranch = (): string | undefined => {
  let event: GithubEvent;
  try {
    event = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH as string, {
        encoding: 'utf8',
      }),
    );
  } catch (err) {
    error(`🔹 Getting path failed: ${err}`);
    return undefined;
  }

  const currentBranch = event.ref?.split('/').slice(2).join('/');
  info(`event is: ${event}`);
  info(`event.ref is: ${event.ref}`);
  info(`currentBranch is: ${currentBranch}`);

  return currentBranch;
};
