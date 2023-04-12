// Interface para definir o nosso objeto de resposta da função
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

// Interface para definir o Todo model no frontend
export interface Todo {
    _id?: number
    task: string
    completed: boolean
    priority: number
  }