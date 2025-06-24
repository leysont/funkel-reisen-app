import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { FunkelTableName } from '../types'

const api = {
  getTable: (table: FunkelTableName) => electronAPI.ipcRenderer.invoke('db:getTable', table)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
