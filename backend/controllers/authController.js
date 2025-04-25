const User = require('../models/User');
exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.json(user);
};