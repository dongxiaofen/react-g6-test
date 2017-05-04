import axios from 'axios';

export const loginOut = () => {
  axios.delete('/api/user/logout');
};
