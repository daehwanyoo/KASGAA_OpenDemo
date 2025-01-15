import React from 'react';
import Header from '../components/Header';
import './Community.css';

const profiles = [
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
  { name: 'Name Name Name', title: 'Title', description: 'Description (Hobby Smith)', image: `${process.env.PUBLIC_URL}/communityprofile.png` },
];

const organizeProfiles = (profiles) => {
  const rows = [];
  let count = profiles.length;

  while (count > 0) {
    if (rows.length === 0) {
      rows.unshift(profiles.splice(-Math.min(count, 4))); // Start with up to 4 at the bottom
    } else if (rows.length === 1) {
      const rowAbove = Math.min(rows[0].length - 1, count); // Middle rows must be fewer than the row below
      rows.unshift(profiles.splice(-Math.max(rowAbove, 2))); // Ensure middle rows have at least 2
    } else {
      const rowAbove = rows[0].length - 1; // Enforce fewer in the middle than below
      rows.unshift(profiles.splice(-Math.max(rowAbove, 1))); // Top row can have 1
    }
    count = profiles.length;
  }

  return rows;
};

const Community = () => {
  const organizedProfiles = organizeProfiles([...profiles]); // Clone the array to avoid mutation

  return (
    <div>
      <Header pageType="community" />
      <main className="community-page">
        <div className="community-header">
          <h1 className="community-title">OUR COMMUNITY</h1>
        </div>

        <div className="community-pyramid">
          {organizedProfiles.map((row, rowIndex) => (
            <div key={rowIndex} className="pyramid-row">
              {row.map((profile, profileIndex) => (
                <div key={profileIndex} className="profile-card">
                  <img src={profile.image} alt={profile.name} className="profiles-image" />
                  <h3 className="profile-name">{profile.name}</h3>
                  <p className="profile-title">{profile.title}</p>
                  <p className="profile-description">{profile.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Community;
