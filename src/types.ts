/*
type Materialpassport @createModel(accountRelation: LIST, description: "Materialpassport") @fetchable {
  author: DID! @documentAccount
  version: CommitID! @documentVersion
  name: String! @string(minLength: 0, maxLength: 100)
  completed: Boolean! @boolean
}
*/

export type Materialpassport = {
  id: string
  author_id: string
  version: string
  name: string
  completed: boolean
  // created: Date
  created: string
  components?: Component[]
}

/*
type Component @createModel(accountRelation: LIST, description: "Component") {
  author: DID! @documentAccount
  mpID: StreamID! @documentReference(model: "Materialpassport")
  mp: Materialpassport! @relationDocument(property: "mpID")
  title: String! @string(minLength: 0, maxLength: 100)
  functionalLayer: FunctionalLayer!
  actor: Actor!
  lifecyclephase: LCP!
  property: String @string(minLength: 0, maxLength: 100)
  version: CommitID! @documentVersion
}
*/

export type Component = {
  id: string
  author_id: string
  mpID: string
  name: string
  functionalLayer: FunctionalLayer
  actor: Actor
  lifecyclephase: LCP
  attributes: KeyValue[]
  created: string
  version: string
}

export enum FunctionalLayer {
  BUILDING = 'BUILDING',
  COMPONENT = 'COMPONENT',
  MATERIAL = 'MATERIAL',
  MODULE = 'MODULE',
  PRODUCT = 'PRODUCT',
  STOREY = 'STOREY',
  EMPTY = 'EMPTY'
}

export enum Actor {
  ARCHITECT = 'ARCHITECT',
  CONSTRUCTION_CONTRACTOR = 'CONSTRUCTION_CONTRACTOR',
  DECONSTRUCTOR = 'DECONSTRUCTOR',
  LOGISTIC_MANAGER = 'LOGISTIC_MANAGER',
  MAINTENANCE_CONTRACTOR = 'MAINTENANCE_CONTRACTOR',
  PRODUCT_INSTALLER = 'PRODUCT_INSTALLER',
  PRODUCT_MANUFACTURER = 'PRODUCT_MANUFACTURER',
  PRODUCT_SUPPLIER = 'PRODUCT_SUPPLIER',
  PROPERTY_USER = 'PROPERTY_USER',
  EMPTY = 'EMPTY'
}

export enum LCP {
  DISASSEMBLY = 'DISASSEMBLY',
  REMANUFACTURING = 'REMANUFACTURING',
  CONSTRUCTION = 'CONSTRUCTION',
  ASSEMBLY = 'ASSEMBLY',
  DESIGN = 'DESIGN',
  MAINTENANCE = 'MAINTENANCE',
  MANUFACTURING = 'MANUFACTURING',
  OPERATION = 'OPERATION',
  REUSE = 'REUSE',
  TRANSPORT_LOGISTIC = 'TRANSPORT_LOGISTIC',
  EMPTY = 'EMPTY'
}

export type KeyValue = { key: string, value: string };

//*********************** These are for changing and creating ***********************//
export type MaterialpassportFormData = {
  name: string
  completed: boolean
}

export type ComponentFormData = {
  mpID: string
  name: string
  functionalLayer: FunctionalLayer
  actor: Actor
  lifecyclephase: LCP
  attributes: KeyValue[]
}
