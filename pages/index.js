import Layout from '../components/Layout';
import Head from 'next/head';
import Banner from '../components/Banner'
import { CenteredHero } from '../components/Hero'
import TypesTable from '../components/TypesTable';
import { useEffect, useState } from 'react';
export default function IndexPage({ links }) {

  const [types, setTypes] = useState([])

  useEffect(() => {

    fetch('index.json')
      .then(res => res.json())
      .then((res) => {
        setTypes(res.data);
      })
      .catch(e => {
        console.error(e)
      })

    return () => { }
  }, [])

  return (
    <>
      <Head>
        <title>(Unofficial) Prismic Type Library</title>
      </Head>
      <Layout menu={{ links: links }}>

        {/* <Banner slice={{
          shortMessage: "hello",
          longMessage: 'This is the description',
          link: '#',
          linkText: 'The Link'
        }}
        /> */}

        <CenteredHero
          slice={{
            eyebrow: "Prismic Type Library",
            title: "Hello to an Unofficial Prismic Types Library",
            description: "This is a repo of sorts for a collection of Prismic Custom Types for various aspects of a CMS",
          }}
        />

        <main className="pb-20">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" >
            <TypesTable types={types} />
          </div>
        </main>
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
