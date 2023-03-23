import { Stack } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiArtboard2Line, RiGitMergeLine, RiInputMethodLine, RiLayout5Line } from 'react-icons/ri'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
      </NavSection>

      <NavSection title="PERSONAL">
        <NavLink href="/components" icon={RiArtboard2Line}>
          Components
        </NavLink>
        <NavLink href="/materialpassport" icon={RiLayout5Line}>
          Materialpassports
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
