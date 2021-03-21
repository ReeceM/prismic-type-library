/**
 * On post create a new type library.
 */
import octokit from '../../../utils/github';

export default async function handler(req, res) {

  const {
    query,
    body,
    method
  } = req

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  let request = JSON.parse(body);

  const { status, data } = await octokit.issues.create({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO,
    title: `Type Submission: ${request.name} by ${request.author}`,
    body: createIssueBody(request),
    labels: ['New Type']
  })

  if (status >= 200 && status < 300) {
    res.status(200).json({ data })
  }

  res.status(status).json({ data })
}

function createIssueBody(data) {


  return `
Submission of new type by ${data.author}

/cc ${data.username}

<details>
<summary>The compiled type file for indexing: </summary>

\`\`\`json
${JSON.stringify(data.customType, null, 2)}
\`\`\`
</details>

${(new Date()).toJSON()}
`;
}
