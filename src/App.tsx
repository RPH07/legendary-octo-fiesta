import './App.css'

const skills = ['React', 'TypeScript', 'UI/UX Dasar', 'REST API', 'Figma']

const projects = [
  {
    name: 'Landing Page UMKM',
    description:
      'Website company profile yang fokus di kecepatan load dan informasi produk yang ringkas.',
    stack: 'React, CSS, Vite',
  },
  {
    name: 'Dashboard Penjualan',
    description:
      'Dashboard internal untuk pantau performa harian dengan tampilan data yang clean.',
    stack: 'React, Chart.js, API',
  },
]

function App() {
  return (
    <main className="portfolio">
      <header className="hero">
        <p className="tag">Portfolio</p>
        <h1>Halo, gue Farhan — Frontend Developer.</h1>
        <p className="intro">
          Gue bantu bikin web yang simple, cepat, dan langsung nyampe ke inti informasi.
        </p>
        <div className="hero-links">
          <a href="mailto:farhan.dev@email.com">Email</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <section>
        <h2>Tentang</h2>
        <p>
          Saat ini gue fokus di pengembangan website bisnis dan personal branding dengan desain
          minimalis, struktur jelas, dan user flow yang gampang dipahami.
        </p>
      </section>

      <section>
        <h2>Skill Utama</h2>
        <ul className="pill-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Project Pilihan</h2>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <small>{project.stack}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
