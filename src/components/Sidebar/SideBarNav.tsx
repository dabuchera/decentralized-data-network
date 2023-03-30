import {
    RiArtboard2Line, RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine,
    RiLayout5Line
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink href="/" icon={RiDashboardLine}>
          Home
        </NavLink>
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard Comp.
        </NavLink>
        <NavLink href="/testpage" icon={RiDashboardLine}>
          Test
        </NavLink>
      </NavSection>

      <NavSection title="PERSONAL">
      <NavLink href="/materialpassports" icon={RiLayout5Line}>
          Materialpassports
        </NavLink>
        <NavLink href="/components" icon={RiArtboard2Line}>
          Components
        </NavLink>
      </NavSection>

      <NavSection title="AUTOMATION">
        <NavLink href="#" icon={RiInputMethodLine}>
          Forms
        </NavLink>
        <NavLink href="#" icon={RiGitMergeLine}>
          Forms
        </NavLink>
      </NavSection>
    </Stack>
  )
}
