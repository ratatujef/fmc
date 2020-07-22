const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
// const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "expanded",
        //expanded compressed
      }).on("error", sass.logError)
    )
    .pipe(
      rename({
        suffix: "",
        // suffix: ".min"
        prefix: "",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

// теперь не нужно, настроен webpack
// gulp.task("scripts", function () {
//   return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js/"));
// });
gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts/"));
});
gulp.task("icons", function () {
  return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons/"));
});
gulp.task("mailer", function () {
  return gulp.src("src/mailer/*").pipe(gulp.dest("dist/mailer/"));
});

// костыль, перемещает все файлы из папки CSS
// gulp.task("css", () => {
//   return gulp.src("src/css/*").pipe(gulp.dest("dist/css/"));
// });
gulp.task("logo", () => {
  return gulp.src("src/logo/*").pipe(gulp.dest("dist/logo/"));
});
gulp.task("img", function () {
  return gulp.src("src/img/**/*").pipe(gulp.dest("dist/img/"));
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "html",
    // "scripts",
    "fonts",
    "mailer",
    "icons",
    "img",
    // "css",
    "logo"
  )
);
