export interface UserCredential {
  email: string;
  password: string;
}

export const validUsers: Record<string, UserCredential> = {
  admin: {
    email: 'spencertest@gmail.com',
    password: 'Test@1234'
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

