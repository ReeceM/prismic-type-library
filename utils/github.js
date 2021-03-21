import { Octokit } from "@octokit/rest";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import { createAppAuth } from "@octokit/auth-app";

const ThrottledOctokit = Octokit.plugin(retry, throttling);

const octokit = new ThrottledOctokit({
  // auth: process.env.GITHUB_AUTH_TOKEN,
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.APP_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    privateKey: process.env.APP_PRIVATE_KEY,
    type: 'app',
    installationId: process.env.INSTALL_ID,
  },
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
  },
  retry: {
    doNotRetry: ["429"],
  },
});

export default octokit;
