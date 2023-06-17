import { ProcessStatusString } from "../apps/utils/Constants"

export interface Pm2Env {
  automation: boolean
  autorestart: boolean
  exec_interpreter: string
  exec_mode: string
  filter_env: any[]
  instances: number
  kill_retry_time: number
  km_link: boolean
  merge_logs: boolean
  name: string
  namespace: string
  node_args: string[]
  node_version: string
  OS: string
  pm_cwd: string
  pm_err_log_path: string
  pm_exec_path: string
  pm_id: number
  pm_out_log_path: string
  pm_pid_path: string
  pm_uptime: number
  PM2_HOME: string
  PM2_USAGE: string
  pmx: boolean
  restart_time: number
  status: ProcessStatus
  treekill: boolean
  unique_id: string
  unstable_restarts: number
  username: string
  versioning: any
  vizion: boolean
  vizion_running: boolean
  watch: boolean
}

export interface ProcessList {
  monit: {
    cpu: number
    memory: number
  }
  name: string
  pm2_env: Pm2Env
  status: ProcessStatusString
  pm_id: number
  pid: number
}

export type ProcessStatus =
  | 'online'
  | 'stopping'
  | 'stopped'
  | 'launching'
  | 'errored'
