import React, { useState, useRef } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const editorRef = useRef(null);

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("authorization");

      if (!token) {
        alert("You must be logged in to publish a blog.");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/blogs`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
      },
      {
        headers: {
          authorization: `${token}`, 
        }});

      alert("Blog published successfully!");
      // Clear inputs
      setTitle("");
      setContent("");
      setTags("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog.");
    }
  };

  // Text formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const formatHeading = (level) => {
    formatText("formatBlock", `h${level}`);
  };

  const ToolbarButton = ({ onClick, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-3 py-2 text-sm border border-gray-300 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Write a New Blog</h2>

      {/* Blog Title */}
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
      />

      {/* Rich Text Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Content
        </label>
        
        {/* Toolbar */}
        <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
          {/* Headings */}
          <ToolbarButton onClick={() => formatHeading(1)} title="Heading 1">
            H1
          </ToolbarButton>
          <ToolbarButton onClick={() => formatHeading(2)} title="Heading 2">
            H2
          </ToolbarButton>
          <ToolbarButton onClick={() => formatHeading(3)} title="Heading 3">
            H3
          </ToolbarButton>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Text Formatting */}
          <ToolbarButton onClick={() => formatText("bold")} title="Bold">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("italic")} title="Italic">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("underline")} title="Underline">
            <u>U</u>
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("strikeThrough")} title="Strikethrough">
            <s>S</s>
          </ToolbarButton>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Alignment */}
          <ToolbarButton onClick={() => formatText("justifyLeft")} title="Align Left">
            ⬅
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("justifyCenter")} title="Align Center">
            ⬌
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("justifyRight")} title="Align Right">
            ➡
          </ToolbarButton>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Other */}
          <ToolbarButton onClick={insertLink} title="Insert Link">
            🔗
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("insertHorizontalRule")} title="Insert Line">
            ―
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("formatBlock", "blockquote")} title="Quote">
            "
          </ToolbarButton>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Undo/Redo */}
          <ToolbarButton onClick={() => formatText("undo")} title="Undo">
            ↶
          </ToolbarButton>
          <ToolbarButton onClick={() => formatText("redo")} title="Redo">
            ↷
          </ToolbarButton>
        </div>
        
        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditorChange}
          className="w-full min-h-[300px] p-4 border border-gray-300 border-t-0 rounded-b-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6
            prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5
            prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
            prose-p:mb-3 prose-p:leading-relaxed
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-em:italic prose-em:text-gray-800
            prose-u:underline prose-u:decoration-2
            prose-a:text-purple-600 prose-a:underline hover:prose-a:text-purple-800
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:mb-1
            prose-hr:border-gray-300 prose-hr:my-6"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
          placeholder="Start writing your blog here..."
        >
        </div>
      </div>

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
      />

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
      >
        Publish Blog
      </button>
    </div>
  );
};

export default CreateBlog;