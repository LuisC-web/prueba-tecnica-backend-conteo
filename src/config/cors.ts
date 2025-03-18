import { CorsOptions } from "cors";
import "dotenv/config";
export const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};
