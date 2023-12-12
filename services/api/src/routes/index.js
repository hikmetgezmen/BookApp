import authRoute from "../modules/auth/routers/auth.route.js";
import userRoute from "../modules/auth/routers/user.route.js";
import authorRoute from "../modules/author/routes/author.route.js";
import publisherRoute from "../modules/publisher/routes/publisher.route.js";
import categoryRoute from "../modules/category/routes/category.route.js";
import bookRoute from "../modules/book/routes/book.route.js";
import userBookCollectionRoute from "../modules/userBookCollection/routes/userBookCollection.route.js";
import userBookRateRoute from "../modules/userBookRate/routes/userBookRate.route.js";
import userReadBookRoute from "../modules/userReadBook/routes/userReadBook.route.js";

export const useRoutes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/authors", authorRoute);
  app.use("/api/publishers", publisherRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/books", bookRoute);
  app.use("/api/userBookCollections", userBookCollectionRoute);
  app.use("/api/userBookRates", userBookRateRoute);
  app.use("/api/userReadBooks", userReadBookRoute);
};
