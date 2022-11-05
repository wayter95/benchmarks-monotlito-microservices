interface IAccountResponseDTO {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  createdAt?: Date
}

export { IAccountResponseDTO }