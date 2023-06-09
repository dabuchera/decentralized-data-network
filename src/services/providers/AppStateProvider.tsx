import {
    createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState
} from 'react';

import { Materialpassport } from '@/types';

export interface IUserBalance {
  stx: number
}

export interface IAppState {
  balance: IUserBalance
  showTxModal: boolean
  tx_id: string | null
  tx_status: string
  currentTxMessage: string
  materialpassports: Materialpassport[]
}

export type IAppStateContext = {
  appState: IAppState
  setAppstate: Dispatch<SetStateAction<IAppState>>
}

export const AppContext = createContext<IAppStateContext | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/ban-types
export default function AppProvider({ children }: PropsWithChildren<{}>) {
  const [appState, setAppstate] = useState<IAppState>({
    // STX Stuff
    balance: { stx: 0.0 },
    showTxModal: false,
    tx_id: '',
    tx_status: '',
    currentTxMessage: '',
    // Storage Stuff
    materialpassports: new Array()
  })

  const value: IAppStateContext = { appState, setAppstate }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  // console.log('useAppContext')
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('No AppContext available')
  }
  return context
}
