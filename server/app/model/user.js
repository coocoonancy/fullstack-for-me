module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: { type: String, select: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
  });

  return mongoose.model("User", UserSchema);
};
