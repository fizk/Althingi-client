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

export interface IssueType {
    id: number
    name: string
    type: 'a' | 'b'
}

export interface DocumentType {
    id: number
    date: string
}
export interface SpeechType {
    id: number
    text: Maybe<string>
}
