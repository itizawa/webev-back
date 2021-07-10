import { IPageRepository } from '../../repositories/IPageRepository';

export class CountAllPagesUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute(): Promise<number> {
    return this.pageRepository.countAllPages();
  }
}
