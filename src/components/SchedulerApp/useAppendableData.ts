import React from 'react'

type AppendableItemAction<T> =
  | AddItemAction<T>
  | UpdateItemAction<T>
  | DeleteItemAction<T>
  | SetItemAction<T>
  | ResetItemAction<T>

interface BaseItemAction {
  type: 'add' | 'delete' | 'update' | 'reset' | 'set'
}

interface AddItemAction<T> extends BaseItemAction {
  type: 'add'
  value: T
}

interface UpdateItemAction<T> extends BaseItemAction {
  type: 'update'
  key: T[keyof T]
  field: keyof T
  value: T[keyof T]
}

interface DeleteItemAction<T> extends BaseItemAction {
  type: 'delete'
  key: T[keyof T]
}

interface SetItemAction<T> extends BaseItemAction {
  type: 'set'
  key: T[keyof T]
  item: T
}

interface ResetItemAction<T> extends BaseItemAction {
  type: 'reset'
  items: T[]
}

interface UseAppendableOptions<T> {
  initialData?: T[]
  rowKey: keyof T
  getValue: (data?: T) => T
}
function getReducer<T>(options: UseAppendableOptions<T>) {
  const {initialData, getValue, rowKey} = options
  return (state: T[], action: AppendableItemAction<T>): T[] => {
    switch (action.type) {
      case 'add':
        const {value} = action
        return [...state, options.getValue(value)]
      case 'delete':
        return state.filter((data) => data[options.rowKey] !== action.key)
      case 'update':
        return state.map((item) => {
          if (item[options.rowKey] === action.key) {
            return {
              ...item,
              [action.field]: action.value,
            }
          }
          return item
        })
      case 'set':
        return state.map((item) => {
          if (item[options.rowKey] === action.key) {
            return action.item
          }
          return item
        })
      case 'reset':
        return action.items
      default:
        return state
    }
  }
}

export function useAppendableData<T>(options: UseAppendableOptions<T>) {
  const [state, dispatch] = React.useReducer<React.Reducer<T[], AppendableItemAction<T>>>(getReducer(options), options.initialData ?? []);

  return {
    state,
    addRow: () => {
      dispatch({
        type: 'add',
        value: options.getValue()
      })
    },
    deleteRow: (key: T[keyof T]) => {
      dispatch({
        type: 'delete',
        key
      })
    },
    updateData: (key: T[keyof T], field: string, value: any) => {

    },
    setData: (key: T[keyof T], data: T) => {
    },
    loadData: () => {

    }
  }
}