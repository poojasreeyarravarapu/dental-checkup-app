const Checkup = require('../models/Checkup');
exports.create = async (req, res) => {
  const checkup = new Checkup({
    ...req.body,
    image: req.file.path
  });
  await checkup.save();
  res.status(201).json(checkup);
};
exports.getByUser = async (req, res) => {
  const results = await Checkup.find({ userId: req.params.userId });
  res.json(results);
};