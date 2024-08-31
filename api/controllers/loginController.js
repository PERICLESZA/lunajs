import loginModel from '../models/loginModel.js'; // Certifique-se de usar a extensão correta
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Obtém todos os registros de login
const getAllLogins = async (req, res) => {
  try {
    const results = await loginModel.getAllLogins();
    res.send({ success: true, data: results });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no banco de dados' });
  }
};

// Obtém um login específico pelo ID
const getLoginById = async (req, res) => {
  try {
    const results = await loginModel.getLoginById(req.params.id);
    if (results.length > 0) {
      res.send({ success: true, data: results[0] });
    } else {
      res.status(404).send({ success: false, message: 'Login não encontrado' });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no banco de dados' });
  }
};

// Adiciona um novo login
const addLogin = async (req, res) => {
  const loginData = req.body;
  try {
    const hashedPassword = await bcrypt.hash(loginData.senha, saltRounds);
    loginData.senha = hashedPassword;
    await loginModel.addLogin(loginData);
    res.send({ success: true, message: 'Login adicionado com sucesso' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro ao criar senha' });
  }
};

// Atualiza um login existente
const updateLogin = async (req, res) => {
  const { id } = req.params;
  const loginData = req.body;
  
  try {
    if (loginData.senha) {
      const hashedPassword = await bcrypt.hash(loginData.senha, saltRounds);
      loginData.senha = hashedPassword;
    }
    await loginModel.updateLogin(id, loginData);
    res.send({ success: true, message: 'Login atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no banco de dados' });
  }
};

// Exclui um login
const deleteLogin = async (req, res) => {
  try {
    await loginModel.deleteLogin(req.params.id);
    res.send({ success: true, message: 'Login excluído com sucesso' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no banco de dados' });
  }
};

// Função para validar o login
// Função para validar o login
const validateLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginModel.getLoginByUsername(username);
    if (result.length > 0) {
      const hashedPassword = result[0].senha;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        res.send({ 
          success: true, 
          message: 'Login bem-sucedido',
          profile: result[0].perfil // Retorna o perfil do usuário
        });
      } else {
        res.send({ success: false, message: 'Credenciais inválidas' });
      }
    } else {
      res.send({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no banco de dados' });
  }
};


export default {
  getAllLogins,
  getLoginById,
  addLogin,
  updateLogin,
  deleteLogin,
  validateLogin
};
