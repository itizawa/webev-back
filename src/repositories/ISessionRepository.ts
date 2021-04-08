import { Session } from '../domains/Session';

export interface ISessionRepository {
  findSessionByAccessToken(accessToken: string): Promise<Session>;
}
