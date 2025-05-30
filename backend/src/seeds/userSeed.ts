import User from "../models/User";
import Trip from "../models/Trip";
import { genSaltSync, hashSync } from "bcrypt-ts";
import Todo from "../models/Todo";

async function userSeed() {
  const salt = genSaltSync(10);
  const pw = hashSync(process.env.PASSWORD || "gattopio", salt);

  try {
    const user = await User.findOneAndUpdate(
      { email: "alessandro.ercole98@gmail.com" },
      {
        $setOnInsert: {
          name: "ale",
          username: "gattopio",
          email: "alessandro.ercole98@gmail.com",
          password: pw,
          isAdmin: true
        },
      },
      { upsert: true, new: true }
    );

    if (!user) {
      throw new Error("Impossibile creare o trovare l'utente");
    }

    const resultTrip = await Trip.updateMany(
      {
        $or: [{ user: { $exists: false } }, { user: null }],
      },
      { $set: { user: user._id } }
    );
    const resultTodo = await Todo.updateMany(
      {
        $or: [{ user: { $exists: false } }, { user: null }],
      },
      { $set: { user: user._id } }
    );

    console.log(`Trip aggiornati: ${resultTrip.modifiedCount}`);
    console.log(`Todo aggiornati: ${resultTodo.modifiedCount}`);
  } catch (error) {
    console.error("Errore nel seed:", error);
  }
}

export default userSeed;
