const LandingPage = ({ setShowSignup }) => {
  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-800 overflow-hidden">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.2) 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.2) 70%, transparent 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 py-24 flex flex-col items-center text-center mt-15">
        {/* Background UI Cards */}
<div className="absolute  flex justify-center items-center -z-10 pointer-events-none ">
  <div className="relative w-[800px] h-[300px]">
    {/* Main UI mockup */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-45 bg-white/70 rounded-xl shadow-2xl shadow-gray-500 backdrop-blur-md border border-black/10 ">
      <div className="w-full h-full flex flex-col justify-between p-4">
        <div className=" h-4 w-1/2 rounded text-sm text-gray-500 ml-[-40px]">Blogito</div>
        <div className="bg-gray-300/40 h-24 rounded-md"></div>
        <div className="flex gap-2">
          <div className="bg-gray-300/50 h-3 w-1/4 rounded"></div>
          <div className="bg-gray-300/50 h-3 w-1/3 rounded"></div>
        </div>
      </div>
    </div>

    {/* Side chart card */}
    <div className="absolute  shadow-gray-400 top-12 left-45 w-26 h-28 bg-white/60 rounded-xl  shadow-2xl backdrop-blur-md border border-black/10 ">
      <div className="p-3 space-y-2">
        <div className="bg-gray-300/50 h-3 w-2/3 rounded"></div>
        <div className="bg-gray-300/40 h-10 rounded-md"></div>
      </div>
    </div>

    {/* Map icon card */}
    <div className="absolute top-20 border-black/10 right-40 w-32 h-20 shadow-gray-400 bg-white/60 rounded-xl shadow-2xl backdrop-blur-md border  ">
      <div className="p-3 space-y-2">
        <div className="bg-gray-300/50 h-3 w-1/2 rounded"></div>
        <div className="bg-gray-300/40 h-6 w-3/4 rounded-md"></div>
      </div>
    </div>

    <div className="absolute top-[-70px] border-black/10 right-70 w-25 h-25 bg-white/60 shadow-gray-250 rounded-xl shadow-2xl backdrop-blur-md border  ">
      <div className="p-3 space-y-2">
        <div className="bg-gray-300/50 h-3 w-1/2 rounded"></div>
        <div className="bg-gray-300/40 h-6 w-3/4 rounded-md"></div>
      </div>
    </div>
  </div>
</div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight mt-30">
          <span className="text-black">Share your Blogs worldwide</span>
          <br />
          <span className="bg-gradient-to-r text-black  bg-clip-text">
            Blogito made easy
          </span>
        </h1>

        <p className="max-w-xl text-gray-600 mb-8">
          Kami adalah Aseven, software house yang membantu menyelesaikan masalah
          bisnis Anda dengan aplikasi yang efektif dan efisien.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition">
            Hubungi Kami
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-100 transition">
            Lihat Kisah Sukses
          </button>
        </div>

        {/* Logos Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-80 mb-10">
          <img src="/pln-logo.png" alt="PLN" className="h-10" />
          <img src="/bobobox-logo.png" alt="Bobobox" className="h-10" />
          <img src="/nv-logo.png" alt="NV" className="h-10" />
          <img src="/tastyshop-logo.png" alt="Tasty Shop" className="h-10" />
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex space-x-6 text-gray-600 text-sm font-medium">
          <a href="#success" className="hover:underline text-black border-b-2 border-yellow-400 pb-1">Kisah Sukses</a>
          <a href="#layanan" className="hover:underline">Layanan</a>
          <a href="#faq" className="hover:underline">FAQ</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-20 mb-6">
        © Aseven {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default LandingPage;
