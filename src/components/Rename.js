import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-location'

import { Config } from '../contexts'

const Buttons = styled.div`
  display: flex;
`

const Title = styled.span`
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.1em;
`

const Wrapper = styled.div`
  flex: 1;
  padding: 20px 10px;
`

const Rename = (props) => {
  const { api } = useContext(Config)
  const { navigate, query: { file, pathname } } = useLocation()
  const [hasSaved, setHasSaved] = useState(false)
  const [value, setValue] = useState(file.name)

  useEffect(() => {
    if (hasSaved) {
      navigate(pathname)
    }
  }, [hasSaved, pathname, navigate])

  const handleInputChange = (event) => setValue(event.target.value)

  const save = () => {
    const filename = value.trim()
    if (filename.length) {
      axios.post(`${api}/file/${file.id}/rename`, {
        filename
      }).then(() => setHasSaved(true))
    }
  }

  return (
    <Wrapper>
      <Title>Rename File</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <input onChange={handleInputChange} type='text' value={value} />
        <Buttons>
          <Link style={{ color: 'blue' }} to={pathname}>Back to File List</Link>
          <button onClick={save}>Save</button>
        </Buttons>
      </form>
    </Wrapper>
  )
}

export default Rename
