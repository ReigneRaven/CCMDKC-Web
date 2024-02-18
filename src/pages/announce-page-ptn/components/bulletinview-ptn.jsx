import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../announce.css';

export default function BulletinViewPtn() {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedModalIndex, setSelectedModalIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      // Fetch announcements from the server
      const fetchAnnouncements = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/announcement/');
          setAnnouncements(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAnnouncements();
    }, []); // Empty dependency array to fetch data only once when component mounts
  
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
        <div className="modal-overlay-ptn" onClick={closeModal}>
          <div className={`modal-container-ptn announcement-modal-${index}`}>
            <img src={image} alt="Enlarged Announcement" />
          </div>
        </div>
      );
    };
  
    return (
      <div className="grid-container-ptn">
        {announcements.map((announcement, index) => (
          <div key={announcement.id} className="grid-item-ptn">
            <h6>{announcement.announcementDescription}</h6>
            <img
              src={`http://localhost:5000/${announcement.announcementImg}`}
              alt="Announcement"
              className={`announcement-image-${index}`}
              onClick={() => handleImageClick(`http://localhost:5000/${announcement.announcementImg}`, index)}
            />
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
