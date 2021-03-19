import React, { useState } from 'react'
import Head from 'next/head';
import Layout from '../../components/Layout'

export default function CreatePage({ links }) {

  const [username, setUsername] = useState()
  const [author, setAuthor] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    //
    let reader = new FileReader()
    let customType = {
      author: author,
      username: username,
      name: name,
      description: description,
      // license: '',
      custom_type: {},
    };
    reader.onload = (e) => {
      customType.custom_type = JSON.parse(e.target.result);

      console.log({
        file, name, username, description, customType, author
      })

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
      .then(response => console.debug(response));
  }

  return (
    <>
      <Head>
        <title>Create New Type</title>
      </Head>
      <Layout menu={{ links: links }}>
        <section className="p-6 flex justify-center">
          <form action="#" method="post" onSubmit={handleSubmit}>

            <div className="mb-3 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
            </label>
              <input
                onChange={e => setUsername(e.target.value)}
                type="text" name="username" id="username" className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="custom-type-blog-post" />
            </div>
            <div className="mb-3 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Author
            </label>
              <input
                onChange={e => setAuthor(e.target.value)}
                type="text" name="author" id="author" className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="custom-type-blog-post" />
            </div>
            <div className="mb-3 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
            </label>
              <input
                onChange={e => setName(e.target.value)}
                type="text" name="name" id="name" className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="custom-type-blog-post" />
            </div>
            <div className="mb-3 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
            </label>
              <input
                onChange={e => setDescription(e.target.value)}
                type="text" name="description" id="description" className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="custom-type-blog-post" />
            </div>
            <input type="url" name="website" placeholder="what was it that Pooh Bear got honey from, this is that" id="website" onChange={ e => setWebsite(e.target.value)} className="sr-only" aria-disabled="true"/>

            <input id="file-upload" name="file-upload" type="file" onChange={e => setFile(e.target.files)} />
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Create
          </button>
          </form>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = [
    { href: '/', label: 'Custom Types' },
    { href: '#', label: 'Submit a Type' },
    { href: 'https://github.com/ReeceM/prismic-type-library/discussions', label: 'Help' },
    { href: 'https://github.com/ReeceM/prismic-type-library', label: 'Readme' },
    { href: 'https://prismic.io', label: 'Prismic CMS' },
  ];

  return {
    props: { links },
  }
}
