import { Blog } from "../models/blog.js";
//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All blogs", blogs: result });
    })
    .catch((e) => console.log(e));
};

const blog_details = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog details", blog: result });
    })
    .catch((e) => res.status(404).render("404", { title: "404" }));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
};

const blog_delete = (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
