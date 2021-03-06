import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

const github = axios.create({
  baseURL: GITHUB_URL,
})

//Search users (testing purpose)
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

  const { items } = await response.json()

  console.log(items)

  return items
}

export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 5,
  })

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ])
  return { user: user.data, repos: repos.data }
}
