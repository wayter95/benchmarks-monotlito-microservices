interface IVideoResponseDTO {
  id: string
  title?: string
  description?: string
  url?: string
  isActive?: boolean;
  createdAt?: Date
}

export { IVideoResponseDTO }