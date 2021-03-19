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

  console.log(request)

  const data = await octokit.issues.create({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO,
    title: `[new Type] ${request.name} by ${request.author}`,
    body: createIssueBody(request)
  })

  console.log(data);
  res.status(200).json({ data })
}

function createIssueBody(data) {


  return `
Submission of new type by ${data.author}

/cc @${data.username}

The type file compiled:
\`\`\`json
${JSON.stringify(data.customType, null, 2)}
\`\`\`
`
}
