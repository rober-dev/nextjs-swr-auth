// @ts-nocheck
import I18nProvider from 'next-translate/I18nProvider'
import React from 'react'
import C, * as _rest from '../../../src/pages_/auth/register'
import ns0 from '../../../locales/en/common.json'
import ns1 from '../../../locales/en/layout.json'

const namespaces = { 'common': ns0, 'layout': ns1 }

export default function Page(p){
  return (
    <I18nProvider 
      lang="en" 
      namespaces={namespaces}  
      internals={{"defaultLanguage":"en","isStaticMode":true}}
    >
      <C {...p} />
    </I18nProvider>
  )
}

Page = Object.assign(Page, { ...C })

if(C && C.getInitialProps) {
  Page.getInitialProps = ctx => C.getInitialProps({ ...ctx, lang: 'en'})
}


export const getStaticProps = ctx => _rest.getStaticProps({ ...ctx, lang: 'en' })





