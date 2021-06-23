import React from 'react'
import NextApp from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/index.css'

let links = [
  { href: '/', label: 'Custom Types' },
  { href: '/types/create', label: 'Submit a Type' },
  { href: 'https://github.com/ReeceM/prismic-type-library/discussions', label: 'Help' },
  { href: 'https://github.com/ReeceM/prismic-type-library', label: 'Readme' },
  { href: 'https://prismic.io', label: 'Prismic CMS' },
];

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Component {...pageProps} links={ links } />
    )
  }
}
