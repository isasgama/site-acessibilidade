// authController.js
const { authService } = require('../Service/authService'); // Importe o serviço de autenticação

// Controlador para lidar com a autenticação
async function authenticate(req, res) {
  try {
    const { username, password } = req.body;
    const user = await authService.authenticate({ username, password });

    if (user) {
      authService.setLoggedUser(user);
      res.status(200).json({ success: true, message: 'Login bem-sucedido', user });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao efetuar o login:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}

module.exports = {
  authenticate,
};
