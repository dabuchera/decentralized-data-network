import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay';
import { api } from '../api';

type User = {
  id: string;
  author_id: string;
  name: string;
  completed: boolean;
  version: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

// export async function getUsers(page: number): Promise<Materialpassport> {
export async function getUsers(page: number) {

  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  console.log(data)

  return { users, totalCount };
  // return null
}

export function useUsers(page: number, options?: UseQueryOptions) {
  // return null
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>;
}
