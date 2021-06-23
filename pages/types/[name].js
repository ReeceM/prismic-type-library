import React, { useEffect, useState }  from 'react'
import fs from 'fs'
import path from 'path'
import Head from 'next/head';
import Error from 'next/error'
import Layout from '../../components/Layout'
import StatusBadge from '../../components/StatusBadge';

const CustomTypeView = ({ user, name, custom_type = null, links }) => {

  if (custom_type === null) {
    return <Error statusCode={404} title="That was not a Type that could be found"/>
  }

  const [show, setShow] = useState(false)
  const [ReactJson, setReactJson] = useState(null)

  useEffect(() => {
    import('react-json-view').then(result => setReactJson(result))
    return () => { }
  }, [])

  function showShare() {
    setShow(!show)

    setTimeout(() => {
      let element = document.querySelector("#share")
      element?.focus()
      element?.select()
    }, 5)
  }

  return (
    <>
      <Head>
        <title>{custom_type.name}{ user ? ` by ${user.name}` : '' }</title>
      </Head>
      <Layout menu={{ links }}>
        <section className="px-0 sm:px-3 md:px-20 pb-20 pt-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between w-full bg-white dark:bg-cool-gray-500 dark:text-cool-gray-50 rounded shadow py-4 px-3 md:p-6">
            <div className="order-2 md:order-1 flex">
              <div className="p-2 justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1 h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="block">
                <div className="mb-4">
                  <h2 className="flex text-2xl font-bold leading-7 text-gray-900 dark:text-cool-gray-100 sm:text-3xl sm:truncate">{custom_type.name}</h2>
                  <h3 className="text-sm text-gray-600 dark:text-cool-gray-200 mt-2">{custom_type.description}</h3>
                </div>
                <div className="mb-3">
                  <span className="text-sm mr-1">Status:</span>
                  <StatusBadge status={custom_type.status} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-cool-gray-200 mb-3">{'Uploaded By:'}</span>
                  {
                    user
                      ? <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-cool-gray-200">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-cool-gray-300">
                              <a href={user.html_url} className="hover:text-teal-500 hover:underline">@{user.login}</a>
                            </div>
                          </div>
                        </div>
                      : <span>User Not Found</span>
                  }
                </div>
              </div>
            </div>
            <div className="order-1 flex md:block m-1 justify-end w-full md:w-auto md:align-baseline">
              {show ? <input className="form-input ml-5 py-1" id="share" autoFocus value={location.href} /> : null}

              <button onClick={showShare}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          <hr className="bg-teal-100 m-4 h-1 border-none rounded" />
          <div className="bg-white dark:bg-cool-gray-700 shadow-lg rounded-lg  max-w-full max-h-screen overflow-scroll">
            <pre>
              <code>
                {
                  ReactJson
                    ? <ReactJson.default
                        src={custom_type.custom_type}
                        theme="ocean"
                        iconStyle="square"
                        displayDataTypes={false}
                      />
                    : <div className="flex flex-col w-full h-64 items-center align-middle justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-teal-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-green-500 to-blue-500 ">Loading</span>
                    </div>
                }
                {/* {JSON.stringify(custom_type.custom_type, null, 2)} */}
              </code>
            </pre>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps({params}) {
  const dir = path.resolve('./public', 'index.json');
  const file = fs.readFileSync(dir);
  const { data } = JSON.parse(file.toString())
  const custom_type = data?.filter(t => t.name === params.name)?.shift();
  const user = await fetchUser(custom_type?.username);

  return {
    props: {
      name: params.name,
      custom_type,
      user,
     },
  }
}


const fetchUser = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Unable to fetch user')

    return null
  }
}

export default CustomTypeView;
