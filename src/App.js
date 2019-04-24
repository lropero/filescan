import React from 'react'
import { Match, MatchFirst, Redirect } from 'react-location'

import config from './config'
import { Config } from './contexts'
import { List, Rename } from './components'

const App = (props) => {
  return (
    <Config.Provider value={config}>
      <MatchFirst>
        <Match path='/all/:page'><List /></Match>
        <Match path='/rename/:id'><Rename /></Match>
        <Match path='/tag/:tag/:page'><List /></Match>
        <Redirect to='/all/1' />
      </MatchFirst>
    </Config.Provider>
  )
}

export default App
