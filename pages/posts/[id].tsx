import { NextPage } from 'next'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

type PostProps = {
    postData: {
        title: string
        date: string
        id: string
        contentHtml: string
    }
}

const Post: NextPage<PostProps> = ({ postData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

const getStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

const getStaticProps = async ({
    params
}: {
    params: { id: string }
}) => {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default Post
export { getStaticPaths, getStaticProps }