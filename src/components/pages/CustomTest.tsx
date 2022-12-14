import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-github'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { useLocation } from 'react-router-dom'
import ResultCode from '../blocks/ResultCode'
import languages, { editorMode, Language } from '../data/Languages'
import { useBeforeLoginMutators } from '../states/beforeLogin'
import {
  useCustomTestSourceMutators,
  useCustomTestSourceState
} from '../states/customTestSourceState'

interface PostExecuteRequest {
  language_id: number
  source: string
  input: string
}

type AutocompleteOption = Language

interface PostExecuteResponse {
  output: string
  status_code: number
  result: string
  memory: string
  cpu_time: string
}

function CustomTest() {
  const api = import.meta.env.VITE_API_URL
  const setBeforeLogin = useBeforeLoginMutators()
  const location = useLocation()
  useEffect(() => {
    setBeforeLogin(location.pathname)
  }, [])

  // const [source, setSource] = useState('')
  const source = useCustomTestSourceState()
  const setSource = useCustomTestSourceMutators()
  const [input, setInput] = useState('')
  const [task, setTask] = useState<PostExecuteResponse>({
    output: '',
    status_code: -1,
    result: 'WJ',
    memory: '-1',
    cpu_time: '-1'
  })
  const [language, setLanguage] = useState<Language>({
    id: 0,
    label: 'C++ 17 / GCC 11.1.0',
    language: 'C++ 17',
    language_code: 'cpp17',
    version: 'GCC 11.1.0',
    version_index: '1'
  })
  const [executing, setExecuting] = useState(false)
  const [executeLoading, setExecuteLoading] = useState(true)
  function execute() {
    setTask({
      output: '',
      status_code: -1,
      result: 'WJ',
      memory: '-1',
      cpu_time: '-1'
    })
    setExecuting(true)
    setExecuteLoading(false)
    axios
      .post<PostExecuteResponse>(
        `${api}/execute`,
        ((): PostExecuteRequest => ({
          language_id: language.id,
          source: source.source,
          input
        }))(),
        { withCredentials: true }
      )
      .then((res) => {
        setTask(res.data)
        // console.log(res.data)
        setExecuting(false)
      })
      .catch((err) => {
        setTask({
          output: '',
          status_code: -1,
          result: 'UE',
          memory: '-1',
          cpu_time: '-1'
        })
        setExecuting(false)
        if (axios.isAxiosError(err) && err.response) {
          console.log(err)
        }
      })
  }

  return (
    <div className="bg-local bg-gradient-to-bl from-heroyellow-100 to-cyan-100 pb-4">
      <div className="m-auto p-2 md:p-6 max-w-11/12 shadow-lg bg-light-50">
        <h1 className="text-2xl m-2 mb-3 md:(text-3xl mb-6)">Custom Test</h1>
        <div className="text-xl my-2 m-auto md:max-w-11/12">
          <div className="m-2">Source</div>
          <AceEditor
            highlightActiveLine={false}
            mode={editorMode(language)}
            theme="github"
            defaultValue={source.source}
            onChange={(s) => {
              setSource(s)
            }}
            name="customTestSource"
            width="100%"
            // setOptions={{
            //   enableBasicAutocompletion: true,
            //   enableLiveAutocompletion: true,
            //   enableSnippets: true
            // }}
            minLines={10}
            maxLines={30}
            fontSize={16}
            className="m-auto my-2 border-0 border-1 shadow rounded"
          />
          <div className="m-2">Input</div>
          <AceEditor
            highlightActiveLine={false}
            mode="text"
            theme="github"
            onChange={(s) => {
              setInput(s)
            }}
            name="customTestInput"
            width="100%"
            minLines={5}
            maxLines={10}
            fontSize={16}
            className="m-auto my-2 border-0 border-1 shadow rounded"
          />
        </div>
        <div className="flex text-sm justify-end mt-5 m-auto md:max-w-11/12">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            defaultValue={{
              id: 0,
              label: 'C++ 17 / GCC 11.1.0',
              language: 'C++ 17',
              language_code: 'cpp17',
              version: 'GCC 11.1.0',
              version_index: '1'
            }}
            isOptionEqualToValue={(l, r) => l.id === r.id}
            onChange={(event: any, l: Language | null) => {
              if (!l) return
              setLanguage(l)
            }}
            options={languages}
            sx={{ width: 250, height: 30 }}
            renderInput={(params) => <TextField {...params} label="Language" />}
          />
          <div>
            <button
              type="submit"
              onClick={execute}
              className="text-xl p-3.2 px-4 mt-0.3 my-0 m-2 mb-auto rounded ring-1 hover:ring-2 active:bg-gray-100"
            >
              Execute
            </button>
          </div>
        </div>
        {executing && <LinearProgress className="max-w-11/12 my-2 m-auto" />}
        {executeLoading || (
          <div className="text-xl m-auto md:max-w-11/12">
            <div className="m-2">Output</div>
            <AceEditor
              highlightActiveLine={false}
              mode="text"
              theme="github"
              name="customTestOutput"
              value={task.output}
              readOnly
              width="100%"
              minLines={5}
              maxLines={10}
              fontSize={16}
              className="m-auto my-2 border-0 border-1 shadow rounded"
            />
          </div>
        )}
        {executeLoading || (
          <div className="table m-auto md:max-w-11/12 w-full text-base">
            <div className="text-xl m-2">Info</div>
            <div className="table-row-group">
              <div className="table-cell p-1.5 border bg-orange-100">
                result
              </div>
              <div className="table-cell p-1.5 border">
                <ResultCode code={task.result} />
              </div>
            </div>
            <div className="table-row-group">
              <div className="table-cell p-1.5 border bg-orange-100">
                memory
              </div>
              <div className="table-cell p-1.5 border">{task.memory} KB</div>
            </div>
            <div className="table-row-group">
              <div className="table-cell p-1.5 border bg-orange-100">
                cpu time
              </div>
              <div className="table-cell p-1.5 border">{task.cpu_time} s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomTest
