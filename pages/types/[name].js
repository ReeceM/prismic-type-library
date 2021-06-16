import React from 'react'
import fs from 'fs'
import path from 'path'
import Head from 'next/head';
import Layout from '../../components/Layout'
// import ReactJson from 'react-json-view'

const CustomTypeView = ({name, custom_types = [], links }) => {


  let custom_type = custom_types.filter(t => t.name === name)[0];

  return (
    <>
      <Head>
        <title>{ custom_type.name }</title>
      </Head>
      <Layout menu={{links}}>
        <pre style={{
          padding: '1rem'
        }}>
          <code>
            {JSON.stringify(custom_type, null, 2)}
          </code>
        </pre>
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
