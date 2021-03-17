import { Transition } from '@headlessui/react'
import { useState } from 'react'
import  ModalFooter  from './ModalFooter';

export default function Modal({ children, show }) {

  const [showModal, setShowModal] = useState(show)

  return (
    <div
      className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <Transition
        show={showModal}
        enter="transition-opacity ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"

      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </Transition>

      <Transition
        show={showModal}
        enter="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {modalIcon ? modalIcon : (<div
                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                  </path>
                </svg>
              </div>)}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    {description}
                  </p>
                </div>
                <div className="mt-3 border-t-2 border-gray-100">
                  <div className="pt-3 h-64 md:min-h-full inline-block w-full overflow-y-scroll p-1">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ModalFooter actions={[
            {
              label: 'Save',
              primary: true,
              action: () => {

                setShowModal(false)
              }
            },
            {
              label: 'Cancel',
              primary: false,
              action: (e) => {
                setShowModal(false)
              }
            }
          ]} />
        </div>
      </Transition>
    </div >
  )
}

