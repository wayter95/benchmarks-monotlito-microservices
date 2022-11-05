class Account {
  name?: string
  email?: string
  password?: string
  isAdmin?: boolean
  isActive?: boolean
  createdAt?: Date

  constructor(readonly id: string) { }
}

export { Account }