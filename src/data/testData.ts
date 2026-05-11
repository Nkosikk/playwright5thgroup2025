export interface UserCredential {
  email: string;
  password: string;
}

export const validUsers: Record<string, UserCredential> = {
  admin: {
    email: 'admin@gmail.com',
    password: '@12345678'
  },

  standardUser: {
    email: 'kmblouws1@gmail.com',
    password: 'D3vt3sting#'
  },

  instructorUser: {
    email: 'instructor@gmail.com',
    password: '@12345678'
  }
};

