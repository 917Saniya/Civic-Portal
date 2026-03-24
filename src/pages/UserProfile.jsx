import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import PortalLayout from "../components/PortalLayout";

function UserProfile() {
  return (
    <PortalLayout title="User Profile">
      <div className="panel profile-card">
        <div className="avatar">SP</div>
        <div>
          <h3>Saniya Pathan</h3>
          <p className="muted">Citizen ID: CIT-7781</p>
        </div>
      </div>
      <div className="panel">
        <h3>Contact Details</h3>
        <p>
          <Mail size={15} /> saniya@email.com
        </p>
        <p>
          <Phone size={15} /> +91 9876543210
        </p>
        <p>
          <MapPin size={15} /> Sector 8, City Center
        </p>
      </div>
      <div className="panel">
        <h3>Preferences</h3>
        <p className="muted">Preferred language: English</p>
        <p className="muted">Notification: Email and SMS alerts enabled</p>
      </div>
    </PortalLayout>
  );
}

export default UserProfile;
