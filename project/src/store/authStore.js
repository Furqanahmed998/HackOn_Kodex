import { create } from 'zustand';

const loadUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create((set) => ({
  user: loadUser(),
  loading: false,
  signIn: async (email, password) => {
    // Simple mock authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    set({ user: userWithoutPassword });
  },
  signUp: async (email, password, userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      ...userData,
      points: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    set({ user: userWithoutPassword });
  },
  signOut: async () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));