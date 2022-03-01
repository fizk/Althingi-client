export type Maybe<T> = null | undefined | T;
export type IssueCategory = 'a' | 'b';

export interface AssemblyType {
    id: number
    from: string
    to: Maybe<string>
}

export interface PartyType {
    id: number
    name: string
    abbrShort: string
    abbrLong: string
    color: Maybe<string>
}

export interface CongressmanType {
    id: number
    name: string
    birth: string
    abbreviation: Maybe<string>
    parties: PartyType[]
    constituencies: Constituency[]
}

export interface IssueType {
    id: number
    assembly: AssemblyType
    category: IssueCategory
    congressman: Maybe<CongressmanType>
    name: string
    subName: string
    type: string
    typeName: string
    typeSubName: string
    status: Maybe<string>
    question: Maybe<string>
    goal: Maybe<string>
    majorChanges: Maybe<string>
    changesInLaw: Maybe<string>
    costsAndRevenues: Maybe<string>
    deliveries: Maybe<string>
    additionalInformation: Maybe<string>
}

export interface DocumentType {
    id: number
    assembly: AssemblyType
    issue: IssueType
    date: string
    url: Maybe<string>
    type: string
}

export interface SpeechType {
    id: number
    assembly: AssemblyType
    issue: IssueType
    category: string
    congressman: CongressmanType
    congressmanType: string
    from: Maybe<string>
    to: Maybe<string>
    text: Maybe<string>
    type: Maybe<string>
    iteration: Maybe<string>
    wordCount: Maybe<number>
    validated: Maybe<boolean>
}

export interface Party {
    id: number
    name: string
    abbrShort: string
    abbrLong: string
    color: Maybe<string>
}

export interface Constituency {
    id: number
    name: string
    abbrShort: string
    abbrLong: Maybe<string>
    description: Maybe<string>
}
