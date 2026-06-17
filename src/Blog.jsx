import React, { useState, useEffect } from "react";
import axios from "axios";
import "./static/blog.css";

function Blog() {
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    image: null,
    disc: "",
  });

  const [preview, setPreview] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blog/all`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      await axios.post(`${API}/blog/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchBlogs();

      setFormData({
        heading: "",
        title: "",
        image: null,
        disc: "",
      });

      setPreview(null);

      alert("Blog Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="blog-wrapper">
      {/* Form Section */}
      <div className="blog-container">
        <h2>Create Blog</h2>

        <form
          className="blog-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="heading"
            placeholder="Enter Branding "
            required
            value={formData.heading}
            onChange={handleChange}
            className="blog-input"
            required
          />

          <input
            type="text"
            name="title"
            required
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            className="blog-input"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="blog-input"
          />

          {preview && (
            <img src={preview} alt="Preview" className="blog-preview" />
          )}

          <textarea
            name="disc"
            placeholder="Enter Description"
            value={formData.disc}
            onChange={handleChange}
            className="blog-input"
            rows="4"
            required
          />

          <button type="submit" className="blog-button">
            Submit Blog
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="blog-list-container">
        <h2>All Blogs</h2>

        {blogs.length === 0 ? (
          <p className="no-data">No Blogs Found</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-card-image"
                />

                <div className="blog-card-content">
                  <span
                    className="blog-badge"
                    style={{
                      color: "white",
                      backgroundColor: "#0ce81a",
                      border: "1px solid #0ce81a",
                      borderRadius: "60px",
                      padding: "4px 8px",
                    }}
                  >
                    {blog.heading}
                  </span>

                  <h4>{blog.title}</h4>

                  <p>{blog.disc}</p>

                  <span className="blog-date">
                    📅{" "}
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
