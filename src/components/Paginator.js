import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-location'

const Page = styled.span`
  color: ${({ isCurrentPage }) => isCurrentPage ? 'black' : 'blue'};
  cursor: ${({ isCurrentPage }) => isCurrentPage ? 'auto' : 'pointer'};
  font-family: 'Comic Sans MS', cursive;
  font-size: 1em;
  margin: 0 2px;
`

const Paginator = ({ currentPage, currentTag, pages }) => {
  return pages > 1 && <div>{Array(pages).fill('').map((page, index) => {
    const isCurrentPage = parseInt(currentPage, 10) === index + 1
    return isCurrentPage
      ? <Page isCurrentPage key={index}>{index + 1}</Page>
      : <Link key={index} to={`/${currentTag ? 'tag/' + currentTag : 'all'}/${index + 1}`}><Page>{index + 1}</Page></Link>
  })}</div>
}

export default Paginator
