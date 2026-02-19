import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }

        this.baseX += this.speedX;
        this.baseY += this.speedY;

        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseY > canvas.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 120; i++) particles.push(new Particle());
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
            ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            let opacity = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    resize(); init(); animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1e3e 50%, #0f1929 100%)'
      }}
    />
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const bioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['expertise', 'coding', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      // Bio Animation Logic
      if (bioRef.current) {
        const scrollY = window.scrollY;
        const fadeStart = 100; // Start earlier
        const fadeEnd = 600;   // End earlier

        // Calculate progress 0.0 to 1.0
        let progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        progress = Math.max(0, Math.min(1, progress));

        // 3D Rotate Effect
        const opacity = 1 - progress;
        const rotateX = progress * 90; // Rotate up to 90 degrees
        const translateY = progress * -100; // Move up significantly
        const scale = 1 - (progress * 0.2); // Scale down slightly

        bioRef.current.style.opacity = opacity;
        bioRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillsData = {
    "Core": [
      { name: "JAVA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "PYTHON", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JAVASCRIPT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" }
    ],
    "Cloud": [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "DOCKER", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "KUBERNETES", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "FIREBASE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ],
    "Web Development": [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "REACT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "DJANGO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "REDUX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "TAILWIND", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "ANGULAR", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "VUE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "BOOTSTRAP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "NEXT.JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "EXPRESS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "FLUTTER", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" }
    ],
    "Databases": [
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MONGODB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ]
  };

  const certifications = [
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Skills For All",
      date: "2024",
      pdf: "https://drive.google.com/file/d/1pPP1CgkqICywxK0Rex2NxYNi28NbI7jQ/preview"
    },
    {
      title: "Introduction to Modern AI",
      issuer: "N/A",
      date: "2026",
      pdf: "https://drive.google.com/file/d/1j6KwowmII--XR2mG5xVu4FMi3gmGKQI-/preview"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="portfolio-root">
      <BackgroundParticles />
      <nav>
        <div className="nav-links">
          <a
            onClick={() => scrollToSection('expertise')}
            className={activeSection === 'expertise' ? 'active' : ''}
          >
            Expertise
          </a>
          <a
            onClick={() => scrollToSection('coding')}
            className={activeSection === 'coding' ? 'active' : ''}
          >
            Coding
          </a>
          <a
            onClick={() => scrollToSection('projects')}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>
          <a
            onClick={() => scrollToSection('certifications')}
            className={activeSection === 'certifications' ? 'active' : ''}
          >
            Certifications
          </a>
          <a
            onClick={() => scrollToSection('contact')}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
        </div>
        <a href="/resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>

      <header className="hero">
        <h1>Abishek Hariharan T</h1>
        <p className="college">Bannari Amman Institute of Technology</p>
        <p className="dept">Computer Science and Engineering</p>
        <p className="bio-text" ref={bioRef}>
          I’m a technology-focused professional with experience in cloud infrastructure, backend development, and UI design, building scalable, end-to-end solutions. I focus on clean architecture, performance, and usability, with a strong understanding of how frontend, backend, and cloud systems work together.
          <br /><br />
          I design secure, scalable backend services, create intuitive and responsive user interfaces, and deploy production-ready applications using modern cloud platforms. I enjoy solving complex problems, learning new technologies, and delivering reliable, user-centered solutions. I’m open to collaboration and excited to contribute to impactful projects.
        </p>
      </header>

      <section id="expertise" className="container">
        <h2 className="section-title">Expertise</h2>
        <div className="skills-container">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3>{category}</h3>
              <div className="skill-grid">
                {skills.map((s, i) => (
                  <div key={i} className="skill-item">
                    <img src={s.icon} alt={s.name} className="skill-icon-small" />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="coding" className="container">
        <h2 className="section-title">Coding Proficiency</h2>
        <div className="grid-2">
          <div className="stats-card">
            <p className="label">LeetCode Progress</p>
            <div className="big-num">203</div>
            <div className="stat-line"><span>Easy</span><span>116</span></div>
            <div className="bar-bg"><div className="bar-fill green" style={{ width: '57%' }}></div></div>
            <div className="stat-line"><span>Medium</span><span>85</span></div>
            <div className="bar-bg"><div className="bar-fill yellow" style={{ width: '41%' }}></div></div>
            <div className="stat-line"><span>Hard</span><span>2</span></div>
            <div className="bar-bg"><div className="bar-fill red" style={{ width: '5%' }}></div></div>
            <a href="https://leetcode.com/u/abishekhariharan76/" target="_blank" rel="noopener noreferrer" className="link-text">Profile → LeetCode</a>
          </div>

          <div className="stats-card">
            <p className="label">Platforms</p>
            <div className="platform-box">
              <img src="https://cdn.simpleicons.org/geeksforgeeks/2F8D46" alt="GeeksForGeeks" style={{ width: '24px', height: '24px' }} />
              <a href="https://www.geeksforgeeks.org/user/abishekhariharan/" target="_blank" rel="noopener noreferrer" className="link-white" style={{ marginTop: 0 }}>Profile → GeeksForGeeks</a>
            </div>
            <div className="platform-box" style={{ marginTop: '20px' }}>
              <img src="https://cdn.simpleicons.org/hackerrank/2EC866" alt="HackerRank" style={{ width: '24px', height: '24px' }} />
              <a href="https://www.hackerrank.com/profile/abishekharihara2" target="_blank" rel="noopener noreferrer" className="link-white" style={{ marginTop: 0 }}>Profile → HackerRank</a>
            </div>
            <div className="platform-box" style={{ marginTop: '20px' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }} />
              <a href="https://github.com/abishekhariharan076" target="_blank" rel="noopener noreferrer" className="link-white" style={{ marginTop: 0 }}>Profile → GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="container">
        <h2 className="section-title">Projects</h2>
        <div className="card">
          <h3>Cloud Cost Tracker & Resource Manager</h3>
          <p className="dim-text">Enterprise system for multi-cloud resource orchestration.</p>
          <br></br>
          <p>Achieved real-time monitoring and cost visibility across AWS and Azure through a unified multi-cloud dashboard. Implemented AI/ML-based anomaly detection and cost prediction models, improving early issue detection and enabling proactive cost optimization. Designed intelligent alerting with multi-channel notifications and chaos engineering simulations, strengthening system resilience and reducing incident recovery time.
          </p><br></br>
          <p><strong>Tech Stack:</strong> FastAPI, React.js, AWS (Boto3, CloudWatch, Cost Explorer, EC2, SNS), Azure (Monitor, Cost Management, Compute, Communication Services), Scikit-learn, Pandas, NumPy, Tailwind CSS, Recharts, REST APIs..</p>
          <a href="https://github.com/abishekhariharan076/Cloud-monitor" target="_blank" rel="noopener noreferrer" className="github-btn">
            View Code on GitHub
          </a>
        </div>
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>SyncWATCH</h3>
          <p className="dim-text">SyncWatch is a production-grade watch-party platform that enables users to upload videos using chunked uploads, convert them into HLS streams, and watch together in perfect sync with real-time chat and playback control. Built with React, Node.js, Socket.IO, and FFmpeg, it delivers smooth, lag-free streaming optimized for long-distance viewing. The architecture is fully free-tier friendly, leveraging Cloudflare R2 for zero-egress HLS streaming and efficient resource usage. Real-time presence, host-controlled synchronization, and a clean dark UI ensure a seamless shared viewing experience. Unlike screen sharing, SyncWatch implements true video streaming using industry-standard protocols.</p>
          <a href="https://github.com/abishekhariharan076/SyncWatch" target="_blank" rel="noopener noreferrer" className="github-btn" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
            View Code on GitHub
          </a>
        </div>
      </section>

      <section id="certifications" className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="grid-2">
          {certifications.map((cert, index) => (
            <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{cert.title}</h3>
                <p className="dim-text" style={{ fontSize: '0.9rem' }}>{cert.issuer}</p>
                <p className="dim-text" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{cert.date}</p>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="link-text"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', marginTop: '0.5rem', padding: 0 }}
                >
                  View Certificate →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCert(null)}>×</button>
            <h3>{selectedCert.title}</h3>
            <div className="pdf-container">
              <iframe
                src={selectedCert.pdf}
                title="Certificate Preview"
                width="100%"
                height="500px"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <section id="contact" className="container">
        <h2 className="section-title">Connect</h2>
        <div className="grid-2">
          <div className="card">
            <p className="label">Email Addresses</p>
            <p className="contact-info">abishekhariharan76@gmail.com</p>
            <p className="contact-info">abishekhariharant.cs23@bitsathy.ac.in</p>
          </div>
          <div className="card">
            <p className="label">Phone & Social</p>
            <p className="contact-info">+91 93421 93109</p>
            <a href="https://www.linkedin.com/in/abishekhariharan-t-945322292/" target="_blank" rel="noopener noreferrer" className="link-blue">LinkedIn Profile →</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;