import app from "./app";

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started, listening on port ${process.env.PORT || 8080}.`);
});
