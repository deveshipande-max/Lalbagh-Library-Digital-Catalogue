import { useMemo, useState } from 'react'

type IconName =
  | 'arrow'
  | 'book'
  | 'calendar'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'headphones'
  | 'heart'
  | 'location'
  | 'menu'
  | 'search'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    headphones: <><path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19v-5h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2ZM6 19v-5H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2Z"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const books = [
  { title: 'The Covenant of Water', author: 'Abraham Verghese', category: 'Fiction', status: 'Available', cover: 'covenant', label: 'THE COVENANT\nOF WATER' },
  { title: 'The Blue Umbrella', author: 'Ruskin Bond', category: 'Children', status: 'Available', cover: 'umbrella', label: 'THE BLUE\nUMBRELLA' },
  { title: 'The Palace of Illusions', author: 'Chitra Banerjee Divakaruni', category: 'Fiction', status: 'Available', cover: 'palace', label: 'THE PALACE\nOF ILLUSIONS' },
  { title: 'Why We Remember', author: 'Charan Ranganath', category: 'Non-fiction', status: 'Available', cover: 'remember', label: 'WHY WE\nREMEMBER' },
  { title: 'The Great Indian Novel', author: 'Shashi Tharoor', category: 'Classics', status: 'Available', cover: 'indian', label: 'THE GREAT\nINDIAN NOVEL' },
  { title: 'A Burning', author: 'Megha Majumdar', category: 'Fiction', status: 'Available', cover: 'burning', label: 'A\nBURNING' },
  { title: 'The Hidden Hindu', author: 'Akshat Gupta', category: 'New arrivals', status: 'Available', cover: 'hindu', label: 'THE HIDDEN\nHINDU' },
  { title: 'Malgudi Days', author: 'R. K. Narayan', category: 'Classics', status: 'Available', cover: 'malgudi', label: 'MALGUDI\nDAYS' },
]

const categories = ['All books', 'New arrivals', 'Fiction', 'Non-fiction', 'Children', 'Classics']

function BookCover({ book }: { book: typeof books[number] }) {
  return (
    <div className={`book-cover ${book.cover}`}>
      <span className="cover-mark">L</span>
      <span className="cover-title">{book.label.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
      <span className="cover-author">{book.author}</span>
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All books')
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState<string[]>([])

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const categoryMatch = activeCategory === 'All books' || book.category === activeCategory
      const queryMatch = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [activeCategory, query])

  const toggleSaved = (title: string) => {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  }

  return (
    <main className="min-h-screen">
      <header className="site-header">
        <a href="#" className="brand" aria-label="Lalbagh Library home">
          <span className="brand-symbol"><span>ल</span></span>
          <span><strong>LALBAGH</strong><small>LIBRARY SERVICE</small></span>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a className="active" href="#catalogue">Catalogue</a>
          <a href="#collections">Collections</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </header>

      <section className="hero" id="catalogue">
        <div className="hero-copy">
          <p className="eyebrow">Lalbagh Library Service · Bengaluru</p>
          <h1>Stories for every<br/><em>curious mind.</em></h1>
          <p className="hero-intro">Discover books, ideas and voices from Karnataka and around the world. Your next great read is closer than you think.</p>
          <label className="search-box">
            <Icon name="search" size={22} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author or subject" />
            <button type="button" onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}>Search</button>
          </label>
          <div className="quick-links">
            <span>Popular:</span>
            {['Kannada literature', 'Award winners', 'Biographies'].map((item) => <button key={item} onClick={() => setQuery(item.split(' ')[0])}>{item}</button>)}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun"></div>
          <div className="arch arch-one"></div>
          <div className="arch arch-two"></div>
          <div className="shelf shelf-one"><i></i><i></i><i></i><i></i><i></i></div>
          <div className="shelf shelf-two"><i></i><i></i><i></i><i></i></div>
          <div className="plant"><span></span><span></span><span></span><span></span></div>
          <div className="reader"><div className="head"></div><div className="body"></div><div className="open-book"></div></div>
          <div className="art-caption">A quiet corner,<br/>a world within.</div>
        </div>
      </section>

      <section className="catalogue-section" id="collections">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the shelves</p>
            <h2>Featured collection</h2>
          </div>
          <a href="#collections" className="text-link">View full catalogue <Icon name="arrow" size={18} /></a>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Book categories">
          {categories.map((category) => (
            <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        {filteredBooks.length > 0 ? (
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <article className="book-card" key={book.title}>
                <div className="cover-wrap">
                  <BookCover book={book} />
                  <button className={saved.includes(book.title) ? 'save-button saved' : 'save-button'} onClick={() => toggleSaved(book.title)} aria-label={`Save ${book.title}`}>
                    <Icon name="heart" size={18} />
                  </button>
                </div>
                <p className="availability"><span></span>{book.status} now</p>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><Icon name="book" size={32}/><h3>No books found</h3><p>Try another title, author, or category.</p><button onClick={() => {setQuery(''); setActiveCategory('All books')}}>Clear search</button></div>
        )}
      </section>

      <section className="services-strip">
        <div className="service">
          <span className="service-icon"><Icon name="book" /></span>
          <div><strong>45,000+ books</strong><small>Across 8 languages</small></div>
        </div>
        <div className="service">
          <span className="service-icon"><Icon name="headphones" /></span>
          <div><strong>Digital library</strong><small>E-books & audiobooks</small></div>
        </div>
        <div className="service">
          <span className="service-icon"><Icon name="calendar" /></span>
          <div><strong>Community events</strong><small>For every age group</small></div>
        </div>
        <a className="join-link" href="#join">Join the library <Icon name="arrow" size={18}/></a>
      </section>

      <section className="events-section" id="events">
        <div className="events-copy">
          <p className="eyebrow light">At the library</p>
          <h2>Come for the books.<br/><em>Stay for the community.</em></h2>
          <p>From storytelling circles to author conversations, there is always something happening at Lalbagh.</p>
          <a className="outline-button" href="#events">See all events <Icon name="arrow" size={18}/></a>
        </div>
        <div className="event-list">
          <article>
            <div className="event-date"><strong>18</strong><span>JUL</span></div>
            <div><span className="event-tag">Children · Ages 5–10</span><h3>Saturday Story Circle</h3><p><Icon name="clock" size={15}/> 11:00 AM <Icon name="location" size={15}/> Children’s wing</p></div>
            <Icon name="chevron" />
          </article>
          <article>
            <div className="event-date"><strong>24</strong><span>JUL</span></div>
            <div><span className="event-tag">Author conversation</span><h3>Writing the City: Bengaluru in Fiction</h3><p><Icon name="clock" size={15}/> 5:30 PM <Icon name="location" size={15}/> Reading hall</p></div>
            <Icon name="chevron" />
          </article>
          <article>
            <div className="event-date"><strong>02</strong><span>AUG</span></div>
            <div><span className="event-tag">Workshop</span><h3>Introduction to Kannada Calligraphy</h3><p><Icon name="clock" size={15}/> 10:30 AM <Icon name="location" size={15}/> Activity room</p></div>
            <Icon name="chevron" />
          </article>
        </div>
      </section>

      <footer id="about">
        <a href="#" className="brand footer-brand">
          <span className="brand-symbol"><span>ल</span></span>
          <span><strong>LALBAGH</strong><small>LIBRARY SERVICE</small></span>
        </a>
        <p>Hosur Road, near Lalbagh West Gate,<br/>Bengaluru, Karnataka 560004</p>
        <p className="footer-note">Open Tuesday–Sunday · 9:00 AM–7:00 PM</p>
      </footer>
    </main>
  )
}
