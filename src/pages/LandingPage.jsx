import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="text-center py-24 px-4 bg-gradient-to-b from-blue-100 to-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to Blogito</h2>
        <p className="text-lg max-w-xl mx-auto mb-8">
          A clean and elegant space where blogging meets social media. Share your thoughts, connect with readers, and explore stories that matter.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 text-center bg-white">
        <h3 className="text-3xl font-semibold mb-10">What You Can Do</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Effortless Writing</h4>
            <p>Create stunning blog posts with our user-friendly editor.</p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Community Interaction</h4>
            <p>Engage with your audience through comments and feedback.</p>
          </div>
          <div className="p-6 border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Discover Content</h4>
            <p>Follow writers, explore categories, and stay inspired.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h3 className="text-3xl font-semibold mb-4">About Blogito</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Blogito is a fresh take on blogging with a social twist. It's built for creators who want a beautiful, distraction-free space to write and share stories, while still feeling connected to a community of readers and writers.
        </p>
      </section>
    
      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} Blogito. Crafted with care for writers everywhere.
      </footer>
    </div>
  );
}
