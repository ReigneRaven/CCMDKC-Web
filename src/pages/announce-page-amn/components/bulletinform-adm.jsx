import React, { useState } from 'react';
import axios from 'axios';
import '../announce-admn.css';
import Button from './buttons';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function BulletinFormAdm() {
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcementImg, setAnnouncementImage] = useState(null);
  const [Announcement, setAnnouncementList] = useState([])

  const handleImageChange = (e) => {
    setAnnouncementImage(e.target.files[0]);
    alert('Image successfully uploaded')
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('announcementDescription', announcementDescription);
      formData.append('announcementImg', announcementImg);

      
      const result = await axios.post('http://localhost:5000/api/announcement/', formData);
      setAnnouncementList([...Announcement, result.data]);
      
      // Clear the form fields after successful submission

      setAnnouncementDescription('');
      setAnnouncementImage(null);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="add-announcement-adm" onSubmit={onSubmit}>
        <input
          type="text"
          value={announcementDescription}
          onChange={(e) => setAnnouncementDescription(e.target.value)}
          placeholder=" Add Announcement "
          className="input-announcement"
        />
        {/* Add an input field for image upload */}
        <input
          id='img-upload-announce-adm'
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="input-announcement"
        />

        <Button text={'Add'} type="submit" onClick={onSubmit}></Button>
      </form>
    </>
  );
}