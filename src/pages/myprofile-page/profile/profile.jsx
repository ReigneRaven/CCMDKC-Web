const FileUploadComponent = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        setFile(selectedFile);
  
        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    const handleUpload = async () => {
      if (!file) {
        alert('Please select an image to upload.');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await axios.post('http://your-server-endpoint/upload', formData);
  
        // Handle the server response
        console.log(response.data);
  
        // You can perform additional actions based on the server response
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    };
  
    return (
      <div>
        <h1>Image Upload</h1>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />}
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };
  
  export default FileUploadComponent;