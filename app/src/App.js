import React from 'react'
import { Main, SidePanel, SyncIndicator, Header, Badge } from '@aragon/ui'

import { useAppLogic } from './hooks/app-hooks'
import Locks from './screens/Locks'
import MainButton from './components/MainButton'
import Title from './components/Title'
import WithdrawLocks from './components/Panels/WithdrawLocks'
import Icon from './assets/withdraw.svg'

function App() {
  const { locks, panelState, isSyncing, tokenSymbol, actions } = useAppLogic()

  return (
    <>
      <Main>
        <SyncIndicator visible={isSyncing} />
        <Header
          primary={
            <Title text="Time Lock" after={tokenSymbol && <Badge.App>{tokenSymbol}</Badge.App>} />
          }
          secondary={
            !!locks.length && (
              <MainButton
                label="Withdraw"
                onClick={panelState.requestOpen}
                icon={<img src={Icon} height="22px" alt="" />}
              />
            )
          }
        />

        {!isSyncing && <Locks locks={locks} />}
        <SidePanel
          title="Withdraw"
          opened={panelState.visible}
          onClose={panelState.requestClose}
          onTransitionEnd={panelState.endTransition}
        >
          <WithdrawLocks
            panelOpened={panelState.opened}
            locks={locks}
            withdraw={actions.withdraw}
          />
        </SidePanel>
      </Main>
    </>
  )
}

export default App
