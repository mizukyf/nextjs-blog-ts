import { NextPage } from 'next'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'

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

            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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