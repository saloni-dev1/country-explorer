import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
}

interface CountryPageProps {
  country: Country | null;
}

export default function CountryPage({ country }: CountryPageProps) {
  const router = useRouter();
  if (!country) {
    return <div className="flex items-center justify-center min-h-[60vh] text-2xl text-gray-500">Country not found.</div>;
  }
  // Fast back navigation
  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 animate-fade-in">
      <div className="max-w-xl w-full bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center gap-8 border border-blue-100 dark:border-gray-700 backdrop-blur-lg">
        <button
          onClick={handleBack}
          className="self-start mb-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-400"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <img
          src={country.flags.png}
          alt={country.name.common}
          width={180}
          height={120}
          className="rounded-xl shadow-lg border-4 border-blue-100 dark:border-teal-700 bg-white dark:bg-gray-800 mb-2"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-teal-200 text-center mb-2 drop-shadow">{country.name.common}</h1>
        <ul className="w-full flex flex-col gap-4 text-lg">
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
            </span>
            <span><span className="font-semibold">Official Name:</span> {country.name.official}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z" /></svg>
            </span>
            <span><span className="font-semibold">Capital:</span> {country.capital ? country.capital.join(', ') : 'N/A'}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1118 0A9 9 0 013 12z" /><path d="M12 7v5l3 3" /></svg>
            </span>
            <span><span className="font-semibold">Region:</span> {country.region} {country.subregion ? `(${country.subregion})` : ''}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
            </span>
            <span><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4v16" /></svg>
            </span>
            <span><span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-teal-900 text-blue-600 dark:text-teal-300">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </span>
            <span><span className="font-semibold">Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</span>
          </li>
        </ul>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=cca3');
  let countries: Country[] = await res.json();
  if (!Array.isArray(countries)) {
    countries = [];
  }
  const paths = countries.map((country) => ({
    params: { country: country.cca3 },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const code = params?.country;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) {
    return { props: { country: null }, revalidate: 60 };
  }
  const data = await res.json();
  const country = data[0] || null;
  return {
    props: {
      country,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};
