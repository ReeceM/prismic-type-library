import React from 'react'
import fs from 'fs'
import path from 'path'
import Head from 'next/head';
import Error from 'next/error'
import Layout from '../../components/Layout'
import { useState } from 'react';
// import ReactJson from 'react-json-view'

const CustomTypeView = ({ name, custom_types = [], links }) => {

  let custom_type = custom_types.filter(t => t.name === name);

  if (custom_type.length <= 0) {
    return <Error statusCode={404} title="That was not a Type that could be found"/>
  }

  custom_type = custom_type[0]

  const [show, setShow] = useState(false)

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
        <title>{ custom_type.name }</title>
      </Head>
      <Layout menu={{ links }}>
        <section className="px-20 pb-20 pt-3 mx-auto">
          <div className="flex justify-end w-full p-4">
            <div className="flex flex-row align-middle">
            {show ? <input className="form-input ml-5 py-1" id="share" autoFocus value={location.href} /> : null}

            <button onClick={showShare}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg px-12 py-4 max-w-full max-h-screen overflow-scroll">
            <pre>
              <code >
                {JSON.stringify(custom_type.custom_type, null, 2)}
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
  let file = fs.readFileSync(dir);
  let { data } = JSON.parse(file.toString())

  return {
    props: {
      name: params.name,
      custom_types: data,
     },
  }
}

export default CustomTypeView;
