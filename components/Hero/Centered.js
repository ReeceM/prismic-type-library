import React from 'react'

const Centered = ({ slice }) => (
  <section className="text-gray-700 body-font">
    <div className="container px-8 py-20 mx-auto lg:px-4">
      <div className="flex flex-col w-full mb-12 text-left lg:text-center">
        {
          slice?.eyebrow ?
            <h2 className="mb-1 text-xs font-semibold tracking-widest text-teal-600 uppercase title-font">{slice.eyebrow}</h2>
            : null
        }

        <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-gray-800 dark:text-gray-100 sm:text-5xl title-font">
          {slice.title}
        </h1>
        <p className="mx-auto text-base font-medium leading-relaxed text-gray-700 dark:text-gray-100 lg:w-2/3">
          {slice.description}
        </p>
      </div>
      {/* <div className="flex lg:justify-center">
        <button
          className="inline-flex px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
          Button
        </button>
        <button
          className="inline-flex items-center px-6 py-2 ml-4 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg shadow-xl hover:border-gray-600 hover:bg-gray-600 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
          Button
        </button>
      </div> */}
    </div>
  </section>
)


export default Centered;
