import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-location'

import { Config, Store } from '../contexts'
import { Results, Tags } from './'

const Wrapper = styled.div`
  display: flex;
`

const List = (props) => {
  const path = useLocation().pathname.substr(1).split('/')
  const currentTag = path[0] === 'tag' ? path[1] : ''
  const currentPage = path[0] === 'tag' ? path[2] : path[1]

  const { api } = useContext(Config)
  const [results, setResults] = useState({})
  const [tags, setTags] = useState([])

  // componentDidMount
  useEffect(() => {
    axios.get(`${api}/tags`).then(({ data: tags }) => setTags(tags))
  }, [api])

  useEffect(() => {
    async function fetchData () {
      setResults({})
      const { data: { files, total_files: total } } = await axios.get(`${api}/files?page=${currentPage}${currentTag.length ? '&tag=' + currentTag : ''}`)
      setResults({
        changePage: fetchData,
        files,
        total
      })
    }
    fetchData()
  }, [api, currentPage, currentTag])

  const store = {
    currentPage,
    currentTag,
    results,
    tags
  }

  return (
    <Store.Provider value={store}>
      <Wrapper>
        <Tags />
        <Results />
      </Wrapper>
    </Store.Provider>
  )
}

export default List
