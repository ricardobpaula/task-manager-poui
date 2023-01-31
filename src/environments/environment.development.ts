import { Buffer } from 'buffer'

export const environment = {
  production: false,
  baseUrl: 'http://127.0.0.1:3000/rest',
  token: `Basic ${Buffer.from('admin:admin', 'utf8').toString('base64')}`
};
