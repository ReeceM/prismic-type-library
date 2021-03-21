import React, { useState } from 'react'
import Head from 'next/head';
import Layout from '../../components/Layout'

export default function CreatePage({ links }) {

  const [username, setUsername] = useState()
  const [author, setAuthor] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    setLoading(true);

    // handle the honeypot value
    if (website.length >= 1) {
      window.location.href = 'https://www.youtube.com/watch?v=YddwkMJG1Jo'
      return;
    }

    let reader = new FileReader();

    let customType = {
      author: author,
      username: username,
      name: name,
      description: description,
      license: 'MIT',
      custom_type: {},
    };

    reader.onload = (e) => {
      try {
        customType.custom_type = JSON.parse(e.target.result);
      } catch (e) {
        setError(e.toString());
        setLoading(false);
      }

      create({
        name,
        username,
        description,
        customType,
        author
      });
    }

    reader.readAsText(file[0])
  }

  function create(type) {
    fetch('/api/types', {
      method: 'POST',
      body: JSON.stringify(type),
    })
      .then(response => console.debug(response))
      .catch(error => {

      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Create New Type</title>
      </Head>
      <Layout menu={{ links: links }}>
        <section className="py-8 px-12 mx-auto">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="mb-5 text-3xl font-medium leading-6 text-gray-900">Submit a Type</h3>
                  <p className="mt-1 text-sm text-gray-600">Use this form to create a new issue on the type library to have it added to the list. Currently it will be manually reviewed and added</p>
                  <p className="mt-1 text-sm text-gray-600">I suggest using your Github username, what I will do is add your name as a <code className="px-0.5 py-0.5 text-xs rounded-sm tracking-wide">`.CODEOWNER`</code> when making the type entry</p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST" onSubmit={handleSubmit}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label htmlFor="username"
                            className="block text-sm font-medium text-gray-700">Username</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span
                              className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                            <input
                              id="username"
                              name="username"
                              onChange={e => setUsername(e.target.value)}
                              type="text"
                              required={true} aria-required={true}
                              className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder="Github username" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label for="author" className="block text-sm font-medium text-gray-700">
                          Author Name
                            </label>
                        <div className="mt-1">
                          <input
                            onChange={e => setAuthor(e.target.value)}
                            type="text"
                            required={true}
                            aria-required={true}
                            name="author"
                            id="author"
                            className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                            placeholder="Your Name" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Please place your name here please
                        </p>
                      </div>

                      <div>
                        <label for="description" className="block text-sm font-medium text-gray-700">
                          Description
                            </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            required={true}
                            onChange={e => setDescription(e.target.value)}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="This is a type library for a simple Blog Layout"></textarea>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description of the Custom Type, don't make it tooooo long :)
                        </p>
                      </div>

                      <div>
                        <label for="author" className="block text-sm font-medium text-gray-700">
                          Custom Type Name
                            </label>
                        <div className="mt-1">
                          <input
                            onChange={e => setName(e.target.value)}
                            type="text"
                            required={true}
                            aria-required={true}
                            name="name"
                            id="name"
                            className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                            placeholder="Blog Post Example"
                        />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          A readable name for your Type, like what is shown in the writing room
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          JSON File
                        </label>
                        <div
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                        >
                          <div className="space-y-1 text-center">
                            {
                              file
                                ?
                            <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                                :
                            <svg className="mx-auto h-12 w-12 text-gray-400"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            }
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                                <span>Upload a file</span>
                                <input
                                  required={true}
                                  aria-required={true}
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  onChange={e => setFile(e.target.files)}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or <s>drag</s> and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">JSON </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type="url" name="website" placeholder="what was it that Pooh Bear got honey from, this is that" id="website" onChange={e => setWebsite(e.target.value)} className="sr-only" aria-disabled="true" />
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        Submit
                      </button>
                    </div>
                    {
                      error
                        ? (
                          <div>
                            {error}
                          </div>
                        )
                        : null
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>


        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = [
    { href: '/', label: 'Custom Types' },
    { href: '/types/create', label: 'Submit a Type' },
    { href: 'https://github.com/ReeceM/prismic-type-library/discussions', label: 'Help' },
    { href: 'https://github.com/ReeceM/prismic-type-library', label: 'Readme' },
    { href: 'https://prismic.io', label: 'Prismic CMS' },
  ];

  return {
    props: { links },
  }
}
