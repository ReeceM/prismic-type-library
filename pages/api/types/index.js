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

    // cause I don't trust it...
    return;
  }

  let request = JSON.parse(body);

  if (Object.keys(request.customType).length <= 0) {
    res.status(422).json({ message: 'JSON content was empty?' })

    // cause I don't trust it...
    return;
  }

  const { status, data } = await octokit.issues.create({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO,
    title: `Type Submission: ${request.name} by ${request.author}`,
    body: createIssueBody(request),
    labels: ['New Type']
  })

  let response = {
    html_url: data?.html_url,
    title: data?.title,
  }

  if (status >= 200 && status < 300) {
    res.status(200).json(response)
    return
  }

  res.status(status).json(response)
  return
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
