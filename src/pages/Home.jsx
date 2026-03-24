import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Send, SearchCheck, ChartNoAxesCombined } from "lucide-react";

function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Civic Portal</h1>
        <p>
          A transparent and citizen-first platform for grievance submission, tracking, and
          resolution across departments.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-ghost">
            Create Account
          </Link>
        </div>
      </header>

      <section className="feature-grid">
        <article className="feature-card">
          <Send size={20} />
          <h3>Submit Grievances</h3>
          <p>Submit detailed complaints with document/image attachments.</p>
        </article>
        <article className="feature-card">
          <SearchCheck size={20} />
          <h3>Real-time Tracking</h3>
          <p>Track grievance lifecycle from submission to closure.</p>
        </article>
        <article className="feature-card">
          <ChartNoAxesCombined size={20} />
          <h3>Data-driven Governance</h3>
          <p>Department dashboards with monthly and category analytics.</p>
        </article>
        <article className="feature-card">
          <ShieldCheck size={20} />
          <h3>Secure & Accessible</h3>
          <p>Responsive, accessible UI with role-based experience.</p>
        </article>
      </section>
    </div>
  );
}

export default Home;
