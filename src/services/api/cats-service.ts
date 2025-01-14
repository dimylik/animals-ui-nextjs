import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}

interface PostCommand {
  cat: Cat
}

interface FilterCommand {
  query?: string
}

export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`${ this.baseUrl }/cats/${ params.id }`)
  }

  async update (params: PostCommand): Promise<{ cat: Cat } | null> {
    return this._fetchPOST(`${ this.baseUrl }/cats/${ params.cat.id }`, params.cat)
  }

  async create (params: PostCommand): Promise<Cat | null> {
    return this._fetchPOST(`${ this.baseUrl }/cats`, params.cat)
  }

  async delete (params: GetCommand): Promise<Cat | null> {
    return this._fetchDELETE(`${ this.baseUrl }/cats/${ params.id }`)
  }

  async all (): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${ this.baseUrl }/cats`)
  }

  async filter (params: FilterCommand): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`${ this.baseUrl }/cats/filter?query=${ params.query }`)
  }

}
