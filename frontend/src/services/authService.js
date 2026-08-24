// BACKEND INTEGRATION REQUIRED
// Connect these functions when backend authentication routes (/login, /register) are available.

export const authService = {
  login: async (credentials) => {
    // Integration Placeholder: Replace with real POST /login when endpoint exists
    return { success: true, token: 'fake_jwt_token', user: { email: credentials.email, name: 'Priya Sharma' } };
  },
  register: async (userData) => {
    // Integration Placeholder: Replace with real POST /register when endpoint exists
    return { success: true, token: 'fake_jwt_token', user: userData };
  },
  logout: async () => {
    return { success: true };
  }
};

export default authService;
