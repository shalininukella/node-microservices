import Product from "../models/Product.js";

export const create = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.headers["x-user-id"],
  });

  res.json(product);
};

export const getAll = async (req, res) => {
  res.json(await Product.find());
};

export const getOne = async (req, res) => {
  res.json(await Product.findById(req.params.id));
};

export const update = async (req, res) => {
  res.json(
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  );
};

export const remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};
