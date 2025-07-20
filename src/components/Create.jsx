import React, { useState, useRef } from "react";
import { FileText, Type, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, Link, Quote, Undo, Redo, Hash, Tag, Send, Sparkles } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const editorRef = useRef(null);

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Blog published successfully!");
      // Clear inputs
      setTitle("");
      setContent("");
      setTags("");
      setWordCount(0);
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Text formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setContent(content);
      
      // Calculate word count
      const text = editorRef.current.textContent || editorRef.current.innerText || "";
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
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

  const ToolbarButton = ({ onClick, children, title, isActive }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
        isActive 
          ? 'bg-black text-white shadow-lg' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
      }`}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-8 bg-gray-300 mx-2"></div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200 mb-4">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span className="text-gray-900 font-semibold">Blogito</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Write Your Story
          </h1>
          <p className="text-gray-600 text-lg">Create engaging content with our powerful editor</p>
        </div>

        {/* Main Editor Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
          {/* Blog Title */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-5 h-5 text-violet-600" />
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Blog Title
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 text-2xl font-bold border-2 border-gray-300 rounded-2xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 hover:bg-white hover:border-gray-400"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-600" />
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Content
                </label>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {wordCount} words
              </div>
            </div>
            
            {/* Enhanced Toolbar */}
            <div className="bg-gray-100 border-2 border-gray-300 rounded-t-2xl p-4">
              <div className="flex flex-wrap gap-2 items-center">
                {/* Headings */}
                <div className="flex gap-1">
                  <ToolbarButton onClick={() => formatHeading(1)} title="Heading 1">
                    <span className="font-bold text-lg">H1</span>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatHeading(2)} title="Heading 2">
                    <span className="font-bold">H2</span>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatHeading(3)} title="Heading 3">
                    <span className="font-bold text-sm">H3</span>
                  </ToolbarButton>
                </div>
                
                <ToolbarDivider />
                
                {/* Text Formatting */}
                <div className="flex gap-1">
                  <ToolbarButton onClick={() => formatText("bold")} title="Bold">
                    <Bold className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("italic")} title="Italic">
                    <Italic className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("underline")} title="Underline">
                    <Underline className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("strikeThrough")} title="Strikethrough">
                    <Strikethrough className="w-4 h-4" />
                  </ToolbarButton>
                </div>
                
                <ToolbarDivider />
                
                {/* Alignment */}
                <div className="flex gap-1">
                  <ToolbarButton onClick={() => formatText("justifyLeft")} title="Align Left">
                    <AlignLeft className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("justifyCenter")} title="Align Center">
                    <AlignCenter className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("justifyRight")} title="Align Right">
                    <AlignRight className="w-4 h-4" />
                  </ToolbarButton>
                </div>
                
                <ToolbarDivider />
                
                {/* Other Tools */}
                <div className="flex gap-1">
                  <ToolbarButton onClick={insertLink} title="Insert Link">
                    <Link className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("insertHorizontalRule")} title="Insert Line">
                    <div className="w-4 h-0.5 bg-current"></div>
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("formatBlock", "blockquote")} title="Quote">
                    <Quote className="w-4 h-4" />
                  </ToolbarButton>
                </div>
                
                <ToolbarDivider />
                
                {/* Undo/Redo */}
                <div className="flex gap-1">
                  <ToolbarButton onClick={() => formatText("undo")} title="Undo">
                    <Undo className="w-4 h-4" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => formatText("redo")} title="Redo">
                    <Redo className="w-4 h-4" />
                  </ToolbarButton>
                </div>
              </div>
            </div>
            
            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorChange}
              className="w-full min-h-[400px] p-6 border-2 border-gray-300 border-t-0 rounded-b-2xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 text-gray-900 prose prose-lg max-w-none bg-white transition-all duration-200
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
                prose-p:mb-3 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:italic prose-em:text-gray-800
                prose-u:underline prose-u:decoration-2
                prose-a:text-violet-600 prose-a:underline hover:prose-a:text-violet-800
                prose-blockquote:border-l-4 prose-blockquote:border-violet-500 
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-violet-50/30
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                prose-li:mb-1
                prose-hr:border-gray-300 prose-hr:my-6"
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              data-placeholder="Start writing your amazing story here... Let your creativity flow!"
            >
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-violet-600" />
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Tags
              </label>
            </div>
            <input
              type="text"
              placeholder="technology, web development, tutorial (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-2xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-50 hover:bg-white hover:border-gray-400"
            />
          </div>

          {/* Publish Button */}
          <div className="flex justify-center">
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="group relative bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden border-2 border-black"
            >
              <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                {isPublishing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Publish Blog
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Tip: Use <kbd className="bg-white px-2 py-1 rounded text-xs border border-gray-300 shadow-sm">Ctrl+B</kbd> for bold, 
            <kbd className="bg-white px-2 py-1 rounded text-xs border border-gray-300 shadow-sm ml-1">Ctrl+I</kbd> for italic
          </p>
        </div>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;