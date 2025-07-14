import React from "react";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Share Stories, <br /> Inspire Readers
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Welcome to Blogito – your personal space to write, read, and connect through words.
          Whether you're a writer or a reader, you'll love what we built for you.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition">
          Get Started <ArrowRight size={18} />
        </button>
      </section>

      {/* Feature Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Blogito?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Built for modern creators and curious minds. Publish posts, engage with readers,
            and grow your presence – all in one simple platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-medium mb-2">✍️ Write Freely</h3>
              <p className="text-gray-600">Markdown support, autosave, and a distraction-free editor.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">📈 Grow Audience</h3>
              <p className="text-gray-600">SEO-optimized posts and shareable links to reach more people.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">🔗 Easy Embeds</h3>
              <p className="text-gray-600">Embed code for your blog or portfolio in one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 bg-white text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Blogito. Made with ❤️ by Siddhant.
      </footer>
    </div>
  );
};

export default LandingPage;
