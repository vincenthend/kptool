import { SelectMode } from '../components/LockExcludeSelect'

export interface WeekScheduleData {
  uid: string
  date: number

  [key: `person_${string}`]:
    | {
    mode: SelectMode.LOCK
    value: string
  }
    | {
    mode: SelectMode.EXCLUDE
    value: string[]
  }
}