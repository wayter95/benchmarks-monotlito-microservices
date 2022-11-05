class Video {
  title?: string
  description?: string
  url?: string
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date

  constructor(readonly id: string) { }
}

export { Video }