import { AxiosInstance } from 'axios';

type HasId = { id: string };

export class RestApi<Model extends HasId> {
  constructor(private client: AxiosInstance, private url: string) {}

  create(body: object) {
    return this.client.post<Model>(this.url, body).then((response) => response.data);
  }

  update(id: string, body: object) {
    return this.client.put<Model>(`${this.url}/${id}`, body).then((response) => response.data);
  }

  delete(id: string) {
    return this.client.delete<unknown>(`${this.url}/${id}`).then((response) => response.data);
  }

  fetchOne(id: string) {
    return this.client.get<Model>(`${this.url}/${id}`).then((response) => response.data);
  }
}
