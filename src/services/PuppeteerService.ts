import axios from 'axios';

export class PuppeteerService {
  async fetchPage(): Promise<any> {
    try {
      const response = await axios.get('http://localhost:8080/?url=https://liginc.co.jp/492895');
      const { url } = response.data;
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  }
}
