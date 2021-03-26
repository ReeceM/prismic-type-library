import React, { useState } from 'react'
import Image from 'next/image';
import { Transition } from '@headlessui/react'

const Alert = ({ message: { title, mobileHeadline, description, link, linkText }, img, isOpen, updateShow}) => {

  const [show, setShow] = useState(isOpen)

  return (
    <Transition
      show={show}
      enter="ease-out duration-500"
      enterFrom="opacity-0 scale-95 translate-y-2"
      enterTo="opacity-100 scale-100 translate-y-0"
      leave="ease-in duration-300"
      leaveFrom="opacity-100 scale-100 translate-y-0"
      leaveTo="opacity-0 scale-95 translate-y-2"
      className="transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5"
    >
      <div>
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
          <div className="p-2 rounded-lg bg-teal-900 shadow-lg sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                {
                  img ? <Image src={img} layout="fill" /> : null
                }
                <p className="ml-3 font-medium text-white truncate">
                  <span className="lg:hidden">{mobileHeadline}</span>
                  <span className="hidden lg:inline text-teal-400">
                    <strong className="text-white font-semibold mr-1">{title}</strong>
                    {/* <span className="xl:hidden">{description}</span> */}
                    <span className="hidden xl:inline">{description}</span>
                  </span>
                </p>
              </div>
              {
                link
                  ? (
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <div className="rounded-md shadow-sm">
                        <a href={link} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-teal-900 bg-white hover:text-teal-800 focus:outline-none focus:underline">
                          {linkText}
                        </a>
                      </div>
                    </div>
                  ) : null
              }
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button onClick={e => { setShow(false); updateShow(false)}}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-teal-800 focus:outline-none focus:bg-teal-800"
                >
                  <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Alert;
