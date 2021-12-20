import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

const getSortedPostsData = () => {
  // /postディレクトリ配下のファイルの名前を取得
  const fileNames = fs.readdirSync(postsDirectory)

  // ファイル名とファイル内容から投稿データを作成
  const allPostsData = fileNames.map(fileName => {
    // ファイル名から ".md" を削除してIDとする
    const id = fileName.replace(/\.md$/, '')

    // マークダウン形式ファイルの内容を読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matterを使い投稿のメタデータを読み取る
    const matterResult = matter(fileContents)

    // メタデータとIDを1つにまとめる
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })

  // 日付で投稿をソートする
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)

  // 次のような配列が返される：
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

const getPostData = (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // gray-matterを使い投稿のメタデータを読み取る
  const matterResult = matter(fileContents)

  // メタデータとIDを1つにまとめる
  return {
    id,
    ...(matterResult.data as { date: string; title: string })
  }
}

export { getSortedPostsData, getAllPostIds, getPostData }