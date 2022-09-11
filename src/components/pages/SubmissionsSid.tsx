/* eslint-disable react/jsx-props-no-spreading */
import { LinearProgress } from '@mui/material'
import axios from 'axios'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { CodeBlock, dracula, github } from 'react-code-blocks'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import languages from '../data/Languages'
import { useBeforeLoginMutators } from '../states/beforeLogin'

interface Submission {
  id: number
  date: string
  author: string
  problem_id: number
  testcase_num: number
  task_ids: number[]
  result: string
  language_id: number
  source: string
}

function ProblemsPid() {
  const setBeforeLogin = useBeforeLoginMutators()
  const location = useLocation()
  useEffect(() => {
    setBeforeLogin(location.pathname)
  }, [])

  const params = useParams<{
    submission_id: string
  }>()
  const [loading, setLoading] = useState(true)
  const [submissionNotFound, setSubmissionNotFound] = useState(true)
  const [submission, setSubmission] = useState<Submission>({
    id: 0,
    date: '0000-00-00 00:00:00',
    author: '',
    problem_id: 0,
    testcase_num: 0,
    task_ids: [],
    result: 'WJ',
    language_id: -1,
    source: ''
  })
  const navigate = useNavigate()
  function copy(content: string) {
    navigator.clipboard.writeText(content)
  }
  function codeblockLanguage(s: Submission): String {
    if (languages[s.language_id]?.language.startsWith('python')) return 'python'
    if (languages[s.language_id]?.language.startsWith('cpp')) return 'cpp'
    return 'text'
  }

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL
    axios
      .get<Submission>(`${api}/submissions/${params.submission_id}`, {
        withCredentials: true
      })
      .then((res) => {
        setSubmission(res.data)
        setLoading(false)
      })
      .catch((err) => {
        if (Axios.isAxiosError(err)) console.log(err.status)
        setLoading(false)
        setSubmissionNotFound(true)
        setTimeout(() => {
          navigate('/submissions')
        }, 2000)
      })
  }, [])
  return (
    <div className="bg-local bg-gradient-to-bl from-heroyellow-100 to-cyan-100">
      <div className="m-auto p-6 md:p-8 max-w-11/12 shadow-lg bg-light-50">
        {submissionNotFound ? (
          <div>
            <div className="text-3xl mb-6 font-semibold">
              Submission Not Found
            </div>
            <div>Redirecting...</div>
          </div>
        ) : (
          <div>
            <div className="text-3xl mb-6 flex">
              <div className="mx-2">Submission </div>
              <div className="mx-1 font-semibold">#</div>
              <div className="font-semibold">{submission.id}</div>
            </div>
            {loading ? (
              <LinearProgress />
            ) : (
              <div>
                <div className="text-xl my-2">Source</div>
                <div className="px-2 text-base font-mono border rounded shadow flex justify-between">
                  <CodeBlock
                    text={submission.source}
                    language={codeblockLanguage(submission)}
                    showLineNumbers="true"
                    theme={github}
                  />
                  <button
                    onClick={() => {
                      copy(submission.source)
                    }}
                    type="button"
                    className="text-sm px-1 my-2 mb-auto rounded ring-1 hover:ring-2 active:bg-gray-100"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-xl my-2">Info</div>
                <div className="table w-full text-base border rounded shadow flex justify-between">
                  <div className="table-row-group">
                    <div className="table-cell p-1.5 border">date</div>
                    <div className="table-cell p-1.5 border">
                      {submission.date}
                    </div>
                  </div>
                  <div className="table-row-group">
                    <div className="table-cell p-1.5 border">problem</div>
                    <div className="table-cell p-1.5 border">
                      {submission.problem_id}
                    </div>
                  </div>
                  <div className="table-row-group">
                    <div className="table-cell p-1.5 border">user</div>
                    <div className="table-cell p-1.5 border">
                      {submission.author}
                    </div>
                  </div>
                  <div className="table-row-group">
                    <div className="table-cell p-1.5 border">language</div>
                    <div className="table-cell p-1.5 border">
                      {languages[submission.language_id]?.label}
                    </div>
                  </div>
                  <div className="table-row-group">
                    <div className="table-cell p-1.5 border">result</div>
                    <div className="table-cell p-1.5 border">
                      {submission.result}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProblemsPid
