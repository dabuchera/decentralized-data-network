import { atom } from 'jotai';

import { appConfig } from '@/lib/constants';
import { UserData, UserSession } from '@stacks/connect';

export const userSessionAtom = atom(() => new UserSession({ appConfig }))

export const userDataAtom = atom<UserData | null>(null)
