// RandomUser.ts
import axios from 'axios';

export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export async function fetchRandomUser(): Promise<RandomUser> {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const randomUser: RandomUser = response.data.results[0];
    return randomUser;
  } catch (error) {
    throw new Error('Error fetching random user data');
  }
}
