import app from "./server";
import colors from "colors";
import "dotenv/config";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    colors.cyan.bold(`Server is running on http://localhost:${port}`)
  );
});
