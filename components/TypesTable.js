import Table from "./Table";

const EmptyState = () => (
  <div className="w-full flex flex-col items-center border p-4 bg-gray-50 shadow rounded-md dark:bg-gray-700 dark:text-white">
    <figure className="inline-block relative mb-4 p-6">
      <img className="max-w-2xl object-center object-cover rounded" src="undraw_empty_street_sfxm.svg" alt="" />
      <figcaption className="absolute bottom-0 flex items-center justify-center rounded-tr bg-cool-gray-800 opacity-25 text-white px-4 text-sm">
        UnDraw
      </figcaption>
    </figure>
    <div className="w-full text-center">
      <span className="text-lg leading-loose py-3 font-thin">Well, so far there isn't much submitted, or, there is a whole bunch of things :)</span>
    </div>
  </div>
)

function useDownloadRoute(type) {
  return `/api/types/download/${type.sha}`
}

const TypesTable = ({ types }) => (

  types?.length >= 1
    ? (
      <Table>
        {
          types.map((type, index) => (
            <Table.Row key={index}>
              <Table.Column>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${type.author}&color=7F9CF5&background=EBF4FF`}
                      alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {type.author}
                    </div>
                    {
                      type?.username ?
                        <div className="text-sm text-gray-500">
                          {type.username}
                        </div> : null
                    }
                  </div>
                </div>
              </Table.Column>
              <Table.Column>
                <div className="text-sm text-gray-900">{type.name}</div>
                <div className="text-sm text-gray-500">{type.description}</div>
              </Table.Column>
              <Table.Column>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${type.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {
                    type.status
                      ? 'Reviewed'
                      : 'Pending'
                  }
                </span>
              </Table.Column>
              <Table.Column className="text-right text-sm font-medium">
                <a href={useDownloadRoute(type)} title="download" className="text-teal-600 hover:text-teal-900">
                  <span className="sr-only">Download</span>
                  <svg className="w-6 h-6" title="download" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </Table.Column>
            </Table.Row>
          ))
        }
      </Table >
    )
    : <EmptyState />

)

export default TypesTable;
