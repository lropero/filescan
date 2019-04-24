import React, { useContext } from 'react'
import styled from 'styled-components'
import { FiFile } from 'react-icons/fi'
import { Link, useLocation } from 'react-location'

import { Paginator } from './'
import { shortenName } from '../utils'
import { Store } from '../contexts'

const File = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 100%;
  font-family: 'Comic Sans MS', cursive;
  font-size: .9em;
  @media (min-width: 500px) {
    flex-basis: 50%;
  }
  @media (min-width: 768px) {
    flex-basis: 33.33%;
  }
  @media (min-width: 920px) {
    flex-basis: 25%;
  }
`

const Files = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2%;
`

const Title = styled.span`
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.1em;
`

const Wrapper = styled.div`
  flex: 0.7;
  padding: 20px 10px;
  @media (max-width: 400px) {
    flex: 0.9;
  }
`

const Results = (props) => {
  const { currentPage, currentTag, results } = useContext(Store)
  const { pathname } = useLocation()
  const pages = Math.ceil(results.total / 10)

  return (
    <Wrapper>
      <Title>Search Results - {currentTag.length ? `"${currentTag}" Tag` : 'No Tag Selected'}</Title>
      <Files>
        {results.files && results.files.map((file, index) => (
          <File key={index}>
            <FiFile color='black' size='3em' /><Link query={{ file, pathname }} style={{ color: 'blue' }} to={`/rename/${file.id}`}>{shortenName(file.name)}</Link>
          </File>
        ))}
      </Files>
      <Paginator
        currentPage={currentPage}
        currentTag={currentTag}
        pages={pages}
      />
    </Wrapper>
  )
}

export default Results
