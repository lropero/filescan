import React, { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { animated, config, useSpring } from 'react-spring'
import { FiArrowLeft, FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-location'

import { Store } from '../contexts'

const Drawer = styled(animated.div)`
  background: #eee;
  border-right: 2px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 10px;
  position: absolute;
  top: 0;
  width: 260px;
  @media (min-width: 400px) {
    display: none;
  }
`

const Link = styled.span`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
`

const List = styled.ul`
  font-family: 'Comic Sans MS', cursive;
  font-size: .9em;
  list-style-type: none;
  padding: 0;
`

const Menu = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  flex: 0.1;
  padding: 20px 0;
  @media (max-width: 400px) {
    display: inherit;
  }
`

const Title = styled.span`
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.1em;
  @media (max-width: 400px) {
    font-size: ${({ isDrawerOpen }) => isDrawerOpen ? '1.1em' : '0.8em'};
  }
`

const Wrapper = styled.div`
  flex: 0.3;
  padding: 20px 10px;
  text-align: right;
  @media (max-width: 400px) {
    display: none;
  }
`

const Tags = (props) => {
  const { navigate } = useLocation()
  const { tags } = useContext(Store)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { left } = useSpring({
    config: config.wobble,
    from: { left: -280 },
    to: { left: isDrawerOpen ? 0 : -280 }
  })

  const linkTo = (pathname) => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false)
    }
    navigate(pathname)
  }

  const contents = <Fragment>
    <Title isDrawerOpen={isDrawerOpen}>Tags</Title>
    <List>
      {tags.map(({ tag, files }, index) => (
        <li key={index}><Link onClick={() => linkTo(`/tag/${tag}/1`)}>{tag}</Link> ({files})</li>
      ))}
    </List>
  </Fragment>

  return (
    <Fragment>
      <Drawer style={{ left }}>
        <FiArrowLeft color='black' onClick={() => setIsDrawerOpen(false)} size='2em' />
        {contents}
      </Drawer>
      <Menu>
        <Title>Tags</Title>
        <FiMenu color='black' onClick={() => setIsDrawerOpen(true)} size='2em' />
      </Menu>
      <Wrapper>{contents}</Wrapper>
    </Fragment>
  )
}

export default Tags
