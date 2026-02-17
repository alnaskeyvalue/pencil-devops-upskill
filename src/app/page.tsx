import { headers, cookies } from 'next/headers';
import ThemeToggle from './components/ThemeToggle';

const codingQuotes = [
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "I don't always test my code, but when I do, I do it in production.",
  "Debuggers don't remove bugs. They only show them in slow motion.",
  "The best way to get a project done faster is to start sooner. - Jim Highsmith",
  "Software is like sex: it's better when it's free. - Linus Torvalds",
  "Walking on water and developing software from a specification are easy if both are frozen. - Edward V. Berard",
  "It works on my machine.",
  "It's not a bug – it's an undocumented feature.",
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. - John Woods",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Premature optimization is the root of all evil. - Donald Knuth",
  "Before software can be reusable it first has to be usable. - Ralph Johnson",
  "Make it work, make it right, make it fast. - Kent Beck",
  "Refactoring is like cleaning the kitchen: you don't want to do it, but if you don't, you can't cook correctly.",
  "A good programmer is someone who always looks both ways before crossing a one-way street. - Doug Linder",
  "Deleted code is debugged code. - Jeff Sickel",
  "One man's crappy software is another man's full-time job. - Jessica Gaston",
  "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in. - Edsger Dijkstra",
  "The computer was born to solve problems that did not exist before. - Bill Gates"
];

export default async function Home() {
  const headersList = await headers();
  const cookieStore = await cookies();

  const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
  const theme = cookieStore.get('theme')?.value || 'dark'; // Default to dark mode

  const serverTime = new Date().toISOString();
  const randomQuote = codingQuotes[Math.floor(Math.random() * codingQuotes.length)];

  const isDark = theme === 'dark';

  const styles = {
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: isDark ? '#121212' : '#f0f2f5',
      color: isDark ? '#e0e0e0' : '#333',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    main: {
      position: 'relative' as const,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      padding: '3rem',
      borderRadius: '1rem',
      boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const,
      maxWidth: '600px',
      width: '100%'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '2rem',
      color: isDark ? '#ffffff' : '#1a1a1a'
    },
    label: {
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      color: isDark ? '#aaaaaa' : '#666'
    },
    value: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontFamily: 'monospace'
    },
    quoteContainer: {
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: isDark ? '1px solid #333' : '1px solid #eaeaea'
    },
    quote: {
      fontSize: '1.1rem',
      fontStyle: 'italic',
      lineHeight: '1.6',
      color: isDark ? '#cccccc' : '#444'
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <ThemeToggle initialTheme={theme} />
        <h1 style={styles.heading}>Server Monitor</h1>

        <div style={{ marginBottom: '2rem' }}>
          <p style={styles.label}>Your IP Address</p>
          <div style={styles.value}>{ip}</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={styles.label}>Server Time (UTC)</p>
          <div style={styles.value}>{serverTime}</div>
        </div>

        <div style={styles.quoteContainer}>
          <p style={styles.quote}>
            "{randomQuote}"
          </p>
        </div>
      </main>
    </div>
  );
}
