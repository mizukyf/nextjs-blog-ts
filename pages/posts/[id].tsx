import { NextPage } from 'next'
import Layout from '../../components/layout'
import { getAllPostIds } from '../../lib/posts'

const Post : NextPage = () => {
    return <Layout>...</Layout>
}

const getStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default Post
export { getStaticPaths }