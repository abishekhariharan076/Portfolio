import React from 'react';

function App() {
  const skills = [
    { name: "Placeholder", percent: 0, isVisible: false, x: -120, y: -200 },
    { name: "AWS", percent: 70, isVisible: true, x: 0, y: -200 },
    { name: "Placeholder", percent: 0, isVisible: false, x: 120, y: -200 },
    
    { name: "Placeholder", percent: 0, isVisible: false, x: -180, y: -100 },
    { name: "JAVA", percent: 82, isVisible: true, x: -60, y: -100 },
    { name: "GCP", percent: 68, isVisible: true, x: 60, y: -100 },
    { name: "Placeholder", percent: 0, isVisible: false, x: 180, y: -100 },

    { name: "C", percent: 85, isVisible: true, x: -120, y: 0 },
    { name: "HTML", percent: 90, isVisible: true, x: 0, y: 0 },
    { name: "CSS", percent: 88, isVisible: true, x: 120, y: 0 },

    { name: "Placeholder", percent: 0, isVisible: false, x: -180, y: 100 },
    { name: "C++", percent: 65, isVisible: true, x: -60, y: 100 },
    { name: "PYTHON", percent: 75, isVisible: true, x: 60, y: 100 },
    { name: "Placeholder", percent: 0, isVisible: false, x: 180, y: 100 },

    { name: "Placeholder", percent: 0, isVisible: false, x: -120, y: 200 },
    { name: "Placeholder", percent: 0, isVisible: false, x: 0, y: 200 },
    { name: "Placeholder", percent: 0, isVisible: false, x: 120, y: 200 }
  ];

  return (
    <div className="portfolio-root">
      <nav>
        <div style={{display:'flex', gap:'25px'}}>
            <a href="#expertise" style={{color:'#86868b', textDecoration:'none', fontSize:'14px'}}>Expertise</a>
            <a href="#coding" style={{color:'#86868b', textDecoration:'none', fontSize:'14px'}}>Coding</a>
            <a href="#projects" style={{color:'#86868b', textDecoration:'none', fontSize:'14px'}}>Projects</a>
            <a href="#contact" style={{color:'#86868b', textDecoration:'none', fontSize:'14px'}}>Contact</a>
        </div>
        <a href="/resume.pdf" className="resume-btn" target="_blank">Resume</a>
      </nav>

      <header style={{height:'75vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', background: 'radial-gradient(circle at center, #1c1c1e 0%, #000 100%)'}}>
        <h1 style={{fontSize:'clamp(2rem, 8vw, 4.5rem)', fontWeight: '800', letterSpacing: '-2px'}}>Abishek Hariharan T</h1>
        <p style={{color:'#0071e3', fontWeight:600, marginTop: '10px'}}>Bannari Amman Institute of Technology</p>
        <p style={{color:'#86868b', marginTop: '5px'}}>Computer Science and Engineering</p>
      </header>

      <section id="expertise" className="container">
        <h2 style={{textAlign:'center', fontSize:'2.5rem'}}>Expertise</h2>
        <div className="watch-viewport">
          {skills.map((s, i) => (
            <div 
              key={i} 
              className={`skill-bubble ${s.isVisible ? 'visible' : ''}`} 
              style={{
                left: `calc(50% + ${s.x}px - 55px)`, 
                top: `calc(50% + ${s.y}px - 55px)`,
                animationDelay: `${i * 0.1}s`,
                display: s.isVisible ? 'flex' : 'none'
              }}
            >
              <div className="name">{s.name}</div>
              <div className="percent">{s.percent}%</div>
            </div>
          ))}
        </div>
      </section>

      <section id="coding" className="container">
        <h2 style={{textAlign:'center', fontSize:'2.5rem', marginBottom:'40px'}}>Coding Proficiency</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'20px'}}>
            <div className="stats-card">
                <p style={{textTransform:'uppercase', fontSize:'12px', color:'#86868b'}}>LeetCode Progress</p>
                <div style={{fontSize:'3.5rem', fontWeight:800}}>203</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', marginTop:'10px'}}><span>Easy</span><span>116</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width:'57%', background:'#30d158'}}></div></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px'}}><span>Medium</span><span>85</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width:'41%', background:'#ffd60a'}}></div></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px'}}><span>Hard</span><span>2</span></div>
                <div className="bar-bg"><div className="bar-fill" style={{width:'5%', background:'#ff453a'}}></div></div>
                <a href="https://leetcode.com/u/abishekhariharan76/" target="_blank" style={{color:'#0071e3', textDecoration:'none', fontSize:'14px', fontWeight:'600'}}>LeetCode Profile →</a>
            </div>

            <div className="stats-card">
                <p style={{textTransform:'uppercase', fontSize:'12px', color:'#86868b', marginBottom:'20px'}}>Platforms</p>
                <div style={{marginBottom:'20px'}}>
                    <p style={{fontSize:'12px', color:'#86868b'}}>GeeksForGeeks</p>
                    <a href="https://www.geeksforgeeks.org/user/abishekhariharan/" target="_blank" style={{color:'#f5f5f7', textDecoration:'none', fontWeight:'600'}}>Abishekhariharan Profile →</a>
                </div>
                <div>
                    <p style={{fontSize:'12px', color:'#86868b'}}>HackerRank</p>
                    <a href="https://www.hackerrank.com/profile/abishekharihara2" target="_blank" style={{color:'#f5f5f7', textDecoration:'none', fontWeight:'600'}}>abishekharihara2 Profile →</a>
                </div>
            </div>
        </div>
      </section>

      <section id="projects" className="container">
        <h2 style={{textAlign:'center', fontSize:'2.5rem', marginBottom:'40px'}}>Projects</h2>
        <div className="card">
          <h3>Cloud Cost Tracker & Resource Manager</h3>
          <p style={{color:'#86868b', lineHeight:'1.6', marginTop:'10px'}}>Enterprise system for multi-cloud resource orchestration and real-time spending analytics.</p>
        </div>
        <div className="card">
          <h3>User-Friendly Video Streaming Web</h3>
          <p style={{color:'#86868b', lineHeight:'1.6', marginTop:'10px'}}>Low-latency platform for high-fidelity streaming and intuitive user navigation.</p>
        </div>
      </section>

      <section id="contact" className="container">
        <h2 style={{textAlign:'center', fontSize:'2.5rem', marginBottom:'40px'}}>Connect</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'30px'}}>
            <div className="card">
                <p style={{fontSize:'11px', color:'#86868b', textTransform:'uppercase'}}>Email Addresses</p>
                <p style={{marginBottom:'15px', wordBreak:'break-all'}}>abishekhariharan76@gmail.com</p>
                <p style={{wordBreak:'break-all'}}>abishekhariharant.cs23@bitsathy.ac.in</p>
            </div>
            <div className="card">
                <p style={{fontSize:'11px', color:'#86868b', textTransform:'uppercase'}}>Phone & Social</p>
                <p style={{marginBottom:'15px'}}>+91 93421 93109</p>
                <a href="https://www.linkedin.com/in/abishekhariharan-t-945322292/" target="_blank" style={{color:'#0071e3', textDecoration:'none'}}>LinkedIn Profile →</a>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;