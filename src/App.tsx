import './App.css'
import { TypeAnimation } from 'react-type-animation'

const skills = [
  'HTML/CSS', 'JavaScript', 'TypeScript', 'PHP', 'Python',
  'React.js', 'Vue.js', 'React Native', 'Bootstrap',
  'Git/GitHub', 'Figma', 'WordPress', 'MySQL'
]

const experiences = [
  {
    role: 'Web Developer Intern',
    company: 'PT Rajawali Cemerlang Abadi',
    period: 'Nov 2025 – Present',
    description: 'Membangun custom WordPress theme dari nol untuk meningkatkan fleksibilitas branding perusahaan, serta mengoptimalkan performa dan responsivitas website di berbagai perangkat.'
  },
  {
    role: 'Frontend Developer Intern',
    company: 'PT Stucel Media Kreatif',
    period: 'Aug 2024 – Nov 2024',
    description: 'Melakukan slicing desain Figma menjadi halaman web yang pixel-perfect dan berkolaborasi dalam tim menggunakan Git untuk manajemen workflow pengembangan yang rapi.'
  }
]

const projects = [
  {
    name: 'E-Cash Book (Internal Financial App)',
    description: 'Aplikasi pelacak keuangan mobile untuk manajemen multi-saldo (Tabungan & Giro) dengan fitur pencatatan transaksi real-time dan integrasi laporan berbasis cloud.',
    stack: 'React Native (Expo), API',
  },
  {
    name: 'MasjidHub',
    description: 'Aplikasi web manajemen masjid dengan fitur notifikasi real-time untuk penerimaan dan penolakan donasi menggunakan Socket.IO.',
    stack: 'React.js, Node.js, Express, MySQL',
  },
  {
    name: 'Custom WordPress Theme',
    description: 'Pengembangan tema WordPress kustom dari nol untuk menggantikan template bawaan, berfokus pada performa yang ringan dan antarmuka dinamis.',
    stack: 'PHP, JavaScript, CSS',
  }
]

function App() {
  return (
    <main className="portfolio">
      <header className="hero">
        <p className="tag">Portfolio</p>
        <h1>Halo, saya Reynaldi Putra Hasli — {' '}
          <TypeAnimation
            sequence={[
              'Frontend Developer.', 2000,
              'Web Developer.', 2000
            ]}
            wrapper='span'
            speed={50}
            deletionSpeed={65}
            style={{ color: '#2563eb', display: 'inline-block' }}
            repeat={Infinity}
          />
        </h1>
        <p className="intro">
          Saya fokus pada pengembangan antarmuka web yang responsif, performan, dan berpusat pada pengguna. Saat ini, saya sedang memperdalam keahlian di bidang Frontend Development melalui program magang nasional.
        </p>
        <div className="hero-links">
          <a href="mailto:hi@buildwithrey.my.id">
            Email <span className="arrow">↗</span>
          </a>
          <a href="https://linkedin.com/in/reynaldi-putra-hasli" target="_blank" rel="noreferrer">
            LinkedIn <span className="arrow">↗</span>
          </a>
          <a href="https://github.com/RPH07" target="_blank" rel="noreferrer">
            GitHub <span className="arrow">↗</span>
          </a>
        </div>
      </header>

      <section>
        <h2>Tentang</h2>
        <p>
          Sebagai lulusan Teknologi Informasi dengan IPK 3.80/4.00, saya memiliki gairah kuat dalam mengubah desain UI/UX menjadi kode yang fungsional dan scalable. Pengalaman saya mencakup pengembangan custom theme WordPress hingga aplikasi mobile berbasis React Native. Saya percaya bahwa detail kecil dalam baris kode sangat berpengaruh pada pengalaman pengguna secara keseluruhan.
        </p>
      </section>

      <section>
        <h2>Pengalaman Profesional</h2>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <article className="experience-item" key={index}>
              <div className="experience-header">
                <h3>{exp.role}</h3>
                <span className="company">{exp.company}</span>
              </div>
              <small className="period">{exp.period}</small>
              <p>{exp.description}</p>
            </article>
          ))}
        </div>
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

      <section>
        <h2>Tech Stack & Tools</h2>
        <ul className="pill-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <footer className="footer-cta">
        <h2>Mari Terhubung</h2>
        <p>Tertarik untuk berdiskusi lebih lanjut, kolaborasi project, atau sekadar menyapa? Jangan ragu untuk menghubungi saya.</p>
        <a href="mailto:hi@buildwithrey.my.id" className="cta-button">
          Kirim Pesan <span className="arrow-icon">↗</span>
        </a>
      </footer>
    </main>
  )
}

export default App