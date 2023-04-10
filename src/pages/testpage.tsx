import { ApexOptions } from 'apexcharts';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Box, SimpleGrid, Text, theme } from '@chakra-ui/react';

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-01-30T00:00:00.000Z',
      '2022-01-29T00:00:00.000Z',
      '2022-01-28T00:00:00.000Z',
      '2022-01-26T00:00:00.000Z',
      '2022-01-25T00:00:00.000Z',
      '2022-01-24T00:00:00.000Z',
      '2022-01-23T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [{ name: 'series', data: [31, 120, 10, 28, 61, 18, 109] }]

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Circ</title>
      </Head>
      <SimpleGrid flex="1" gap="4" w="75vw" minChildWidth="320px" alignItems="flex-start">
        <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
          <Text fontSize="lg" mb="4">
            Numbers of the week{' '}
          </Text>
          <Chart options={options} series={series} type="area" height={160} />
        </Box>
        <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
          <Text fontSize="lg" mb="4">
            Numbers of the week{' '}
          </Text>
          <Chart options={options} series={series} type="area" height={160} />
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Dashboard
