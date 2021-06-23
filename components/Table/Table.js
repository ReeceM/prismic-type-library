import React from 'react'

const Table = ({ children }) => (
<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-900 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-900">
          <thead className="bg-gray-50 dark:bg-cool-gray-600">
            <tr className="sticky top-0">
              <th scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-cool-gray-50 uppercase tracking-wider">
                Name
              </th>
              <th scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-cool-gray-50 uppercase tracking-wider">
                Description
              </th>
              <th scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-cool-gray-50 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-cool-gray-500 divide-y divide-gray-200 dark:divide-gray-900">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
)

export default Table;
