import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Logo from '../Logo';

function activeStyle(router, href) {
  return router.pathname == href
    ? 'text-white bg-teal-900 '
    : 'text-teal-300 hover:text-white hover:bg-teal-700'
}
const Navbar = ({ secondary, openSettings, openShareModal, links }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-teal-800" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-teal-100 hover:text-teal-400">
              <Link href="/">
                <a href="/" className="flex gap-1 items-center ">
                  <Logo className="w-8 h-8" />
                  {/* <span className="ml-2 mr-auto">Prismic Type Library</span> */}
                </a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline">
                {links ? links.map(({ href, label }) => (
                  <Link href={href} key={`${href}${label}`}>
                    <a
                      className={
                        `px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-teal-700 mr-4 ${activeStyle(router, href)}`
                      }
                    >
                      {label}
                    </a>
                  </Link>
                )) : null}
              </div>
            </div>
          </div>
          {secondary ? (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={openSettings}
                  className="p-1 border-2 border-transparent text-teal-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-teal-700">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Settings</title>
                    <path
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                    </path>
                  </svg>
                </button>
                <button
                  onClick={openShareModal}
                  className="p-1 border-2 border-transparent text-teal-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-teal-700">
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><title>Share</title><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                </button>
              </div>
            </div>
          ) : null}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setMobileMenu(!mobileMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 focus:text-white"
              aria-label="Main menu">
              <svg name="hamburger" className={"h-6 w-6 block " + (mobileMenu ? 'hidden' : 'block')} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>

              <svg name="close" className={"h-6 w-6 " + (mobileMenu ? 'block' : 'hidden')}
                stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button >
          </div >
        </div >
      </div >
      <div className={mobileMenu ? 'block' : 'hidden'} >
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {links ? links.map(({ href, label }, index) => (
            <Link href={href} key={`${href}${label}`}>
              <a
                className={
                  `block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-teal-700 ${activeStyle(router, href)}`
                  + (index >= 1 ? 'mt-1' : '')
                }
              >
                {label}
              </a>
            </Link>
          )) : null}
        </div>
        {secondary ? (
          <div className="pt-4 pb-3 border-t border-teal-700">
            <div className="px-2">
              <button
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700">Settings</button>
              <button
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700">Share</button>
            </div >
          </div>) : null}
      </div >
    </nav >
  )
}
// export async function getStaticProps() {

//   return {
//     links: links,
//     props: {
//       links: links,
//       secondary: null,
//       openSettings: () => {},
//       openShareModal: () => {},
//     }
//   };
// }

export default Navbar;
