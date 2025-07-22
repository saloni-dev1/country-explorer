import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
  };
}

interface HomeProps {
  countries: Country[];
}

import { useState } from 'react';

function useDarkMode() {
  const [dark, setDark] = useState(false);
  // Toggle dark mode by adding/removing 'dark' class on <html>
  const toggle = () => {
    setDark((d) => {
      if (!d) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return !d;
    });
  };
  return [dark, toggle] as const;
}

export default function Home({ countries }: HomeProps) {
  const [search, setSearch] = useState('');
  const [dark, toggleDark] = useDarkMode();
  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-0 px-0 overflow-x-hidden font-sans">
      {/* Minimalist header */}
      <header className="flex items-center justify-between px-6 py-5 bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 shadow text-white text-2xl">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".2"/><path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <span className="text-2xl font-bold tracking-tight text-blue-700 dark:text-teal-300">Country Explorer</span>
        </div>
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          className="ml-4 p-2 rounded-full bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition shadow text-blue-600 dark:text-teal-200"
        >
          {dark ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
          )}
        </button>
      </header>
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 dark:bg-teal-900 rounded-full opacity-30 blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl -z-10 animate-pulse-slow" />
      <main className="pt-10 pb-16 px-4 sm:px-8">
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 dark:text-teal-300">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-teal-400 text-lg placeholder-blue-300 dark:placeholder-teal-300 backdrop-blur-md transition"
            />
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <li className="col-span-full text-center text-gray-400 dark:text-gray-500 text-xl font-medium">No countries found.</li>
          ) : (
            filtered.map((country, idx) => (
              <li key={country.cca3} className="animate-fade-in" style={{ animationDelay: `${idx * 40}ms` }}>
                <Link
                  href={`/${country.cca3}`}
                  className="block bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all p-8 flex flex-col items-center space-y-5 hover:bg-blue-50/60 dark:hover:bg-teal-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-teal-400 outline-none cursor-pointer h-full border border-blue-100 dark:border-gray-700 neumorph"
                >
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width={80}
                    height={52}
                    className="rounded-lg shadow w-20 h-13 object-cover border border-blue-200 dark:border-teal-700 mb-2 bg-white dark:bg-gray-800"
                  />
                  <span className="text-xl font-bold text-blue-900 dark:text-teal-200 text-center tracking-wide drop-shadow">
                    {country.name.common}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </main>
      {/* Custom animation style and neumorphic effect */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(.4,0,.6,1) infinite;
        }
        .neumorph {
          box-shadow: 6px 6px 18px #dbeafe, -6px -6px 18px #fff, 0 1.5px 6px #bae6fd33;
        }
        .dark .neumorph {
          box-shadow: 6px 6px 18px #0f172a, -6px -6px 18px #334155, 0 1.5px 6px #0ea5e933;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,flags');
  let countries: Country[] = await res.json();
  console.log('REST Countries API response:', countries);
  if (!Array.isArray(countries)) {
    countries = [];
  }
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  return {
    props: {
      countries,
    },
    revalidate: 86400, // Revalidate once per day
  };
};
