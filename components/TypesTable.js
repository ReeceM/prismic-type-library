import Table from "./Table";
import StatusBadge from './StatusBadge'
import { DownloadIcon, EyeIcon } from "@heroicons/react/outline";

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

function useViewRoute(type) {
  return `/types/${type.name}`
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
                    <div className="text-sm font-medium text-gray-900 dark:text-cool-gray-100">
                      {type.author}
                    </div>
                    {
                      type?.username ?
                        <div className="text-sm text-gray-500 dark:text-cool-gray-200">
                          {type.username}
                        </div> : null
                    }
                  </div>
                </div>
              </Table.Column>
              <Table.Column>
                <div className="text-sm text-gray-900 dark:text-cool-gray-200">{type.name}</div>
                <div className="text-sm text-gray-500 dark:text-cool-gray-300 mt-1 leading-relaxed">
                  <p className="w-screen md:max-w-xs whitespace-normal">{type.description}</p>
                </div>
              </Table.Column>
              <Table.Column>
                  <StatusBadge status={type.status} />
              </Table.Column>
              <Table.Column className="text-right text-sm font-medium">
                <div className="flex flex-row gap-6 md:gap-2 justify-evenly">
                  <a
                    href={useDownloadRoute(type)}
                    title={`download type ${type.name}`}
                    className="text-teal-600 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-50">
                      <span className="sr-only">Download {type.name}</span>
                      <DownloadIcon className="w-6 h-6" aria-hidden="true"/>
                  </a>

                  <a
                    href={useViewRoute(type)}
                    title={`view type ${type.name}`}
                    className="text-teal-600 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-50">
                      <span className="sr-only">View {type.name}</span>
                      <EyeIcon className="w-6 h-6" />
                  </a>
                </div>
              </Table.Column>
            </Table.Row>
          ))
        }
      </Table >
    )
    : <EmptyState />

)

export default TypesTable;
