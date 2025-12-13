import './Footer.css'
export default function Footer() {

  return (
    <footer className="footer">
      <svg
        className="footer-wave"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 
             C240,140 480,20 720,60 
             C960,100 1200,140 1440,100 
             L1440,200 L0,200 Z"
          fill="#E5E5E521"
          opacity="13"
        />
        <path
          d="M0,100 
             C240,40 480,120 720,90 
             C960,60 1200,80 1440,60 
             L1440,200 L0,200 Z"
          fill="#20DF7F17"
          opacity="9"
        />
      </svg>
    </footer>
  );
}