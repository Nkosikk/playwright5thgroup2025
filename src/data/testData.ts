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
    email: 'kai8@gmail.com',
    password: '@12345678'
  },

  instructorUser: {
    email: 'instructor@gmail.com',
    password: '@12345678'
  }
};

