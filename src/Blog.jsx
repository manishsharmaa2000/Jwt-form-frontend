import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./static/blog.css";

function Blog() {
  const API = import.meta.env.VITE_API_URL;
  // for  array
  const [blogs, setBlogs] = useState([]);
  // for priview
  const [preview, setPreview] = useState(null);
  // for delete and update
  const [editId, setEditId] = useState(null);
  // for form hide and show
  const [showForm, setShowForm] = useState(false);
  //for hide and unhide blog
  const [showHidden, setShowHidden] = useState(false);
// for data set form
  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    image: null,
    disc: "",
  });

  //  FETCH BLOGS 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blog/all`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  //  TOGGLE FORM 

  const handleToggleForm = () => {
    if (showForm) {
      setFormData({
        heading: "",
        title: "",
        image: null,
        disc: "",
      });

      setPreview(null);
      setEditId(null);
    }

    setShowForm(!showForm);
  };

  // INPUT CHANGE 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  IMAGE CHANGE 

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  //  CREATE / UPDATE 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("heading", formData.heading);
      data.append("title", formData.title);
      data.append("disc", formData.disc);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        await axios.put(
          `${API}/blog/update/${editId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Blog Updated Successfully");
      } else {
        await axios.post(
          `${API}/blog/create`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Blog Created Successfully");
      }

      setFormData({
        heading: "",
        title: "",
        image: null,
        disc: "",
      });

      setPreview(null);
      setEditId(null);
      setShowForm(false);

      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  //  EDIT 

  const handleEdit = (blog) => {
    setFormData({
      heading: blog.heading,
      title: blog.title,
      disc: blog.disc,
      image: null,
    });

    setPreview(blog.image);
    setEditId(blog._id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //  DELETE 

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/blog/delete/${id}`);

      alert("Blog Deleted Successfully");

      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  //  HIDE / UNHIDE 

  const handleHide = async (id) => {
    try {
      await axios.put(`${API}/blog/hide/${id}`);

      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Action Failed");
    }
  };

  return (
    <div className="blog-wrapper">
      {/* Top Buttons */}

      <div className="top-header">
        <button
          className="create-blog-btn"
          onClick={handleToggleForm}
        >
          {showForm
            ? "✖ Close Form"
            : "+ Create Blog"}
        </button>
      </div>

      <div className="filter-buttons">
        <button
          className="filter-btn"
          onClick={() =>
            setShowHidden(!showHidden)
          }
        >
          {showHidden
            ? "Show Active Blogs"
            : "Show Hidden Blogs"}
        </button>
      </div>

      {/* Form */}

      {showForm && (
        <div className="blog-container">
          <h2>
            {editId
              ? "Update Blog"
              : "Create Blog"}
          </h2>

          <form
            className="blog-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="heading"
              placeholder="Enter Branding"
              value={formData.heading}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="blog-preview"
              />
            )}

            <textarea
              rows="5"
              name="disc"
              placeholder="Enter Description"
              value={formData.disc}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="submit-btn"
            >
              {editId
                ? "Update Blog"
                : "Submit Blog"}
            </button>
          </form>
        </div>
      )}

      {/* Blog List */}

      <div className="blog-grid">
        {blogs.length === 0 ? (
          <p>No Blogs Found</p>
        ) : (
          blogs
            .filter((blog) =>
              showHidden
                ? blog.isHidden
                : !blog.isHidden
            )
            .map((blog) => (
              <div
                className={`blog-card ${
                  blog.isHidden
                    ? "hidden-blog"
                    : ""
                }`}
                key={blog._id}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-image"
                />

                {/* Actions */}

                <div className="card-actions">
                  <button
                    type="button"
                    className="action-btn edit"
                    onClick={() =>
                      handleEdit(blog)
                    }
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    type="button"
                    className="action-btn delete"
                    onClick={() =>
                      handleDelete(blog._id)
                    }
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>

                  <button
                    type="button"
                    className="action-btn hide"
                    onClick={() =>
                      handleHide(blog._id)
                    }
                    title={
                      blog.isHidden
                        ? "Unhide"
                        : "Hide"
                    }
                  >
                    {blog.isHidden ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>

                {/* Content */}

                <div className="blog-content">
                  <span
                    className={`badge ${
                      blog.isHidden
                        ? "hidden-badge"
                        : ""
                    }`}
                  >
                    {blog.isHidden
                      ? "Hidden"
                      : blog.heading}
                  </span>

                  <h3>{blog.title}</h3>

                  <p>{blog.disc}</p>

                  <span className="blog-date">
                    📅{" "}
                    {new Date(
                      blog.createdAt
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Blog;