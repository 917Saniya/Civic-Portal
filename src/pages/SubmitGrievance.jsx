import React, { useState } from "react";
import PortalLayout from "../components/PortalLayout";
import Alert from "../components/Alert";

function SubmitGrievance() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "Water",
    location: "",
    date: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice({ type: "success", message: "Grievance submitted successfully." });
    setForm({ title: "", description: "", department: "Water", location: "", date: "" });
    setAttachment(null);
  };

  return (
    <PortalLayout title="Submit Grievance">
      <form className="panel grievance-form" onSubmit={handleSubmit}>
        {notice && <Alert type={notice.type} message={notice.message} />}

        <label htmlFor="title">Complaint Title</label>
        <input
          id="title"
          value={form.title}
          placeholder="Enter grievance title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option>Water</option>
          <option>Electricity</option>
          <option>Sanitation</option>
          <option>Public Works</option>
          <option>Health</option>
        </select>

        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={form.location}
          placeholder="Street/Area"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <label htmlFor="date">Date of Incident</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={form.description}
          placeholder="Describe your grievance clearly..."
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <label htmlFor="attachment">Upload Image / Document</label>
        <input
          id="attachment"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
        />
        {attachment && <p className="muted">Selected: {attachment.name}</p>}

        <button type="submit" className="btn btn-primary">
          Submit Grievance
        </button>
      </form>
    </PortalLayout>
  );
}

export default SubmitGrievance;