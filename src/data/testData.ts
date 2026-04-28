export interface UserCredential {
  email: string;
  password: string;
}

export const validUsers: Record<string, UserCredential> = {
  admin: {
    email: 'njceles@gmail.com',
    password: '@123456789'
  },

  standardUser: {
    email: 'nkosi@gmail.com',
    password: '@12345678'
  },

  instructorUser: {
    email: 'instructor@gmail.com',
    password: '@12345678'
  }
};

