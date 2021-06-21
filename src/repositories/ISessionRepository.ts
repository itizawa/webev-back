import { Session } from '../domains/Session';

export interface ISessionRepository {
  findSessionByAccessToken({ accessToken }: { accessToken: string }): Promise<Session>;
}
