import { parsePagination } from './parse-pagination';
import { assert } from 'ts-essentials';
import { expect } from '@jest/globals';

const response = {
  '@id': '/api/chats/82a8e45e-6b2b-4860-96a3-fbda5cb22755/messages',
  '@type': 'hydra:Collection',
  'hydra:member': [],
  'hydra:totalItems': 316,
  'hydra:view': {
    '@id': '/api/chats/82a8e45e-6b2b-4860-96a3-fbda5cb22755/messages?page=1',
    '@type': 'hydra:PartialCollectionView',
    'hydra:first': '/api/chats/82a8e45e-6b2b-4860-96a3-fbda5cb22755/messages?page=1',
    'hydra:last': '/api/chats/82a8e45e-6b2b-4860-96a3-fbda5cb22755/messages?page=11',
    'hydra:next': '/api/chats/82a8e45e-6b2b-4860-96a3-fbda5cb22755/messages?page=2',
  },
};

describe('parsePagination', () => {
  it('parses pagination', () => {
    // @ts-expect-error
    const result = parsePagination(response);
    expect(result).toBeTruthy();
    assert(result);
    expect(result.totalItems).toBe(316);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(11);
  });
});
