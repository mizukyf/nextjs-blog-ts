import { NextPage } from 'next'
import Layout from '../../components/layout'
import { PostData, getAllPostIds, getPostData } from '../../lib/posts'

type PostProps = {
    postData: PostData
}

const Post: NextPage<PostProps> = ({ postData }) => {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
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

const getStaticProps = ({
    params
}: {
    params: { id: string }
}) => {
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default Post
export { getStaticPaths, getStaticProps }