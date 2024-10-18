import axios from 'axios';
import { ITablaBranch } from '../../../interfaces/tablaBranch';

const URLTable = 'https://retoolapi.dev/WgbALz/data';

export async function getAllTablaBranch(): Promise<ITablaBranch[]> {
  try {
    const response = await axios.get<ITablaBranch[]>(URLTable);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
