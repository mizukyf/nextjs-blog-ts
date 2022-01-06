import type { NextPage } from 'next'
import Layout from '../../components/layout'
import Head from 'next/head'
import Link from 'next/link'

const FirstPost: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}

export default FirstPost