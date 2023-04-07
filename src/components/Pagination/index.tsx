import { Box, Button, Stack, Text, usePrevious } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  siblingsCount?: number
  onPageChange: (page: number) => void
}

function generatePageArrayBetween(a: number, b: number) {
  return [...new Array(b - a - 1)]
    .map((_, index) => {
      return a + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({ totalCountOfRegisters, registersPerPage = 5, currentPage = 1, siblingsCount = 1, onPageChange }: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages = currentPage > 1 ? generatePageArrayBetween(currentPage - siblingsCount - 1, currentPage) : []

  const nextPages = currentPage < lastPage ? generatePageArrayBetween(currentPage, currentPage + siblingsCount + 1) : []

  return (
    <Stack direction={['column', 'column', 'row']} spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>{(currentPage - 1) * registersPerPage + 1}</strong> -{' '}
        <strong>{currentPage * registersPerPage > totalCountOfRegisters ? totalCountOfRegisters : currentPage * registersPerPage}</strong> of{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction={'row'} spacing="2">
        {currentPage - siblingsCount > 1 && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />

            {currentPage - siblingsCount - 1 > 1 && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return <PaginationItem onPageChange={onPageChange} number={page} key={page} />
          })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return <PaginationItem onPageChange={onPageChange} number={page} key={page} />
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount + 1 < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
