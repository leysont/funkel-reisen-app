export const DbService = {
  async getTable(table: string){
    return window.api.getTable(table)
  }
}