import React, { useState } from 'react'
import Head from 'next/head';
import Layout from '../../components/Layout'
import JsonInput from '../../components/JsonInput';
import DragDrop from '../../components/DragDrop';

export default function CreatePage({ links }) {

  const [username, setUsername] = useState()
  const [author, setAuthor] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState(null)
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [useInput, setUseInput] = useState(false)

  const [customType, setCustomType] = useState({
    author: author,
    username: username,
    name: name,
    description: description,
    license: 'MIT',
    created_at: (new Date()).toJSON(),
    custom_type: {},
  })

  function handleSubmit(e) {
    e.preventDefault()

    setLoading(true);

    // handle the honeypot value
    if (website.length >= 1) {
      window.location.href = 'https://www.youtube.com/watch?v=YddwkMJG1Jo'
      return;
    }

    if (file instanceof FileList || file instanceof File) {
      let reader = new FileReader();
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

    if (!Array.isArray(file)) {
      create({
        name,
        username,
        description,
        customType,
        author
      });

      return;
    }

  }

  function create(type) {
    fetch('/api/types', {
      method: 'POST',
      body: JSON.stringify(type),
    })
      .then(response => {
        setError(false)
        if (response.status >= 200 && response.status < 300) {
          setSuccess({
            message: '🎉 New Type Submitted',
            url: response.html_url,
            title: response.title
          })
        }

        console.debug(response)
      })
      .catch(error => {
        setSuccess(false)
        setError(error.message)
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
      <Layout menu={{links}}>
        <section className="py-8 px-0 md:px-12 mx-auto">
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
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 sm:col-span-1">
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

                        <div className="col-span-2 sm:col-span-1">
                          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
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
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
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
                        <div className="inline-flex w-full justify-end">
                          <button
                            onClick={e => setUseInput(!useInput)}
                            className="text-teal-400 text-xs font-semibold font-mono"
                            type="button"
                          >
                            {
                              !useInput
                                ? (
                                  <span className="inline-flex align-middle items-center">
                                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Paste Markup
                                  </span>
                                )
                                : (
                                  <span className="inline-flex align-middle items-center">
                                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Upload File
                                  </span>
                                )}
                          </button>
                        </div>

                        {
                          useInput === false
                            ? (
                              <DragDrop
                                id="file_drop_zone"
                                onDropEvent={droppedFile => document.querySelector('#file-upload').files = droppedFile}
                                onDragStart={e => console.log(e)}
                                onDragEnd={e => console.log(e)}
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md relative"
                                activeClass="border-teal-300 bg-white z-10"
                                inactiveClass="border-gray-300"
                              >
                                 <div className="space-y-1 text-center">
                                    {
                                      file
                                        ?
                                        <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        :
                                        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">JSON </p>
                                  </div>
                              </DragDrop>
                            )
                            :
                            <JsonInput
                              newJson={customType.custom_type}
                              onUpdated={e => customType.custom_type = e}
                            />
                        }

                      </div>
                    </div>
                    <input type="url" name="website" placeholder="what was it that Pooh Bear got honey from, this is that" id="website" onChange={e => setWebsite(e.target.value)} className="sr-only" aria-disabled="true" />
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        {!loading ? 'Submit' : 'Sending...'}
                      </button>
                    </div>
                    {
                      error
                        ? (
                          <div className="text-red-600  bg-red-100 rounded-b px-6 py-3">
                            ❌ {error}
                          </div>
                        )
                        : null
                    }
                    {
                      success
                        ? (
                          <div className="text-green-600 bg-green-100 rounded-b px-6 py-3 tracking-wider leading-loose">
                            <strong>{success.message}</strong> - View Issue: <a href={success.url} className="hover:underline">{success.title ? success.title : success.url}</a>
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

  return {
    props: {  },
  }
}
