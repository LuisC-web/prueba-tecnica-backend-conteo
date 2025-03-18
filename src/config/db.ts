import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.blue.bold(`Connexión a la base de datos ${url} \r`));
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error.message}`));
    setTimeout(() => {
      connectDB();
      process.stdout.write("\x1b[1A"); // Mueve el cursor una línea arriba
      process.stdout.write("\x1b[2K"); // Borra la línea
      console.log(
        colors.yellow.bold("Reintentando conexión a la base de datos...\r")
      );
    }, 5000);
  }
};
