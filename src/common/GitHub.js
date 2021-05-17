const { Octokit } = require('@octokit/core');

const octokit = new Octokit({
  auth: `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`,
});

class GitHub {
  static async latestReleases(owner, repo) {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/releases/latest',
      {
        owner,
        repo,
      }
    );

    return response.data;
  }

  static async package(owner, repo) {
    const response = await octokit.request(
      'GET https://raw.githubusercontent.com/{owner}/{repo}/master/package.json',
      {
        owner,
        repo,
      }
    );

    return response.data;
  }
}

module.exports = GitHub;
