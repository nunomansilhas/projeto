module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log('Session user:', req.session.user); // Verifica se a sessão do usuário está presente
    next(); // Continua para o próximo middleware
  } else {
    console.log('No session user found'); // Verifica se a sessão do usuário não está presente
    res.status(401).send({
      success: false,
      message: 'Unauthorized. Please log in.'
    });
  }
};