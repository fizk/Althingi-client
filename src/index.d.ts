export type Maybe<T> = null | undefined | T;

export interface AssemblyType {
    id: number
    from: string
    to: Maybe<string>
}

export interface CongressmanType {
    id: number
    name: string
}
