import { FunkelTableName } from './types'

export {}

declare global {
  interface Window {
    electron: typeof import('@electron-toolkit/preload').electronAPI
    api: {
      getTable(table: FunkelTableName): Promise<any>
    }
  }
}