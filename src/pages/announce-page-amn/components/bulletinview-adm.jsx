import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../announce-admn.css';

export default function BulletinViewAdm() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/announcement/');
        setAnnouncements(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedModalIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedModalIndex(null);
    setModalVisible(false);
  };

  const AnnouncementModal = ({ image, closeModal, index }) => {
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className={`modal-container announcement-modal-${index}`}>
          <img src={image} alt="Enlarged Announcement" />
        </div>
      </div>
    );
  };

  const handleDeleteClick = (announcementId) => {
    axios
      .delete(`http://localhost:5000/api/announcement/${announcementId}`)
      .then((result) => {
        alert("Do you want to delete this announcement?");
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement._id !== announcementId)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="grid-container">
      {announcements.map((announcement, index) => (
        <div key={announcement._id} className="grid-item">
          <h6>{announcement.announcementDescription}</h6>
          <img
            src={`http://localhost:5000/${announcement.announcementImg}`}
            alt="Announcement"
            className={`announcement-image-${index}`}
            onClick={() => handleImageClick(`http://localhost:5000/${announcement.announcementImg}`, index)}
          />
          <button
            id='delete-btn-announcement-adm'
            className="deleteButton"
            onClick={() => handleDeleteClick(announcement._id)}
          >
            Delete
          </button>
        </div>
      ))}

      {modalVisible && selectedModalIndex !== null && (
        <AnnouncementModal
          image={selectedImage}
          closeModal={closeModal}
          index={selectedModalIndex}
        />
      )}
    </div>
  );
}
