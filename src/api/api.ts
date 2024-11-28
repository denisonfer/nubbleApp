import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {
    Authorization: `Bearer Mw.NMcPB9-4NDpy59qhK1k6RYi9ZY-ouFV9IT92yPjECBbRn-BAt2btcDpWzAS0`,
  },
});
