const Footer = () => {
  return (
    <footer>
      <div className="text-gray-700 px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-teal-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>  */}
          <span className="ml-3 text-xl">Prismic Type Library</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©
        2020 - 2021 ReeceM —
        <a href="https://twitter.com/iexistin3d" className="text-gray-600 ml-1" rel="noopener noreferrer"
            target="_blank">@iexistin3d</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500 hover:text-gray-700 cursor-pointer"
            href="https://github.com/reecem/prismic-type-library?ref=netlify-app">
            <svg className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>GitHub</title>
              <path
                d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0">
              </path>
            </svg>
          </a>
          <a className="ml-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            href="https://twitter.com/iexistin3d">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              className="w-5 h-5" viewBox="0 0 24 24">
              <title>Twitter</title>
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
              </path>
            </svg>
          </a>
        </span>
      </div>
      <footer className="flex w-full justify-center text-sm pb-2">
        Proudly hosted on <a href="https://vercel.com" className="text-blue-600 cursor-pointer tracking-wide" rel="noopener noreferrer">&nbsp;▲Vercel</a>
      </footer>
    </footer>
  )
}

export default Footer;
